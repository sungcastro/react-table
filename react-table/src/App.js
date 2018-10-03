import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Movies from "./components/movies";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="containter w-50 p-3 mx-auto mt-4">
          <Movies />
        </div>
      </div>
    );
  }
}

export default App;
