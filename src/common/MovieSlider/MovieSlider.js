// common 공통

import React from "react";
import { Box, Stack, Typography, Container } from "@mui/material";
// import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import MovieCard from "../../../../common/MovieCard/MovieCard";
// import MovieCard from "../MovieCard/MovieCard";
import MovieCard from "../MovieCard/MovieCard";
//css
import "./MovieSlider.style.css";

const MovieSlider = ({ title, movies, responsive, autoPlay, deviceType }) => {
  console.log("## deviceType:", deviceType, "## autoPlay:", autoPlay);
  return (
    <>
      <Container maxWidth="lg">
        <h3>{title}</h3>
      </Container>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
        // swipeable={false}
        // draggable={false}
        // showDots={true}
        // responsive={responsive}
        // ssr={true} // means to render carousel on server-side.
        // infinite={true}
        // autoPlay={autoPlay}

        autoPlay={deviceType !== "mobile" ? autoPlay : false}
        // autoPlay={true}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        // autoPlaySpeed={1000}
        // keyBoardControl={true}
        // customTransition="all .5"
        // transitionDuration={500}
        // containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={this.props.deviceType}
        deviceType={deviceType}
        // dotListClass="custom-dot-list-style"
        // itemClass="carousel-item-padding-40-px"
      >
        {movies.map((movie, index) => (
          <MovieCard
            movie={movie}
            key={index}
            // className="bg-gray-500 h-[100px]"
          />
        ))}
        {/* {datas.map((movie, index) => (
    <MovieCard movie={movie} key={index} />
  ))} */}
      </Carousel>
    </>
  );
};

export default MovieSlider;
