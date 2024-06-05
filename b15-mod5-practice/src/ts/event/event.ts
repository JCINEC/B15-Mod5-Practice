import { MovieListType } from "../models/movie-type.enum";
import { searchMovie, setCurrentListMode, setCurrentListType, showMovieList, updateMoviesContent } from "../movie/movie";
import { MovieLayoutMode } from "../models/movie-layout-mode.enum";

export function addEventListenerMovieListType(){
    const elem: HTMLElement | null = document.getElementById("movie-type-select");
    
    if(elem === null) throw new Error('The "movie-type-select" id does not exist.');

    elem.addEventListener("change", (event: Event) => {
        const selectElement = event.target as HTMLSelectElement;
        setCurrentListType(selectElement.value as MovieListType);
    });
}
/*Prueba*/
function searchListener(event) {
    event.preventDefault();
    const text = document.getElementById("search-input") as HTMLInputElement;
    console.log("Button search clicked", text);
    if(text.value?.length && text.value.length > 0) searchMovie(text.value);
}

export function addEventListenerClickSearch() {
    const button = document.getElementById("search-button");
    button?.addEventListener('click', searchListener);
    /*'https://api.themoviedb.org/3/search/keyword?page=1'*/
}

function back(event){
    event.preventDefault();
    document.getElementById("detail")?.setAttribute("visibility", "hidden");
    document.getElementById("movies")?.setAttribute("visibility", "visible");
    /*Poner código de listado o grid de películas*/
    updateMoviesContent();
}

export function addEventListenerClickBack() {
    const button = document.getElementById("back");
    button?.addEventListener('click', back);
    /*'https://api.themoviedb.org/3/search/keyword?page=1'*/
}

export function addEventListenerMovieGridButton() {
    const elem: HTMLElement | null = document.getElementById("btn-grid-mode");

    if(elem == null) throw new Error('The "btn-grid-mode" id does not exist.');

    elem.addEventListener("click", (event: Event) => {
        console.log("Button grid mode clicked");
        setCurrentListMode(MovieLayoutMode.Grid)
    });
}

export function addEventListenerMovieListButton() {
    const elem: HTMLElement | null = document.getElementById("btn-list-mode");

    if(elem == null) throw new Error('The "btn-list-mode" id does not exist.');

    elem.addEventListener("click", (event: Event) => {
        console.log("Button list mode clicked");
        setCurrentListMode(MovieLayoutMode.List)
    });
}