import { Actor } from "./actor.interface";
export interface MovieListDetail {
    id: number;
    title: string;
    description: string;
    year: string;
    rating: number;
    poster: string;
    backdrop: string;
    actors: Actor[];
}