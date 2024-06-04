import { MovieListType } from "../models/movie-type.enum";
import { setCurrentListMode, setCurrentListType } from "../movie/movie";
import { MovieLayoutMode } from "../models/movie-layout-mode.enum";

export function addEventListenerMovieListType(){
    const elem: HTMLElement | null = document.getElementById("movie-type-select");
    
    if(elem === null) throw new Error('The "movie-type-select" id does not exist.');

    elem.addEventListener("change", (event: Event) => {
        const selectElement = event.target as HTMLSelectElement;
        setCurrentListType(selectElement.value as MovieListType);
    });
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