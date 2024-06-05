import "../scss/styles.scss";

import { addEventListenerMovieListType, addEventListenerMovieGridButton, addEventListenerMovieListButton, addEventListenerClickSearch } from "./event/event";
import { updateMoviesContent } from "./movie/movie"

addEventListenerMovieListType();
addEventListenerMovieGridButton();
addEventListenerMovieListButton();
addEventListenerClickSearch();

updateMoviesContent();




