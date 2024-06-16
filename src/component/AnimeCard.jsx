import React from "react";
import { colorIcon } from "../assets";
import { heartImage } from "../assets";
import { NavLink } from "react-router-dom";
const AnimeCard = ({ animeList }) => {
  return (
    <>
      {animeList.data &&
        animeList.data.map((anime, index) => (
          
          <div className="anime-container" key={index}>
            <div className="image-container">
              <img
                src={anime.images.jpg.image_url}
                alt="anime-pic"
                className="anime-image"
              />
            </div>
            <div className="anime-title">
              <h4>{anime.name}</h4>
              <div className="anime-nickname">
                {anime.nicknames.map((nickname, idx) => (
                  <p key={idx}>{nickname}</p>
                ))}
              </div>
            </div>
            <div className="anime-favourite">
              <img src={heartImage} alt="heart" className="heart-img" />
              <span className="fav-count">
                {anime.favorites.toLocaleString("en-US")}
              </span>
            </div>
            <div className="anime-detail">
              <NavLink to={`${anime.url}`}>
                <img
                  src={colorIcon}
                  alt="next-page-icon"
                  className="next-page-icon"
                />
              </NavLink>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnimeCard;
