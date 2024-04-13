import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/material";

export default function ReviewBox({ reviews }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ mt: 6, pb: 4 }}>
      <Typography component="h3" variant="h3" sx={{ mb: 1 }}>
        Reviews
      </Typography>
      {reviews.map((review, index) => (
        <Accordion
          key={review.id}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            "&.Mui-expanded": {
              margin: "1px 0", // 확장됐을 때의 마진 제거
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              width: "100%",
            }} // 여기에 overflow 추가
          >
            <Stack
              direction="row"
              spacing={2}
              // sx={{ width: "100%", alignItems: "center" }}
              sx={{ display: "flex", width: "100%" }}
            >
              <Typography
                // sx={{ width: "33%", flexShrink: 0 }}
                // sx={{
                //   whiteSpace: "nowrap",
                //   overflow: "hidden",
                //   textOverflow: "ellipsis",
                //   fontWeight: "bold",
                // }}
                sx={{
                  // whiteSpace: "nowrap",
                  flex: 1,
                  // width: "33%",
                  flexShrink: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "bold",

                  // whiteSpace: "nowrap",
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                  // fontWeight: "bold",
                  // maxWidth: "30%", // 저자 이름에 최대 너비 설정
                }}
              >
                {review.author}
              </Typography>
              <Typography
                sx={{
                  // p: 0,
                  // m: 0,
                  flex: 3, // 내용에 공간 비율 설정
                  color: "text.secondary",
                  whiteSpace: "normal", // 여러 줄 표시 가능
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  // maxHeight: "54px", // 최대 높이 설정
                  // lineHeight: "18px", // 라인 높이 설정 (글자 크기에 따라 조정 필요)
                  // display: "-webkit-box",
                  WebkitLineClamp: 1, // 최대 3줄까지만 표시
                  WebkitBoxOrient: "vertical",
                  display:
                    expanded === `panel${index}` ? "none" : "-webkit-box", // 확장 시 숨기고, 축소 시 보여줌

                  //
                  // // whiteSpace: "nowrap",
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                  // flex: 3, // 자동으로 공간 분배
                  // color: "text.secondary",
                  // whiteSpace: "nowrap",
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                  // maxWidth: "70%", // 내용에 최대 너비 설정
                }}
                // sx={{
                //   color: "text.secondary",
                //   width: "30%",
                //   // text-align: center;
                //   // cursor: pointer;
                //   whiteSpace: "nowrap",
                //   textOverflow: "ellipsis",
                //   overflow: "hidden",
                // }}
                // sx={{
                //   whiteSpace: "nowrap",
                //   overflow: "hidden",
                //   textOverflow: "ellipsis",
                //   flexGrow: 1,
                //   maxWidth: "calc(100% - 160px)", // 전체 너비에서 저자 이름 너비를 뺀 값 설정
                // }}
              >
                {review.content}
              </Typography>
            </Stack>
            {/* <Typography
              sx={{
                flex: 7,
                marginRight: "8px", // 조금의 간격을 줘서 텍스트가 겹치지 않도록 함
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {review.author}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                flex: 9,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {review.content}
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{review.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
