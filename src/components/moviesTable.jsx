import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  raiseSort = column => {
    const sortColum = { ...this.props.sortColum };
    if (sortColum.column === column)
      sortColum.order = sortColum.order === "asc" ? "desc" : "asc";
    else {
      sortColum.column = column;
      sortColum.order = "asc";
    }
    this.props.onSorting(sortColum);
  };

  render() {
    const { movies, onLike, onDelete } = this.props;

    return (
      <table className="table mt-4 mb-4">
        <thead className="thead-dark">
          <tr>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
            <th>Liked</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like liked={movie.liked} onToggleHeart={() => onLike(movie)} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-warning text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
