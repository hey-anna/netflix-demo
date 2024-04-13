import React from "react";
// import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import "./SortFilter.style.css";
import { hover } from "@testing-library/user-event/dist/hover";
const SortFilter = ({ onSortChange, sortOption, options }) => {
  //   const [sortOption, setSortOption] = useState("recent");

  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    // setSortOption(newSortOption);
    onSortChange(newSortOption);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // padding: "20px 0",
        mt: 3,
        mb: 3,
        width: "100%",
      }}
    >
      {/* <Typography variant="h6"> */}
      {/* 전체 데이터 건수: {dataItems.length} 건 */}
      {/* </Typography> */}
      <FormControl
        // size="small"
        sx={{
          minWidth: 240,
          // width: "90%",
          borderColor: "white",
          color: "white",
          "& .MuiSvgIcon-root": { color: "white" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
        }}
      >
        {/* <InputLabel id="sort-select-label">정렬 옵션</InputLabel> */}
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortOption}
          //   label="정렬 옵션"
          //   placeholder="정렬 옵션"

          onChange={handleSortChange}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "#fff !important",
              background: "#ccc",
              border: "1px solid #ccc",
              color: "#000",
            },
            "&:before": { borderColor: "white" },
            "&:after": { borderColor: "white" },
            "& .MuiSvgIcon-root": { color: "white" },
            "&:hover:not(.Mui-disabled):before": {
              borderColor: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiInputBase-root": {
              borderColor: "white",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          {/* <MenuItem value={"recent"}>등록일자순</MenuItem>
          <MenuItem value={"toprated"}>추천순</MenuItem>
          <MenuItem value={"cheapest"}>인기순</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortFilter;
