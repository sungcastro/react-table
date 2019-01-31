import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
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

  handleSorting = sortColum => {
    this.setState({ sortColum });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColum,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColum.column], [sortColum.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: movies
    };
  };

  render() {
    const {
      genres,
      pageSize,
      currentPage,
      sortColum,
      selectedGenre,
      searchQuery
    } = this.state;

    const { length: count } = this.state.movies;

    if (count === 0) return <h1>It's Britney Bitch</h1>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="container">
            <div className="col">
              <Link to="/movies/new" className="btn btn-primary mb-4">
                New Movie
              </Link>

              <h3>
                Showing
                <span className="text-primary"> {totalCount} </span> movies in
                the data base
              </h3>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <MoviesTable
                movies={movies}
                sortColum={sortColum}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSorting={this.handleSorting}
              />
              <Pagination
                itemsCount={totalCount}
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
