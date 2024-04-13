import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchDetailsEtc = async ({ queryKey }) => {
  const [, { movieId }] = queryKey;
  const apiKey = "YOUR_API_KEY"; // API 키를 설정하세요
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
  const response = await api.get(url);
  return response.data; // 데이터 반환
};

// 영화 상세 정보를 가져오는 custom hook
export const useMovieDetailsEtcQuery = ({ movieId }) => {
  return useQuery({
    queryKey: ["movie-details-etc", { movieId }],
    queryFn: fetchDetailsEtc,
    // 데이터 포맷 선택적 가공 (선택적)
    select: (data) => ({
      budget: data.budget,
      revenue: data.revenue,
      runtime: data.runtime,
      // 기타 필요한 데이터 필드
    }),
  });
};

// // const fetchDetailsEtc = ({ movieId }) => {
// //   const { data } = api.get(`/movies/${movieId}`);
// //   console.log("#### API Response:", data);
// //   return data;
// // };

// const fetchDetailsEtc = async ({ movieId }) => {
//   // queryKey 배열에서 movieId 추출
//   //   const [{ movieId }] = queryKey;
//   //   const [, { movieId }] = queryKey;
//   //   const { data } = await api.get(`/movies/${movieId}`);
//   console.log("### API Response:", movieId);
//   //   return data;
//   return api.get(`/movie/${movieId}`);
// };

// // 영화 상세 정보를 가져오는 custom hook
// export const useMovieDetailsEtcQuery = ({ movieId }) => {
//   return useQuery({
//     queryKey: ["movie-details-etc", { movieId }],
//     queryFn: fetchDetailsEtc,
//     // 선택적으로 결과 데이터를 가공하는 select 함수를 사용할 수 있음
//     // select: (result) => result.data,
//   });
// };

// // // 영화 상세 정보를 가져오는 함수
// // const fetchMovieDetails = async ({ movieId }) => {
// //     const { data } = await api.get(`/movies/${movieId}`);
// //     console.log("API Response:", data);
// //     return data;
// //   };

// // 함수로 만들어 놓으면 가져다 쓰기 편함.
// // export const useMovieDetailsEtcQuery = ({ movieId }) => {
// //   return useQuery({
// //     queryKey: ["movie-details-etc", { movieId }],
// //     queryFn: fetchDetailsEtc({ movieId }),
// //     // select: (result) => result.data,
// //   });
// // };
