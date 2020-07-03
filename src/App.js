import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar.jsx";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import MovieList from "./components/MovieList/MovieList.jsx";
import Spinner from "./components/Spinner/Spinner.jsx";
import DispOut from "./components/DispOut/DispOut.jsx";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      loading: false,
      response: "",
      searchTerm: "",
      year: "",
      data: {},
      dataArr: [],
    };
  }
  handleSearchTermChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };
  handleYearChange = (e) => {
    this.setState({
      year: e.target.value,
    });
  };
  onSearchBoxSubmit = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, loading: true, response: "" });
    var queryString =
      "http://www.omdbapi.com/?apikey=" +
      process.env.REACT_APP_OMDB_API_KEY +
      "&s=" +
      this.state.searchTerm +
      "&type=series" +
      "&page=" +
      this.state.page;

    if (
      this.state.year !== undefined &&
      this.state.year !== "" &&
      this.state.year !== null
    ) {
      queryString += "&y=" + this.state.year;
    }

    axios.get(queryString).then((res) => {
      if (res.data.Response === "True") {
        this.setState({
          ...this.state,
          loading: false,
          response: "true",
          data: { ...res.data },
          dataArr: [...res.data.Search],
        });
      } else {
        this.setState({
          ...this.state,
          loading: false,
          response: "false",
          data: {},
          dataArr: [],
        });
      }
      //console.log(this.state.data);
    });
  };
  onClearClick = (e) => {
    this.setState({
      ...this.state,
      page: 1,
      loading: false,
      response: "",
      searchTerm: "",
      year: "",
      data: {},
      dataArr: [],
    });
  };
  render() {
    return (
      <div className="App">
        <Navbar appName="OMDB Finder" />
        <SearchBox
          searchTermValue={this.state.searchTerm}
          yearValue={this.state.year}
          handleSearchTermChange={this.handleSearchTermChange}
          handleYearChange={this.handleYearChange}
          onSearchBoxSubmit={this.onSearchBoxSubmit}
          onClearClick={this.onClearClick}
        />
        {this.state.loading ? (
          <Spinner />
        ) : (
          <MovieList movies={[...this.state.dataArr]} />
        )}
        {this.state.response === "false" ? (
          <DispOut content={"No Result Found!"} />
        ) : null}
      </div>
    );
  }
}

export default App;
