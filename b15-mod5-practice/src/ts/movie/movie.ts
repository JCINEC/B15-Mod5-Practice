import { MovieLayoutMode } from "../models/movie-layout-mode.enum";
import { MovieListData } from "../models/movie-list-data.interface";
import { MovieListType } from "../models/movie-type.enum";
import { fetchMovieListData } from "../api/api"

let currentListType = MovieListType.NowPlaying;
let currentListMode = MovieLayoutMode.Grid;
let currentMovieListData: MovieListData[];

export async function firstLoading() {
    currentMovieListData = await fetchMovieListData(currentListType);
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

export function showMovieList(movieListData: MovieListData[]){
    console.log("showMovies", movieListData);
    const movieListElement = currentListMode === MovieLayoutMode.Grid ? createMovieGridElement(movieListData) : createMovieListElement(movieListData);
    const app = document.querySelector("#app")
    if (app !== null) {
        app.innerHTML = '';
        app.appendChild(movieListElement);
    }
}

function createMovieGridElement(movieListData: MovieListData[]): HTMLElement {
    const moviesElement = document.createElement("div");
    moviesElement.className = "row";
    movieListData.forEach((Data) => {
        if(Data.id !== 1) {
            const art = document.createElement("article");
            art.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
            const d1 = document.createElement("div");
            d1.className = "card";
            art.appendChild(d1);
            const d2 = document.createElement("div");
            d2.className = "row g-0";
            d1.appendChild(d2);
            const d3 = document.createElement("div");
            d3.className = "col-12";
            d2.appendChild(d3);
            const poster = document.createElement("img");
            poster.src = Data.poster;
            poster.className = "poster";
            d3.appendChild(poster);
            const d4 = document.createElement("div");
            d4.className = "col-12";
            d2.appendChild(d4);
            const d5 = document.createElement("div");
            d5.className = "car-body";
            d4.appendChild(d5);
            const h5 = document.createElement("h5");
            h5.className = "card-title my-3 mx-3";
            h5.textContent = Data.title;
            d5.appendChild(h5);
            const span = document.createElement("span");
            span.className = "my-3 mx-3";
            span.textContent = "Rating: " + Data.rating + " | " + Data.year;
            d5.appendChild(span);
            const p = document.createElement("p");
            p.className = "card-text my-3 mx-3";
            p.textContent = Data.description;
            d5.appendChild(p);
            moviesElement.appendChild(art);
        }});
    return moviesElement;
}

function createMovieListElement(movieListData): HTMLElement {
    const moviesElement = document.createElement("div");
    moviesElement.className = "row";
    console.log("hola mundo!");
    movieListData.forEach((Data) => {
        if(Data.id !== 1) {
            const art = document.createElement("article");
            art.className = "list col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
            const d1 = document.createElement("div");
            d1.className = "card-list";
            art.appendChild(d1);
            const d2 = document.createElement("div");
            d2.className = "row g-0";
            d1.appendChild(d2);
            const d3 = document.createElement("div");
            d3.className = "col-12";
            d2.appendChild(d3);
            const poster = document.createElement("img");
            poster.src = Data.poster;
            poster.className = "poster";
            d3.appendChild(poster);
            const d4 = document.createElement("div");
            d4.className = "col-12";
            d2.appendChild(d4);
            const d5 = document.createElement("div");
            d5.className = "car-body";
            d4.appendChild(d5);
            const h5 = document.createElement("h5");
            h5.className = "card-title my-3 mx-3";
            h5.textContent = Data.title;
            d5.appendChild(h5);
            const span = document.createElement("span");
            span.className = "my-3 mx-3";
            span.textContent = "Rating: " + Data.rating + " | " + Data.year;
            d5.appendChild(span);
            const p = document.createElement("p");
            p.className = "card-text my-3 mx-3";
            p.textContent = Data.description;
            d5.appendChild(p);
            moviesElement.appendChild(art);
        }});
    return moviesElement;
}