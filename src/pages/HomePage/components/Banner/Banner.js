import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
import { Container } from "@mui/material";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  // 로딩 스피너 넣기
  if (isLoading) {
    <h1>Loding....</h1>;
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }
  const datas = data?.results;
  // const datas = data && data.results; 위구문 동일 > 데이타가 있으면 데이터를 보여줘
  if (!datas || datas.length === 0) {
    return <div>No data found.</div>;
  }
  console.log("## data", datas);
  return (
    <div
      className="banner-bg"
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${datas[0].poster_path}` +
          ")",
      }}
    >
      <Container maxWidth="lg" className="text-white banner-text-area">
        <h1>{datas[0].title}</h1>
        <p>{datas[0].overview}</p>
      </Container>
    </div>
  );
};

export default Banner;
