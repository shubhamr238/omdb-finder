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

  apiCall = async () => {
    var queryString =
      "https://www.omdbapi.com/?apikey=" +
      process.env.REACT_APP_OMDB_API_KEY +
      "&s=" +
      this.state.searchTerm +
      "&page=" +
      this.state.page;
    if (
      this.state.year !== undefined ||
      this.state.year !== "" ||
      this.state.year !== null
    ) {
      queryString += "&y=" + this.state.year;
    }
    //console.log(queryString);
    await axios.get(queryString).then((res) => {
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
      //console.log(this.state.data, this.state.totalResults);
    });
  };

  handleSearchTermChange = (e) => {
    this.setState({
      ...this.state,
      searchTerm: e.target.value,
    });
  };

  handleYearChange = (e) => {
    this.setState({
      ...this.state,
      year: e.target.value,
    });
  };

  onSearchBoxSubmit = async (e) => {
    await e.preventDefault();
    await this.setState({
      ...this.state,
      page: 1,
      loading: true,
      response: "",
    });
    await this.apiCall();
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
    await this.setState({ ...this.state, page: p });
    await this.apiCall();
  };

  render() {
    let numberPages = Math.ceil(parseInt(this.state.totalResults) / 10);
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
        {numberPages > 0 ? (
          <Paginate count={numberPages} onChange={this.onPageChange} />
        ) : null}
      </div>
    );
  }
}

export default App;
