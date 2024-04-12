import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import {
  usePopularMoviesQuery,
  useRatedMoviesQuery,
  useUpcomingMoviesQuery,
} from "../../hooks/useMovieQueries";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import SortFilter from "../../common/component/SortFilter/SortFilter";

// import MovoeCard

// 경로 2가지 > 이런작업 경우 원래 백엔드에서 보내줘야 한다. // 우리가 지금 요청하기 애매
// nav바에서 클릭해서 온경우 => popularMovie 보여주기
// keyword를 입력해서 온경우 => keyword와 관련된 영화들을 보여줌

// 경로 2가지에 대해서 관련된 훅을 만들어 줘야 한다.
// 데이터를 읽어오기위에 쿼리를 만들어야 한다.

// (상황에 따라 두가지 다른호출 구현)
// (키워드가 있냐 없냐에 따라서 - 키워드 서치하는 영화)
// (키워드가 없으면 PopularMovie 보여주기)

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할때마다 page 바꿔주기
// page 값이 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
  // navigate
  const navigate = useNavigate();

  // useState
  const [sortOption, setSortOption] = useState("popular");
  const [selectedGenre, setSelectedGenre] = useState("all");
  // const [genreOption, setGenreOption] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  const keyword = query?.get("q");

  const popularQuery = usePopularMoviesQuery({ page });
  const ratedQuery = useRatedMoviesQuery({ page });
  const upcomingQuery = useUpcomingMoviesQuery({ page });
  const searchQuery = useSearchMovieQuery({ keyword, page });
  const genreQuery = useMovieGenreQuery();

  const { data: genres } = genreQuery;

  const currentQuery = keyword
    ? searchQuery
    : {
        popular: popularQuery,
        recommended: ratedQuery,
        upcoming: upcomingQuery,
      }[sortOption];

  const { data, isLoading, isError, error } = currentQuery;

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    setPage(1);
  };

  // const genreOptions = genres?.map((genre) => ({
  //   value: genre.id,
  //   label: genre.name,
  // }));
  // genreOptions.unshift({ value: "all", label: "All Genres" });

  const genreOptions = [
    { value: "all", label: "All Genres" },
    ...(genres
      ? genres.map((genre) => ({
          value: genre.id,
          label: genre.name,
        }))
      : []),
  ];

  // const filteredMovies = data?.results.filter(movie => {
  //   return selectedGenre === "all" || movie.genre_ids.includes(Number(selectedGenre));
  // });
  // 검색 결과, 인기/추천/상영 예정 영화 목록, 장르 데이터를 사용하여 필터링된 영화 목록을 계산하는 함수
  const getFilteredMovies = () => {
    if (!data || !genres) return [];

    let filteredMovies = data.results;

    // 장르 필터링 적용: 선택된 장르가 'all'이 아닌 경우, 해당 장르를 포함하는 영화만 필터링
    if (selectedGenre !== "all") {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }

    return filteredMovies;
  };

  const filteredMovies = getFilteredMovies(); // 필터링된 영화 목록 계산

  const handlePageClick = ({ selected }) => {
    // console.log("###page", page);
    setPage(selected + 1);
  };

  // 인기 추천 상영예정 콘솔 확인
  useEffect(() => {
    if (!isLoading && data) {
      console.log(`${sortOption} 데이터:`, data);
    }
  }, [data, isLoading, sortOption]);

  // console.log("### data", data);
  // 로딩 및 예외처리

  if (isLoading) {
    return <h1>Loding....</h1>;
  }
  if (isError || !data)
    return (
      <Alert variant="danger">{error?.message || "An error occurred"}</Alert>
    );
  // if (isError) {
  //   return <Alert variant="danger">{error.message}</Alert>;
  // }
  // if (!data || data.results.length === 0) {
  //   return <div>No data found.</div>;
  // }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <SortFilter
            sortOption={sortOption}
            onSortChange={handleSortChange}
            // options={sortOptions}
            options={[
              { value: "popular", label: "인기순" },
              { value: "recommended", label: "추천순" },
              { value: "upcoming", label: "상영 예정" },
            ]}
          />
          <SortFilter
            sortOption={selectedGenre}
            onSortChange={setSelectedGenre}
            // options={sortOptions}
            options={genreOptions}
          />
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {/* {data?.results.map((movie, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))} */}
            {filteredMovies.map((movie, index) => (
              <Col key={index} lg={3} md={4} sm={6} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <>
            {/* <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={page}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
            /> */}
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.total_pages} // 전체페이지
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1} // 0부터 카운트 ?1일때 2라고 생각 2일때 3이라고 생각 그래서 -1 처리
            />
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
