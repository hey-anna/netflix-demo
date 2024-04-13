import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import "./RecommendMovieCard.style.css";

export default function RecommendMovieCard({ recommends }) {
  const theme = useTheme();

  return (
    <>
      <Typography component="h3" variant="h3" sx={{ mt: 3, mb: 1 }}>
        recommends
      </Typography>
      <Box
        sx={{
          mt: 1,
          //   pb: 4,
          //   pl: 4,
          //   pr: 4,
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        {recommends.map((recommend, index) => (
          <Card
            key={recommend.id}
            className="recard"
            sx={{
              display: "flex",
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <CardContent
                sx={{ position: "absolute" }}
                className="removie-card overlay"
              >
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ color: "#fff", p: 1 }}
                >
                  {recommend.title}
                </Typography>
                {/* <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Mac Miller
          </Typography> */}
              </CardContent>
              {/* <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box> */}
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${recommend.poster_path}`} // 이미지 URL 올바르게 설정
              alt={`Poster of ${recommend.title}`}
            />
            {/* <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="/static/images/cards/live-from-space.jpg"
            alt="Live from space album cover"
          /> */}
            {/* <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${recommends?.poster_path}`}
            alt={recommend.title}
          /> */}
            {/* <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${recommends?.poster_path}`}
            alt={`Poster of ${recommends?.title}`}
            style={{ width: "100%" }}
          /> */}
          </Card>
        ))}
      </Box>
    </>
  );
}
