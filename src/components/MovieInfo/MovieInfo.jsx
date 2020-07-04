import React, { Component } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { Box, Grid } from "@material-ui/core";

import "./MovieInfo.css";

class MovieInfo extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      data: {},
    };
  }
  componentDidMount() {
    var qString =
      "http://www.omdbapi.com/?apikey=" +
      process.env.REACT_APP_OMDB_API_KEY +
      "&plot=full" +
      "&i=" +
      this.props.imdbID;
    axios.get(qString).then((res) => {
      if (res.data.Response === "True") {
        this.setState({
          ...this.state,
          loading: false,
          data: { ...res.data },
        });
      }
      //console.log(this.state.data, this.state.totalResults);
    });
  }
  render() {
    return (
      <Box mt={2}>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Grid
            spacing={3}
            container
            justify="space-around"
            alignItems="center"
          >
            <Grid item>
              <img src={this.state.data.Poster} alt={this.state.data.Title} />
            </Grid>
            <Grid style={{ width: "500px" }} item>
              <h2>
                {this.state.data.Title} ({this.state.data.Year})
              </h2>
              <h3>Information:</h3>
              <p>
                <span className="bold">Rated: </span>
                {this.state.data.Rated} <br />
                <span className="bold">Released: </span>
                {this.state.data.Released} <br />
                <span className="bold">Runtime: </span>
                {this.state.data.Runtime} <br />
                <span className="bold">Genere: </span>
                {this.state.data.Genre} <br />
                <span className="bold">Language: </span>
                {this.state.data.Language} <br />
                <span className="bold">Writer: </span>
                {this.state.data.Writer} <br />
                <span className="bold">Director: </span>
                {this.state.data.Director} <br />
                <span className="bold">IMDB Rating: </span>{" "}
                {this.state.data.imdbRating} <br />
              </p>
              <br />
              <h3>Actors: </h3>
              <p>{this.state.data.Actors}</p>
              <br />
              <h3>Plot: </h3>
              <p>{this.state.data.Plot}</p>
            </Grid>
          </Grid>
        )}
      </Box>
    );
  }
}

export default MovieInfo;
