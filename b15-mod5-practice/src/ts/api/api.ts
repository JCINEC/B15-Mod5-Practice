import { ApiConfig } from '../models/api-config.interface';
import { movieMapper } from '../models/movie-data.mapper';
import { movieDetailMapper } from '../models/movie-detail.mapper';
import { MovieListData } from '../models/movie-list-data.interface';
import { MovieDetail } from '../models/movie-detail.interface';
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

  function getDetailListUrl(config: ApiConfig, id: string): string {
    return config.baseUrl + 'movie/' + id + '?Y&append_to_response=credits&language=' + config.langIso + '&api_key=' + config.apiKey;
  }

  /*Revisar*/
  export async function getDetailsData(id: string):Promise<MovieDetail> {
    const apiConfig = config();
    const url = getDetailListUrl(apiConfig, id);
    const response = await fetch(url);
    const data = await response.json();
    return movieDetailMapper(data);
  }

  function getSearchMovieListUrl(config: ApiConfig, text: string, page = 1): string {
    return config.baseUrl + 'search/movie?query=' + text + '&language=' + config.langIso + '&page=' + page + '&api_key=' + config.apiKey;
  }

  export async function fetchSearchMovieListData(text: string, page = 1): Promise<MovieListData[]> {
    const apiConfig = config();
    const url = getSearchMovieListUrl(apiConfig, text, page);
    const response = await fetch(url);
    const data = await response.json();
    const movies: any[] = data?.results ?? [];
    return movies.map(movie => movieMapper(movie));
  }