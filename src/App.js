import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Coustumers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <main className="container-fluid mt-4 ">
          <Switch>
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Coustumers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
