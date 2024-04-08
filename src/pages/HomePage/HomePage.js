import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMoviesSlide from "./components/PopularMoviesSlide/PopularMoviesSlide";
import RatedMoviesSlide from "./components/RatedMoviesSlide/RatedMoviesSlide";
import UpcomingMoviesSlide from "./components/UpcomingMoviesSlide/UpcomingMoviesSlide";

// 1. 배너 => popoular 영화를 들고와서 첫번째 아이템을 보여주자
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie

const HomePage = () => {
  return (
    <>
      <Banner />
      <PopularMoviesSlide />
      <RatedMoviesSlide />
      <UpcomingMoviesSlide />
    </>
  );
};

export default HomePage;
