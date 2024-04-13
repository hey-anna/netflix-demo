// common 공통

import React, { useMemo } from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { Box, Stack, Typography } from "@mui/material";
// import votebox from "src/assets/images/votebox.svg";
import votebox from "../../assets/images/votebox.svg";
import popularityperson from "../../assets/images/popularityperson.svg";
import adult19 from "../../assets/images/adult19.svg";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
// 장르 ID와 이름 매핑
// const genreMappings = {
//   28: "Action",
//   12: "Adventure",
//   16: "Animation",
//   35: "Comedy",
//   80: "Crime",
//   99: "Documentary",
//   18: "Drama",
//   10751: "Family",
//   14: "Fantasy",
//   36: "History",
//   27: "Horror",
//   10402: "Music",
//   9648: "Mystery",
//   10749: "Romance",
//   878: "Science Fiction",
//   10770: "TV Movie",
//   53: "Thriller",
//   10752: "War",
//   37: "Western",
// };

// PopularMoviesSlide 카드에서 movie를 받아올거고
const MovieCard = ({ movie, onClick }) => {
  const { data: genreData } = useMovieGenreQuery();
  //     const datas = data?.results;
  // if (!datas || datas.length === 0) {
  //   return <div>No data found.</div>;
  // }

  // 장르 데이터를 객체 형태로 변환하여 빠르게 접근할 수 있도록 함
  // const genreMap = useMemo(() => {
  //   return genreData
  //     ? genreData.reduce((map, genre) => {
  //         map[genre.id] = genre.name;
  //         return map;
  //       }, {})
  //     : {};
  // }, [genreData]);

  // const showGenre = (genreIdList) => {
  //   return genreIdList.map((id) => genreMap[id] || "Unknown");
  // };
  const showGenre = (genreIdList) => {
    if (!genreData) return []; // 데이터가 없으면 빈 배열을 반환
    return genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj ? genreObj.name : "Unknown"; // 찾은 장르가 없을 경우 "Unknown" 반환
    });
  };
  // const showGenre = (genreIdList) => {
  //   if (!genreData) return [];
  //   const genreNameList = genreIdList.map((id) => {
  //     const genreObj = genreData.find((genre) => genre.id === id);
  //     return genreObj.name;
  //   });

  //   return genreNameList;
  // };

  // Stack style
  const StackSX = {
    display: "flex",
    flexDirection: "row",
  };

  console.log("##genreData", genreData);
  return (
    <div
      onClick={onClick}
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path}` +
          ")",
        // backgroundSize: "100%",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h3>{movie.title}</h3>
        <div
          // className="badge-container"
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          {showGenre(movie.genre_ids).map((genre, index) => (
            <Badge bg="danger" key={index}>
              {/* {genreMappings[id]} */}
              {genre}
            </Badge>
          ))}
          {/* {showGenre()movie.genre_ids.map((id) => (
            <Badge bg="danger" key={id}>
              {genreMappings[id]}
            </Badge>
          ))} */}
        </div>
        {/* {movie.genre_ids.map((id) => (
          <Box key={id} sx={{ marginRight: 1, display: "inline-block" }}>
            <Badge bg="danger">{genreMappings[id]}</Badge>
          </Box>
        ))} */}
        {/* {movie.genre_ids.map((id) => (
          <Badge bg="danger" key={id}>
            {genreMappings[id]}
          </Badge>
        ))} */}
        <div>
          <Stack gap={1} sx={StackSX}>
            <img src={votebox} alt="" />
            <Typography>{movie.vote_average}</Typography>
          </Stack>
          <Stack gap={1} sx={StackSX}>
            <img src={popularityperson} alt="" />
            <Typography>{movie.popularity}</Typography>
          </Stack>

          <div>{movie.adult ? <img src={adult19} alt="" /> : "All"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
