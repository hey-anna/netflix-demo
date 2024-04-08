import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/useMovieQueries";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMoviesSlide = () => {
  const { data, isLoding, isError, error } = usePopularMoviesQuery();

  if (isLoding) {
    return <h1>Loding....</h1>;
  }
  if (isError) {
    return <Alert varient="danger">{error.message}</Alert>;
  }

  // // 컨스턴트?,, 따로 컴포넌트로 뽑아서 분리 - 재사용 가능성이 있다면
  // // 상수를 뽑아서 따로 폴더를 만들어도 상관없다. & 여기둬도 상관없다.
  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 6,
  //     //   slidesToSlide: 3, // optional, default to 1.
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //     //   slidesToSlide: 2, // optional, default to 1.
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //     //   slidesToSlide: 1, // optional, default to 1.
  //   },
  // };

  const datas = data?.results;
  if (!datas || datas.length === 0) {
    return <div>No data found.</div>;
  }
  return (
    <>
      <MovieSlider
        title="Top Popular Movies"
        movies={datas}
        responsive={responsive}
      />
    </>
  );
};

export default PopularMoviesSlide;
