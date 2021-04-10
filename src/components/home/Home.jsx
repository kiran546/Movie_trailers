import React, { useState, useEffect } from "react";

import {
  fetchMovies,
  fetchGenre,
  fetchMovieByGenre,
  
} from "../../service";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";


export function Home() {

  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre(28));
      
      
    };

    fetchAPI();
  }, []);

  // const onSubmit = (submit) => {
  // console.log(submit,"iiiiiii")
  //   fetchQuery(submit.query)
  // };

  const handleGenreClick = async (genre_id) => {
    setMovieByGenre(await fetchMovieByGenre(genre_id));
  };
  const movies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
      <div style={{ height: 500, width: "100%" }} key={index}>
        <div className="carousel-center">
          <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
        </div>
        <div className="carousel-center">
          <i
            className="far fa-play-circle"
            style={{ fontSize: 95, color: "#f4c10f" }}
          ></i>
        </div>
        <div
          className="carousel-caption"
          style={{ textAlign: "center", fontSize: 35 }}
        >
          {item.title}
        </div>
      </div>
    );
  });

  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            handleGenreClick(item.id);
          }}
        >
          {item.name}
        </button>
      </li>
    );
  });



  const movieList = movieByGenre.slice(0, 8).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row mt-0">
        <div className="col">
          <RBCarousel
            autoplay={true}
            pauseOnVisibility={true}
            slidesshowSpeed={5000}
            version={4}
            indicators={false}
          >
            {movies}
          </RBCarousel>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="float-left">
           <h6>select your favourite Genere</h6>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>

       {/* <form  onSubmit={handleSubmit(onSubmit)} >
            <input
            type="text"
            name="query"
            placeholder="Search your movie"
          />{" "}
          <br />
          <input type="submit" value="submit"/>
        </form>  */}

      <div className="row mt-3">
        <div className="col">
          <div className="float-left">
           <h6>click on this cards to play movie tariler</h6>
          </div>
        </div>
      </div>
      <div className="row mt-3">{movieList}</div>

      
      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

      <div className="row mt-3 mb-5">
        <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
        <h3>Contact us </h3>
          <p>
           This is our movie portal where you can stream your favourite movie tarilers tv shows based on your favourite category.
          </p>
          <p>
          our social networks
          </p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="https://www.facebook.com/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.youtube.com/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://ads.twitter.com/onboarding/18ce55e50ru/welcome" style={{ color: "#f4c10f" }}>
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.instagram.com/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>feel free to write us</h3>
          <ul className="list-unstyled">
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> ourAddress:
                </strong>{" "}
                Hyderabad, Ts, India
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> Phone:
                </strong>{" "}
                7386034737
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i className="fas fa-envelope"></i> Email:
                </strong>{" "}
                chavankiran584@gmail.com
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
