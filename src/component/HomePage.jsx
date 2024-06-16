import React, { useEffect, useState, useCallback } from "react";
import { logoIconImage, logoIconPng, searchIcon } from "../assets";
import "../App.css";
import AnimeCard from "./AnimeCard";
import axios from "axios";
import Pagination from "./Pagination";

const ApiURL = "https://api.jikan.moe/v4/characters?";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  // implmented custom shorts for the best matching
  const similarity = (name, query) => {
    // Highest priority if user entered equal to anine name
    if (name.toLowerCase() === query.toLowerCase()) return 3;
    // second Highest priority if anine name  start with user entered name
    if (name.toLowerCase().startsWith(query.toLowerCase())) return 2;
    // second Highest priority if anine name  includes with user entered name
    if (name.toLowerCase().includes(query.toLowerCase())) return 1;
    return 0;
  };

  const fetchAnime = useCallback(async () => {
    setLoading(true);
    // Try catch block to handle the issue wiht the api or any other related
    try {
      // If user not entered then by default it will show default anime
      const url = query
        ? `${ApiURL}q=${query}&order_by=favorites&sort=desc&page=${currentPage}&limit=${recordsPerPage}`
        : `${ApiURL}page=${currentPage}&limit=${recordsPerPage}&order_by=favorites&sort=desc`;

      const response = await axios.get(url);
      var animeListArr = [];
      // If response is success then followed some opeation to filter
      if (response.status === 200) {
        if (response.data.data.length > 0) {
          // Filtering user entered is containing in the record or not
          response.data.data = response.data.data.filter((record) => {
            return record.name.toLowerCase().includes(query.toLowerCase());
          });
          // After filteration doing the sort. It will the recored based on the prefrences
          animeListArr = response.data.data.sort(
            (a, b) => similarity(b.name, query) - similarity(a.name, query)
          );
          // Storing into the state to pass to other components
          setAnimeList(response.data);
          // If lenth is 0 then passing 0 as length to show the No record found
          if (animeListArr.length !== 0)
            setTotalRecords(response.data.pagination.items.total);
          else {
            setTotalRecords(0);
          }
        }
      } else {
        console.log("Error Occurred");
      }
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  }, [query, currentPage]);

  // Attached the time to let the user type the input
  // then after one second it will show th record
  useEffect(() => {
    let timerId = setTimeout(() => {
      fetchAnime();
    }, 1000);
    // handle unnecessary rendering
    return () => {
      clearTimeout(timerId);
    };
  }, [fetchAnime, query]);

  const filterData = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      <div className="home-container">
        <div className="home-logo-container">
          <img src={logoIconPng} alt="" className="logo" />
          <p className="logo-name">Cinime</p>
        </div>
        <h1>Search Anime Character</h1>
        <div className="home__input-container">
          <div className="home__input-icon-container">
            <img src={searchIcon} alt="search icon" className="search-icon" />
          </div>
          <input
            type="text"
            value={query}
            onChange={filterData}
            className="home_input-box"
          />
        </div>
        <p className="home_total-record">
          Total <strong style={{ fontWeight: "700" }}>{totalRecords}</strong>{" "}
          matching anime character(s) found
        </p>
        <hr className="line" />
        {loading ? (
          <p className="loading">Loading...</p>
        ) : animeList.data.length === 0 ? (
          <p className="no-record">No record found...</p>
        ) : (
          <>
            <AnimeCard animeList={animeList} />
            <Pagination
              currentPage={currentPage}
              totalRecords={totalRecords}
              recordsPerPage={recordsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
