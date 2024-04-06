import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
// import { purple } from "@mui/material/colors";
import HomeIcon from "@mui/icons-material/Home";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrimace } from "@fortawesome/free-regular-svg-icons";
import "./NotFoundPage.style.css";

// import { Container } from "react-bootstrap";

// const primary = purple[500]; // #f44336

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "left",
        minHeight: "100vh",
        height: "100vh",
        // width: "1200px",
        // margin: "0 auto",
        // backgroundColor: primary,
        // margin: "0 auto",
        // maxWidth: "1043px",
        position: "relative", // 아이콘을 배치하기 위해 relative 설정
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: "18%", // 오른쪽에 위치
          top: "30%", // 상단에서 50% 위치
          transform: "translateY(-50%)", // 중앙 정렬
          color: "lightgrey", // 연한 회색으로 설정
          fontSize: "350px", // 크기 설정
        }}
      >
        <FontAwesomeIcon icon={faFaceGrimace} />
      </Box>
      <Container
        sx={{
          // backgroundColor: "green",
          // width: "100%",
          pt: 8,
          pb: 6,
          zIndex: 2,
          //   margin: "0 auto",
          //   width: "50%",
        }}
        maxWidth="lg"
      >
        <Typography variant="h1" style={{ color: "#468ECD" }}>
          PAGE NOT FOUND
        </Typography>
        <Box sx={{ display: "flex" }}>
          <ErrorOutlineIcon sx={{ color: "#468ECD", fontSize: "12rem" }} />
          <Typography
            //   variant="h1"
            style={{ color: "#468ECD", fontSize: "12rem" }}
          >
            404
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ marginTop: "20px", color: "gray" }}>
          Oops! It looks like the page you were searching for has disappeared or
          never existed. But don't worry, you can easily find your way back home
          with a click of the button below.
        </Typography>
        <Button
          startIcon={<HomeIcon />}
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            marginTop: "20px",
            borderRadius: "20px",
            padding: "10px 20px",
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
            },
            fontSize: "1rem",
          }}
        >
          홈으로 돌아가기
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
