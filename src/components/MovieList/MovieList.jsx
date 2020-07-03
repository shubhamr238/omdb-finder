import React, { Component } from "react";
import { Box, Container, Grid } from "@material-ui/core";

import MovieItem from "../MovieItem/MovieItem";

export default class MovieList extends Component {
  render() {
    return (
      <Box my={4}>
        <Container>
          <Grid container spacing={4} justify="flex-start" alignItems="center">
            {this.props.movies.map((movie, i) => {
              return <MovieItem data={movie} key={i} />;
            })}
          </Grid>
        </Container>
      </Box>
    );
  }
}
