// import logo from "./logo.svg";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";
// import HomePage from "./pages/Homepage/Homepage";

// 과제 리스트
// [o]
// 유저는 배너를 볼 수 있다.
// 유저는 가장 인기있는 영화 리스트, 가장 평점 좋은 영화 리스트, 상영 예정작 리스트를 볼 수 있다.
// 각각의 영화 리스트는 슬라이드 형태로 넘길 수 있다.
// 유저는 영화에 마우스를 올려두면 영화의 제목과 장르, 평점, 인기도, 청불여부를 볼 수 있다.
// 유저는 영화 카드를 클릭하면 영화의 상세 정보를 볼 수 있다.
// 상세 정보에는 포스터, 영화 제목, 평점, 인기도 청불여부, 줄거리 요약, 예산, 날짜, 시간, 리뷰, 예고편, 관련영화 등이 있다.
// 유저는 영화를 검색할 수 있다.
// 유저는 영화를 인기도순으로 정렬할 수 있다.
// 유저는 장르별로 영화를 필터링 할 수 있다.
// 유저는 영화 날짜별로 필터링 할 수 있다.

// 홈페이지 /
// 영화 전체보여주는 페이지 (서치) /movies
// 영화 디테일 페이지 /movies/:id
// 추천 영화 /movies/:id/recommendation
// 리뷰 /movies/:id/reviews

//sub(서브) 라우트 = nested route를 넣어줄 수 있음

// / index 붙이면 >> 위에거를 그대로 쓰겠다는
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movies">
            <Route index element={<MoviePage />} />
            <Route path=":id" element={<MovieDetailPage />} />
          </Route>
          {/* <Route path="/movies" element={<MoviePage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} /> */}
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
