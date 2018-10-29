import React from "react";
import Like from "./common/like";

const MoviesTable = props => {
  const { movies, handleLike, handleDelete } = props;

  return (
    <table className="table mt-4 mb-4">
      <thead className="thead-dark">
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
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
              <Like
                liked={movie.liked}
                onToggleHeart={() => handleLike(movie)}
              />
            </td>
            <td>
              <button
                onClick={() => handleDelete(movie)}
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
