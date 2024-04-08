// constants : 고정되어 있는 값

// 컨스턴트?,, 따로 컴포넌트로 뽑아서 분리 - 재사용 가능성이 있다면
// 상수를 뽑아서 따로 폴더를 만들어도 상관없다. & 여기둬도 상관없다.
export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    //   slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    //   slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    //   slidesToSlide: 1, // optional, default to 1.
  },
};
