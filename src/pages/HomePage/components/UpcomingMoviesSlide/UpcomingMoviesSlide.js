import React, { useState, useEffect } from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useMovieQueries";
import { Alert } from "react-bootstrap";

import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpcomingMoviesSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width > 1024) setDeviceType("desktop");
      else if (width > 464 && width <= 1024) setDeviceType("tablet");
      else setDeviceType("mobile");
    };

    window.addEventListener("resize", updateDeviceType);
    updateDeviceType();

    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  if (isLoading) {
    return <h1>Loding....</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
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
        autoPlay={true}
        deviceType={deviceType}
      />
    </>
  );
};

export default UpcomingMoviesSlide;
