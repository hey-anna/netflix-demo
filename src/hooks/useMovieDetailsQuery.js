import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 영화 상세 정보를 가져오는 함수
const fetchMovieDetails = async ({ movieId }) => {
  const { data } = await api.get(`/movies/${movieId}`);
  console.log("API Response:", data);
  return data;
};

// 영화 상세 정보를 위한 커스텀 훅
export const useMovieDetailsQuery = ({ movieId }) => {
  return useQuery({
    queryKey: ["movie-details", { movieId }],
    queryFn: () => fetchMovieDetails({ movieId }),
    // select: (result) => result.data,
  });
};
