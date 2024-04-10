import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

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
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  const handlePageClick = ({ selected }) => {
    // console.log("###page", page);
    setPage(selected + 1);
  };
  console.log("### data", data);
  // 로딩 및 예외처리
  if (isLoading) {
    return <h1>Loding....</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          필터
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
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
