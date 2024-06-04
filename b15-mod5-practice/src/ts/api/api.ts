import { ApiConfig } from '../models/api-config.interface';
import { movieMapper } from '../models/movie-data.mapper';
import { MovieListData } from '../models/movie-list-data.interface';
import { MovieListType } from '../models/movie-type.enum';
 
   
  function config(): ApiConfig {
    return {
      baseUrl: "https://api.themoviedb.org/3/",
      langIso: "es-ES",
      apiKey: "15d2ea6d0dc1d476efbca3eba2b9bbfb",
    };
  }
   
  function getMovieListUrl(config: ApiConfig, type: MovieListType, page = 1): string {
    let url = config.baseUrl;
    url += `movie/${type}`;
    url += `?language=${config.langIso}`;
    url += `&page=${page}`;
    url += `&api_key=${config.apiKey}`;
    return url;
  }
   
  export async function fetchMovieListData(type: MovieListType, page = 1): Promise<MovieListData[]> {
    const apiConfig = config();
    const url = getMovieListUrl(apiConfig, type, page);
    const response = await fetch(url);
    const data = await response.json();
    const movies: any[] = data?.results ?? [];
    return movies.map(movie => movieMapper(movie));
      
  }