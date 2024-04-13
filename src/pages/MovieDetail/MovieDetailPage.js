import { useState } from "react";
import { useParams, useEffect } from "react-router-dom";
import { Badge, Row, Col } from "react-bootstrap";
import { Typography, Box, Stack, Container } from "@mui/material";
// import { useMovieDetailsQuery } from "../../hooks/useMovieDetailsQuery";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { usePopularMoviesQuery } from "../../hooks/useMovieQueries";
import {
  useMovieDetailsEtcQuery,
  useMovieReviewsQuery,
  useRecommendMoviesQuery,
  useVideosMoviesQuery,
} from "../../hooks/useMovieDetailsEtcQy";
import ReviewBox from "./components/reviews/ReviewBox";
import votebox from "../../assets/images/votebox.svg";
import popularityperson from "../../assets/images/popularityperson.svg";
import youtube from "../../assets/images/youtube.svg";
import { VideoModal } from "./components/video/VideoModal";

import adult19 from "../../assets/images/adult19.svg";
import "./MovieDetailPage.style.css";
import RecommendMovieCard from "./components/recommend/RecommendMovieCard";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [open, setOpen] = useState(false);
  console.log("### movieId", movieId);
  // const { data: movie } = useMovieDetailsQuery({ movieId });

  const { data: movies, isLoading, isError, error } = usePopularMoviesQuery();
  const { data: genreData } = useMovieGenreQuery();
  // const { data: movies } = usePopularMoviesQuery();
  const { data: details } = useMovieDetailsEtcQuery({ movieId });
  const { data: reviews } = useMovieReviewsQuery({ movieId });
  const { data: recommends } = useRecommendMoviesQuery({ movieId });
  const { data: Videos } = useVideosMoviesQuery({ movieId });

  const videoId = Videos?.results[0]?.key;
  const videoTitle = Videos?.results[0]?.name;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("@@@ details", details);
  console.log("@@@ reviews", reviews);
  console.log("@@@ recommends", recommends);
  console.log("@@@ Videos", Videos);
  // console.log("Movie Details:", data);
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };
  // // 장르 이름을 반환하는 함수
  // const showGenre = (genreIdList) => {
  //   if (!genreData) return [];
  //   const genreNameList = genreIdList.map((id) => {
  //     const genreObj = genreData.find((genre) => genre.id === id);
  //     return genreObj ? genreObj.name : "Unknown Genre";
  //   });

  //   return genreNameList;
  // };

  // URL에서 가져온 movieId와 일치하는 영화를 찾습니다.
  // const movie = movies?.results.find(
  //   (movie) => movie.id.toString() === movieId
  // );

  // const detail = details?.results.find(
  //   (detail) => detail.id.toString() === movieId
  // );
  console.log("@@@@ movies", movies);
  const movie = movies?.results?.find(
    (movie) => movie.id.toString() === movieId
  );

  // const detail = details?.results?.find(
  //   (detail) => detail.id.toString() === movieId
  // );

  // 장르 이름을 반환하는 함수, genreIdList가 정의되지 않았을 경우 빈 배열을 반환합니다.
  // const showGenre = (genreIdList) => {
  //   if (!genreData || !genreIdList) return [];
  //   const genreNameList = genreIdList.map((id) => {
  //     const genreObj = genreData.find((genre) => genre.id === id);
  //     return genreObj ? genreObj.name : "Unknown Genre";
  //   });

  //   return genreNameList;
  // };

  // Stack style

  const StackSX = {
    display: "flex",
    flexDirection: "row",
    mb: 2,
  };

  const StackUnderSX = {
    display: "flex",
    flexDirection: "row",
    mb: 1,
  };

  const StackUtubeSX = {
    display: "flex",
    flexDirection: "row",
    mb: 2,
    cursor: "pointer",
  };

  // console.log("##genreData", genreData);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생: {error.message}</div>;
  if (!movie) return <div>영화 정보를 찾을 수 없습니다.</div>;
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
        <Row>
          <Col lg={4} sm={12} className="responsive-row">
            <div
              style={{
                backgroundImage:
                  "url(" +
                  `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}` +
                  ")",
                // backgroundSize: "100%",
                // width: "100%",
                // height: "auto",
                // backgroundRepeat: "no-repeat",
                // backgroundSize: "cover",
              }}
              // className="movie-detail-card"
              className="movie-detail-card"
            >
              {/* <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`}
              alt={`Poster of ${movie?.title}`}
              style={{ width: "100%" }}
            /> */}
            </div>
          </Col>
          <Col lg={8} xs={12}>
            {/* {showGenre(movie.genre_ids).map((genre, index) => (
            <Badge bg="danger" key={index}>
              {genre}
            </Badge>
          ))} */}
            <Stack gap={1} sx={StackSX}>
              {showGenre(movie.genre_ids).map((genre, index) => (
                <Badge bg="danger" key={index}>
                  {/* {genreMappings[id]} */}
                  <Typography variant="h6">{genre}</Typography>
                </Badge>
              ))}
            </Stack>
            <Typography sx={{ mt: 2 }} component="h2" variant="h2">
              {movie?.title}
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
              {movie.original_title}
            </Typography>
            <Stack gap={2} sx={StackSX}>
              <Stack gap={1} sx={StackSX}>
                <img
                  src={popularityperson}
                  alt=""
                  style={{ width: "50px", height: "auto" }}
                />
                <Typography
                  variant="h4"
                  sx={{ alignItems: "center", display: "flex" }}
                >
                  {movie.popularity}
                </Typography>
              </Stack>
              <Stack gap={1} sx={StackSX}>
                <img
                  src={votebox}
                  alt=""
                  style={{ width: "38px", height: "auto" }}
                />
                <Typography
                  variant="h4"
                  sx={{ alignItems: "center", display: "flex" }}
                >
                  {movie.vote_average}
                </Typography>
              </Stack>
              <Stack gap={1} sx={StackSX}>
                <Typography
                  variant="h4"
                  sx={{ alignItems: "center", display: "flex" }}
                >
                  {movie.adult ? <img src={adult19} alt="" /> : "All"}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={1} sx={StackUtubeSX} onClick={handleOpen}>
              <img
                src={youtube}
                alt="Play Video"
                style={{ width: "38px", height: "auto" }}
              />
              <Typography
                variant="h5"
                sx={{
                  alignItems: "center",
                  display: "flex",
                  textDecoration: "underline",
                }}
              >
                {movie?.title} Preview
              </Typography>
            </Stack>
            <Box
              sx={{
                border: "1px solid #ccc",
                // borderRadius: 2,
                // mt: 1,
                mb: 4,
                p: 2,
                borderLeft: 0,
                borderRight: 0,
              }}
            >
              <Typography>{movie.overview}</Typography>
            </Box>
            {/* <p>장르: {movie.genres.map((genre) => genre.name).join(", ")}</p> */}
            {/* <Typography>{detail.budget}</Typography> */}
            <Stack gap={1} sx={StackUnderSX}>
              <Badge bg="danger">
                {/* <Typography variant="h6">예산</Typography> */}
                <Typography variant="h6">budget</Typography>
              </Badge>
              <Typography variant="h6">
                {/* {details?.budget ?? "정보 없음"} */}
                {details?.budget
                  ? details.budget.toLocaleString()
                  : "정보 없음"}
              </Typography>
            </Stack>
            <Stack gap={1} sx={StackUnderSX}>
              <Badge bg="danger">
                {/* <Typography variant="h6">수익</Typography> */}
                <Typography variant="h6">revenue</Typography>
              </Badge>
              <Typography variant="h6">
                {/* {details?.revenue ?? "정보 없음"} */}
                {details?.revenue
                  ? details.revenue.toLocaleString()
                  : "정보 없음"}
              </Typography>
            </Stack>
            <Stack gap={1} sx={StackUnderSX}>
              <Badge bg="danger">
                {/* <Typography variant="h6">개봉일</Typography> */}
                <Typography variant="h6">release_date</Typography>
              </Badge>
              <Typography variant="h6">{movie.release_date}</Typography>
            </Stack>
            <Stack gap={1} sx={StackUnderSX}>
              <Badge bg="danger">
                {/* <Typography variant="h6">런타임</Typography> */}
                <Typography variant="h6">runtime</Typography>
              </Badge>
              <Typography variant="h6">
                {/* {details?.runtime ?? "정보 없음"} */}
                {details?.runtime ? `${details.runtime} min` : "정보 없음"}
              </Typography>
            </Stack>
          </Col>
        </Row>
        {/* <ReviewBox /> */}
        <ReviewBox reviews={reviews?.results || []} />
        <RecommendMovieCard recommends={recommends?.results || []} />
      </Container>
      <VideoModal
        open={open}
        handleClose={handleClose}
        videoId={videoId}
        videoTitle={videoTitle}
      />
    </>
  );
};

export default MovieDetailPage;
