import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import {
  usePopularMoviesQuery,
  useRatedMoviesQuery,
  useUpcomingMoviesQuery,
} from "../../hooks/useMovieQueries";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import SortFilter from "../../common/component/SortFilter";

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
const MoviePage = ({}) => {
  const [sortOption, setSortOption] = useState("popular");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  const keyword = query?.get("q");

  const popularQuery = usePopularMoviesQuery({ page });
  const ratedQuery = useRatedMoviesQuery({ page });
  const upcomingQuery = useUpcomingMoviesQuery({ page });
  const searchQuery = useSearchMovieQuery({ keyword, page });

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
  const handlePageClick = ({ selected }) => {
    // console.log("###page", page);
    setPage(selected + 1);
  };

  // const sortOptions = [
  //   { value: "recent", label: "등록일자순" },
  //   { value: "recommended", label: "추천순" },
  //   { value: "cheapest", label: "인기순" },
  //   // 여기에 더 많은 옵션을 추가할 수 있습니다.
  // ];
  // const queryResult = (() => {
  //   switch (sortOption) {
  //     case "popular":
  //       return popularQuery;
  //     case "recommended":
  //       return ratedQuery;
  //     case "upcoming":
  //       return upcomingQuery;
  //     default:
  //       return popularQuery;
  //   }
  // })();

  // const { data, isLoading, isError, error } = queryResult;

  // const { data, isLoading, isError, error } = useSearchMovieQuery({
  //   keyword,
  //   page,
  // });
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
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={3} xs={12}>
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
