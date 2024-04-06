import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link } from "react-router-dom"; // 리액트 V6  도입 // 리액트 안에 있는 자손들을 가져오게 해주는

const AppLayout = () => {
  return (
    <>
      <Navbar
        expand="lg"
        variant="dark"
        className="bg-dark p-0"
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
              src="https://i.namu.wiki/i/VC4ybUEcyxjcNN9bbD94MSuC90nzQOrsa-ZKYd8ZCcbFW62IB2vvvP5hZxbdNPR2oms8avAsSQJXKCQ3L4rTpw.svg"
              width="100"
              height="30"
              className="d-inline-block align-top"
              alt="Netflix logo"
            />
            {/* https://logohistory.net/wp-content/uploads/2023/05/Netflix-Logo.png */}
            {/* https://bi-jingo.com/wp-content/uploads/2009/03/netflix-logo-png-clip-art.png */}
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
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default AppLayout;
