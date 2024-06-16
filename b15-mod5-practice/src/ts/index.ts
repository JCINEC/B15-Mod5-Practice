import "../scss/styles.scss";

import { addEventListenerMovieListType, addEventListenerMovieGridButton, addEventListenerMovieListButton, addEventListenerClickSearch, addEventListenerClickBack } from "./event/event";
import { updateMoviesContent } from "./movie/movie"

addEventListenerMovieListType();
addEventListenerMovieGridButton();
addEventListenerMovieListButton();
addEventListenerClickSearch();
addEventListenerClickBack();

updateMoviesContent();




