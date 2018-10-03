import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete(movie) {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  }

  renderText() {
    if (this.state.movies.length === 0)
      return <h2>There are no movies in the Data Base</h2>;
    return this.state.movies.length;
  }

  render() {
    return (
      <div>
        <span>
          {this.renderText()}
          {this.state.movies.length === 0 && (
            <h6>You deleted all the movies</h6>
          )}
        </span>

        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Title📽</th>
              <th>Genre🍿</th>
              <th>Stock🗄</th>
              <th>Rate🧐</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
