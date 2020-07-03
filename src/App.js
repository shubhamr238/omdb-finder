import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar.jsx";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import MovieList from "./components/MovieList/MovieList.jsx";
import Spinner from "./components/Spinner/Spinner.jsx";
import DispOut from "./components/DispOut/DispOut.jsx";
import Paginate from "./components/Paginate/Paginate.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      totalResults: 0,
      loading: false,
      response: "",
      searchTerm: "",
      year: "",
      data: {},
      dataArr: [],
    };
  }

  apiCall = () => {
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
    console.log(queryString);
    axios.get(queryString).then((res) => {
      if (res.data.Response === "True") {
        this.setState({
          ...this.state,
          loading: false,
          response: "true",
          totalResults: parseInt(res.data.totalResults),
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
      console.log(this.state.data, this.state.totalResults);
    });
  };

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
    this.apiCall();
  };

  onClearClick = (e) => {
    this.setState({
      ...this.state,
      page: 1,
      totalResults: 0,
      loading: false,
      response: "",
      searchTerm: "",
      year: "",
      data: {},
      dataArr: [],
    });
  };

  onPageChange = async (e, p) => {
    console.log(p);
    await this.setState({ ...this.state, page: p });
    await this.apiCall();
  };

  render() {
    let numberPages = Math.floor(this.state.totalResults / 10);
    return (
      <div className="App">
        <Navbar appName="OMDB Series Finder" />
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
        {numberPages > 10 ? (
          <Paginate count={numberPages} onChange={this.onPageChange} />
        ) : null}
      </div>
    );
  }
}

export default App;
