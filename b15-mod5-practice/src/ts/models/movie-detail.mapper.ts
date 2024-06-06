/*movieDetailMapper*/
import { Actor } from "./actor.interface";
import { MovieDetail } from "./movie-detail.interface";

const defaultValue = '(not available)';

function getPosterPath(str: string): string {
    return `https://media.themoviedb.org/t/p/w220_and_h330_face${str}`;
}

function getBackdropPath(str: string): string{
    return `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${str}`;
}

function getDirectorNameAndPath(crew): string[]{
    let name = '';
    let path = '';
    let i = 0;
    while (i < crew.length && crew[i].job !== "Director"){
        i++;
    }
    if (crew.length > i){ name = crew[i].name; path = `https://media.themoviedb.org/t/p/w220_and_h330_face${crew[i].profile_path}`}
    return [name, path];
}

function getActors(cast): Actor[] {
    let actors: Actor[] = [];
    for(let i = 0; i < 4 && i < cast.length; i++){
        cast[i].path === undefined ? actors.push({name: cast[i].name, path: ``,character: cast[i].character}) : actors.push({name: cast[i].name, path: `https://media.themoviedb.org/t/p/w220_and_h330_face${cast[i].path}`,character: cast[i].character});
    }
    return actors;
}

function getGenres(genres): string[] {
    return genres.map((elem)=>elem.name);
}

/*Revisar*/
export function movieDetailMapper(data: any): MovieDetail {
    console.log("mira");
    if(data === undefined || data === null) throw new Error('Param "data" is not defined');
    const director = getDirectorNameAndPath(data.credits.crew);
    return {
        id: data.id ?? -1, /*id*/
        poster: getPosterPath(data.poster_path), /*poster_path*/
        backdrop: getBackdropPath(data.backdrop_path), /*backdrop_path*/
        title: data.title ?? defaultValue, /*title*/
        rating: data.vote_average ?? -1, /*vote_average*/
        year: data.release_date?.split('-')?.shift() ?? -1, /*release_date getYear()*/
        synopsis: data.overview ?? defaultValue, /*overview*/
        director: director[0] ?? defaultValue, /*crew[0].name where crew[0].job === "Director"*/
        director_path: director[1] ?? defaultValue, /*crew[0].profile_path where crew[0].job === "Director"*/
        actors: getActors(data.credits.cast), /*[[credits.cast[0].name, credits.cast[0].profile_path, credits.cast[0].character], [credits.cast[1].name, credits.cast[1].profile_path, credits.cast[1].character], [credits.cast[2].name, credits.cast[2].profile_path, credits.cast[2].character], [credits.cast[3].name, credits.cast[3].profile_path, credits.cast[3].character]]*/
        genres: getGenres(data.genres), /*genres.map((elem)=>elem.name)*/
        duration: data.runtime ?? -1, /*runtime*/
    }
}