import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import YouTube from "react-youtube";

export const VideoModal = ({ open, handleClose, videoId, videoTitle }) => {
  const videoOpts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0, // 자동재생을 원하지 않으면 이 값을 0으로 설정
    },
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle>
        {videoTitle}{" "}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <DialogTitle>Watch Video</DialogTitle>
          <DialogContent>
            <YouTube
              videoId={videoId}
              opts={videoOpts}
              onReady={(event) => event.target.pauseVideo()}
            />
          </DialogContent>
        </Dialog>
        {/* <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/your_video_id"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> */}
      </DialogContent>
    </Dialog>
  );
};
