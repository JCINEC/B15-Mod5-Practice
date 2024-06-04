import "../scss/styles.scss";

import { addEventListenerMovieListType, addEventListenerMovieGridButton, addEventListenerMovieListButton } from "./event/event";
import { firstLoading } from "./movie/movie"

addEventListenerMovieListType();
addEventListenerMovieGridButton();
addEventListenerMovieListButton();

firstLoading();




