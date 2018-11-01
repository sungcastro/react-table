import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    sortColum: { column: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(mo => mo._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleSorting = column => {
    const sortColum = { ...this.state.sortColum };
    if (sortColum.column === column)
      sortColum.order = sortColum.order === "asc" ? "desc" : "asc";
    else {
      sortColum.column = column;
      sortColum.order = "asc";
    }

    this.setState({ sortColum });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColum,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const { length: count } = this.state.movies;

    if (count === 0) return <h1>It's Britney Bitch</h1>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColum.column], [sortColum.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="container">
            <div className="col">
              <h3>
                Showing
                <span className="text-primary"> {filtered.length} </span> movies
                in the data base
              </h3>
              <MoviesTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSorting={this.handleSorting}
              />
              <Pagination
                itemsCount={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
