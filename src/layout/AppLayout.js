import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link, useNavigate } from "react-router-dom"; // 리액트 V6  도입 // 리액트 안에 있는 자손들을 가져오게 해주는
import hlogo from "../assets/images/hlogo.svg";
import { Stack } from "@mui/material";
// import netlogo from "../assets/images/netlogo.svg";
// import  from "../assets/images/logo.svg";
import "./AppLayout.style.css";

const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  // 이게 form이기 때문에 form의 경우 항상 e.preventDefault() 리프레쉬 막게 선언하기
  // keyword의 url을 바꿔줘야 한다.
  // e.preventDefault();

  // const searchByKeyword = (e) => {
  //   // url을 바꿔주기 // url을 바꿔줌으로써 다음페이지에 url값을 받아서 읽어올거에요
  //   // movies/키워드 << 채워진채로 들어오게 된다.
  //   e.preventDefault();
  //   navigate(`/movies?q=${keyword}`);
  //   // setKeyword(""); // 검색 종료 후 셋키워드 비워주고 싶을 시 추가
  // };

  const searchByKeyword = (e) => {
    e.preventDefault();
    // 검색 조건을 URL로 업데이트하는 로직
    updateSearchQuery(keyword);
  };

  // // 검색 조건이 변경될 때 URL 업데이트하는 로직
  // const updateSearchQuery = (newKeyword) => {
  //   if (newKeyword) {
  //     navigate(`/movies?q=${newKeyword}`);
  //   } else {
  //     navigate("/movies"); // 검색어가 없을 경우, 검색 쿼리를 제거
  //   }
  // };

  // const updateSearchQuery = (newKeyword) => {
  //   if (newKeyword) {
  //     // 검색어가 있을 경우, 현재 위치를 유지하면서 검색 쿼리만 업데이트
  //     navigate(`?q=${newKeyword}`, { replace: true });
  //   } else {
  //     // 검색어가 없을 경우, '/movies'로 이동
  //     navigate("/movies", { replace: true }); // 페이지 새로고침 방지
  //   }
  // };

  const updateSearchQuery = (newKeyword) => {
    if (newKeyword) {
      // 검색어가 있을 경우, '/movies' 경로로 이동하면서 검색 쿼리를 추가
      navigate(`/movies?q=${newKeyword}`, { replace: true });
    } else {
      // 검색어가 없을 경우, '/movies'로 이동
      navigate("/movies", { replace: true });
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        variant="dark"
        className="bg-dark p-0 navbar"
        // sx={{ height: "56px" }}
      >
        <Container
          fluid
          style={{
            backgroundColor: "black",
            height: "56px",
          }}
        >
          <Navbar.Brand href="#">
            <img
              src={hlogo}
              onClick={() => navigate("/")}
              width="100"
              height="30"
              className="d-inline-block align-top"
              alt="Netflix logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/movies" className="nav-link">
                movies
              </Link>
            </Nav>
            <Form
              className="d-flex"
              onSubmit={searchByKeyword}
              // onSubmit을 호출해주겠다
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 form-control"
                aria-label="Search"
                value={keyword} // 이키워드를 입력할때마다 세팅해주는 친구, onChange
                onChange={(e) => setKeyword(e.target.value)} // 안에서 변화가 일어날때 마다 셋키워드
              />
              <Stack gap={1} sx={{ display: "flex", flexDirection: "row" }}>
                {keyword && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => setKeyword("")}
                  >
                    Clear
                  </Button>
                )}
                <Button
                  variant="outline-danger"
                  type="submit"
                  // className="button"
                >
                  Search
                </Button>
                {/* {keyword && ( */}
                <Button variant="danger" onClick={() => navigate("/movies")}>
                  All
                </Button>
                {/* )} */}
              </Stack>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default AppLayout;
