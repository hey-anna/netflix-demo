// common 공통

import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { Box, Stack, Typography } from "@mui/material";
// import votebox from "src/assets/images/votebox.svg";
import votebox from "../../assets/images/votebox.svg";
import popularityperson from "../../assets/images/popularityperson.svg";
import adult19 from "../../assets/images/adult19.svg";
// 장르 ID와 이름 매핑
const genreMappings = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// PopularMoviesSlide 카드에서 movie를 받아올거고
const MovieCard = ({ movie }) => {
  //     const datas = data?.results;
  // if (!datas || datas.length === 0) {
  //   return <div>No data found.</div>;
  // }

  // Stack style
  const StackSX = {
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie?.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h3>{movie.title}</h3>
        <div
          // className="badge-container"
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          {movie.genre_ids.map((id) => (
            <Badge bg="danger" key={id}>
              {genreMappings[id]}
            </Badge>
          ))}
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
