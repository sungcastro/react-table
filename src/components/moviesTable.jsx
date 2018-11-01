import React from "react";
import Like from "./common/like";

const MoviesTable = props => {
  const { movies, onLike, onDelete, onSorting } = props;

  return (
    <table className="table mt-4 mb-4">
      <thead className="thead-dark">
        <tr>
          <th onClick={() => onSorting("title")}>Title</th>
          <th onClick={() => onSorting("genre.name")}>Genre</th>
          <th onClick={() => onSorting("numberInStock")}>Stock</th>
          <th onClick={() => onSorting("dailyRentalRate")}>Rate</th>
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
};

export default MoviesTable;
