import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
// 데이터를 읽어오기위에 쿼리를 만들어야 한다.
// 키워드에 따라 쿼리가 달라진다
// ['movie-search'] 항상 이것으로 불러 줄 수 없다.
// export const useSearchMovieQuery = ({keyword}) >> 키워드를 매개 변수로 받아올 것이다
// 키워드를 받아왔다는 전제하에 키워드를 넣어주겠습니다.

//

const fetchSearchMovie = ({ keyword, page }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page }],
    queryFn: () => fetchSearchMovie({ keyword, page }), //키워드도 같이 보내는데, fetchSearchMovie함수가 키워드를 받아서 리턴을 하는데 키워드에 따라서 키워드가있다면 어떤것을 get 없다하면 다른것을 get
    select: (result) => result.data, // result가 오면 result.data을 리턴을 해주세요 // 지저분한것 없이 필요한것 부르기
  });
};
