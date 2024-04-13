import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = () => {
  return api.get(`/movie/popular`);
};
const fetchRatedMovies = () => {
  return api.get(`/movie/top_rated`);
};
const fetchUpcomingMovies = () => {
  return api.get(`/movie/upcoming`);
};

// 함수로 만들어 놓으면 가져다 쓰기 편함.
export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};

// hook을 만드는 이유가 뭘까?
// 나중에 이훅을 다른데서도 사용할 수 있기 때문이다
// 컴포넌트를 비즈니스 로직과, ui를 분리해주는게 좋음

export const useRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-toprated"],
    queryFn: fetchRatedMovies,
    select: (result) => result.data,
  });
};

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpcomingMovies,
    select: (result) => result.data,
  });
};
