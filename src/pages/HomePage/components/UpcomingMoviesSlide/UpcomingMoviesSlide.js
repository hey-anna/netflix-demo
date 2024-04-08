import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useMovieQueries";
import { Alert } from "react-bootstrap";

import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMoviesSlide = () => {
  const { data, isLoding, isError, error } = useUpcomingMoviesQuery();

  if (isLoding) {
    return <h1>Loding....</h1>;
  }
  if (isError) {
    return <Alert varient="danger">{error.message}</Alert>;
  }

  const datas = data?.results;
  if (!datas || datas.length === 0) {
    return <div>No data found.</div>;
  }
  return (
    <>
      <MovieSlider
        title="Upcoming Movies"
        movies={datas}
        responsive={responsive}
      />
    </>
  );
};

export default UpcomingMoviesSlide;
