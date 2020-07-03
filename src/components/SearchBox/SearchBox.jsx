import React from "react";
import { Box, TextField, Grid, Button, Container } from "@material-ui/core";
export default function SearchBox(props) {
  return (
    <Box my={4}>
      <Container>
        <form onSubmit={props.onSearchBoxSubmit}>
          <Grid spacing={5} container justify="flex-start" alignItems="center">
            <Grid item xs={7}>
              <TextField
                type="search"
                id="search"
                label="Title"
                variant="outlined"
                value={props.searchTermValue}
                onChange={props.handleSearchTermChange}
                required={true}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="text"
                id="year"
                label="Year"
                variant="outlined"
                value={props.yearValue}
                onChange={props.handleYearChange}
                fullWidth
              />
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Button
                style={{ marginTop: "20px", marginRight: "10px" }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Search
              </Button>
              <Button
                style={{ marginTop: "20px" }}
                variant="contained"
                color="secondary"
                onClick={props.onClearClick}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
