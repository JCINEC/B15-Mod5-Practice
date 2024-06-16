import { MovieLayoutMode } from "../models/movie-layout-mode.enum";
import { MovieListData } from "../models/movie-list-data.interface";
import { MovieListType } from "../models/movie-type.enum";
import {
  fetchMovieListData,
  fetchSearchMovieListData,
  getDetailsData,
} from "../api/api";
import { MovieDetail } from "../models/movie-detail.interface";
import { addEventListenerMovieCard } from "../event/event";

let currentListType = MovieListType.NowPlaying;
let currentListMode = MovieLayoutMode.Grid;
let currentMovieListData: MovieListData[];

export async function updateMoviesContent() {
  currentMovieListData = await fetchMovieListData(currentListType);
  showMovieList(currentMovieListData);
}

export async function updateMovieDetailsContent(id: string) {
  const data = await getDetailsData(id);
  createDetails(data);
  // showMovieList(currentMovieListData);
}

export async function searchMovie(text: string) {
  currentMovieListData = await fetchSearchMovieListData(text);
  showMovieList(currentMovieListData);
}

export async function setCurrentListType(newValue: MovieListType) {
  currentListType = newValue;
  // fetch de nuevo listado de películas
  currentMovieListData = await fetchMovieListData(currentListType);
  showMovieList(currentMovieListData);
}

export function setCurrentListMode(newValue: MovieLayoutMode) {
  console.log("Buenas!", newValue);
  currentListMode = newValue;
  showMovieList(currentMovieListData);
}

export function showMovieList(movieListData: MovieListData[]) {
  console.log("showMovies", movieListData);
  const movieListElement = createMovies(movieListData);
  const app = document.querySelector("#app");
  if (app !== null) {
    app.innerHTML = "";
    app.appendChild(movieListElement);
  }
}

function createElem(elem: string, className: string): HTMLElement {
  const e = document.createElement(elem);
  e.className = className;
  return e;
}

function createBackdrop(
  elem: string,
  className: string,
  url: string
): HTMLElement {
  const e = createElem(elem, className);
  console.log(url);
  e.setAttribute("style", `background-image: url(${url});`);
  return e;
}

function createDetailRatingAndYear(
  elem: string,
  className: string,
  rating: number,
  year: string
): HTMLElement {
  const e = createElem(elem, className);
  e.textContent = "Valoración: " + rating + " | Año: " + year;
  return e;
}
function createSynopsis(
  elem: string,
  className: string,
  description: string
): HTMLElement {
  const e = createElem(elem, className);
  e.innerHTML = "Sinopsis:<br/>" + description;
  return e;
}

function createDetails(data: MovieDetail) {
  const app = document.querySelector("#app");
  if (app !== null) {
    app.innerHTML = "";

    const header = createArticle(
      "article",
      "content list col-12 col-sm-6 col-md-4 col-lg-3 mb-4",
      data.id
    );

    const d1 = createElem("div", "card-list");
    const d2 = createElem("div", "row g-0");
    d1.appendChild(d2);
    const d3 = createElem("div", "col-12");
    d2.appendChild(d3);
    const poster = createPoster("poster", data.poster);
    d3.appendChild(poster);
    const d4 = createElem("div", "col-12");
    d2.appendChild(d4);
    const d5 = createElem("div", "car-body");
    d4.appendChild(d5);
    const title = createTitle("h5", "card-title my-3 mx-3", data.title);
    d5.appendChild(title);
    const ratingAndYear = createDetailRatingAndYear(
      "span",
      "my-3 mx-3",
      data.rating,
      data.year
    );
    d5.appendChild(ratingAndYear);
    const description = createSynopsis(
      "p",
      "card-text my-3 mx-3",
      data.synopsis
    );
    d5.appendChild(description);
    header.appendChild(d1);
    const details = createBackdrop("div", "row backdrop", data.backdrop);
    const opacity = createElem("div", "opacity");
    details.appendChild(opacity);
    opacity.appendChild(header);
    app.appendChild(details);
  }
}

function createArticle(
  elem: string,
  className: string,
  id: number
): HTMLElement {
  const e = createElem(elem, className);
  e.id = `${id}`;
  addEventListenerMovieCard(e);
  return e;
}

function createPoster(className: string, url: string): HTMLImageElement {
  const e = document.createElement("img");
  e.className = className;
  e.src = url;
  return e;
}

function createTitle(
  elem: string,
  className: string,
  title: string
): HTMLElement {
  const e = createElem(elem, className);
  e.textContent = title;
  return e;
}

function createRatingAndYear(
  elem: string,
  className: string,
  rating: number,
  year: string
): HTMLElement {
  const e = createElem(elem, className);
  e.textContent = "Rating: " + rating + " | " + year;
  return e;
}

function createDescription(
  elem: string,
  className: string,
  description: string
): HTMLElement {
  const e = createElem(elem, className);
  e.textContent = description;
  return e;
}

function createFilm(data: MovieListData): HTMLElement {
  const film =
    currentListMode === MovieLayoutMode.Grid
      ? createArticle(
          "article",
          "col-12 col-sm-6 col-md-4 col-lg-3 mb-4",
          data.id
        )
      : createArticle(
          "article",
          "list col-12 col-sm-6 col-md-4 col-lg-3 mb-4",
          data.id
        );
  const d1 =
    currentListMode === MovieLayoutMode.Grid
      ? createElem("div", "card")
      : createElem("div", "card-list");
  film.appendChild(d1);
  const d2 = createElem("div", "row g-0");
  d1.appendChild(d2);
  const d3 = createElem("div", "col-12");
  d2.appendChild(d3);
  const poster = createPoster("poster", data.poster);
  d3.appendChild(poster);
  const d4 = createElem("div", "col-12");
  d2.appendChild(d4);
  const d5 = createElem("div", "car-body");
  d4.appendChild(d5);
  const title = createTitle("h5", "card-title my-3 mx-3", data.title);
  d5.appendChild(title);
  const ratingAndYear = createRatingAndYear(
    "span",
    "my-3 mx-3",
    data.rating,
    data.year
  );
  d5.appendChild(ratingAndYear);
  const description = createDescription(
    "p",
    "card-text my-3 mx-3",
    data.description
  );
  d5.appendChild(description);
  return film;
}

function createMovies(movieListData: MovieListData[]): HTMLElement {
  const moviesElement = document.createElement("div");
  moviesElement.className = "row";
  console.log("grid");
  movieListData.forEach((data) => {
    if (data.id !== -1) {
      const film = createFilm(data);
      moviesElement.appendChild(film);
    }
  });
  return moviesElement;
}
