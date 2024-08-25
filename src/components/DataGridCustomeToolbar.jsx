import React, { useEffect } from "react";
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";
import useDebounce from "../hooks/useDebounce";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const debouncedSearchInput = useDebounce(searchInput, 1000);

  // Automatically trigger search after debounce
  useEffect(() => {
    if(debouncedSearchInput){
        setSearch(debouncedSearchInput);
    }
  }, [debouncedSearchInput, setSearch]);

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => {
                    setSearch(debouncedSearchInput);
                    setSearchInput("")
                }}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
