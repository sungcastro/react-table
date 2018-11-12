import React, { Component } from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          liked={movie.liked}
          onToggleHeart={() => this.props.onLike(movie)}
        />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-warning text-white"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, sortColum, onSorting } = this.props;

    return (
      <table className="table mt-4 mb-4">
        <TableHeader
          columns={this.columns}
          sortColum={sortColum}
          onSorting={onSorting}
        />

        <TableBody columns={this.columns} data={movies} />
      </table>
    );
  }
}

export default MoviesTable;
