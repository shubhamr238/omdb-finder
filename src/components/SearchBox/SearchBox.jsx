import React from "react";
import { Box, TextField, Grid, Button, Container } from "@material-ui/core";
export default function SearchBox(props) {
  return (
    <Box my={4}>
      <Container>
        <form>
          <Grid container justify="space-around" alignItems="center">
            <Grid item xs={7}>
              <TextField
                type="search"
                id="search"
                label="Name"
                variant="outlined"
                value={props.searchTermValue}
                onChange={props.handleSearchTermChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                id="year"
                label="Year"
                variant="outlined"
                value={props.yearValue}
                onChange={props.handleYearChange}
                required
                fullWidth
              />
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Button
                style={{ marginTop: "20px" }}
                type="submit"
                variant="contained"
                color="secondary"
                onClick={props.onClick}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
}
