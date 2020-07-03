import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar.jsx";
// import SearchArea from "./components/SearchArea/SearchArea.jsx";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      searchTerm: "",
      year: "",
      data: {},
    };
  }
  handleSearchTermChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
    console.log(this.state.searchTerm);
  };
  handleYearChange = (e) => {
    this.setState({
      year: e.target.value,
    });
    console.log(this.state.year);
  };
  onClick = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${this.state.userQuery}&page=1`
      )
      .then((res) => {
        this.setState({ data: { ...res.data } });
        console.log(this.state.data);
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
          onClick={this.onClick}
        />
      </div>
    );
  }
}

export default App;
