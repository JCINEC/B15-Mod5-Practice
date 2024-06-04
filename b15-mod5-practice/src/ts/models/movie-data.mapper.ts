import { MovieListData } from "./movie-list-data.interface";

const defaultValue = '(not available)';

function getPosterPath(str: string):string {
    return `https://media.themoviedb.org/t/p/w220_and_h330_face/${str}`;
}


export function movieMapper(data: any): MovieListData {
    if(data === undefined || data === null) throw new Error('Param "data" is not defined');

    const { id, title, overview, vote_average, release_date, poster_path } = data;
    return {
        id: id ?? -1,
        title: title ?? defaultValue,
        description: overview ?? defaultValue,
        rating: vote_average ?? defaultValue,
        year: release_date?.split('-')?.shift() ?? -1,
        poster: getPosterPath(poster_path),
    };
}

/*
adult: false
backdrop_path: "/j3Z3XktmWB1VhsS8iXNcrR86PXi.jpg"
genre_ids: Array(3)
0: 878
1: 28
2: 12
length: 3
[[Prototype]]: Array(0)
id: 823464
original_language: "en"
original_title: "Godzilla x Kong: The New Empire"
overview: "Una aventura cinematográfica completamente nueva, que enfrentará al todopoderoso Kong y al temible Godzilla contra una colosal amenaza desconocida escondida dentro de nuestro mundo. La nueva y épica película profundizará en las historias de estos titanes, sus orígenes y los misterios de Isla Calavera y más allá, mientras descubre la batalla mítica que ayudó a forjar a estos seres extraordinarios y los unió a la humanidad para siempre."
popularity: 6160.662
poster_path: "/2YqZ6IyFk7menirwziJvfoVvSOh.jpg"
release_date: "2024-03-27"
title: "Godzilla y Kong: El nuevo imperio"
video: false
vote_average: 7.256
vote_count: 1944
*/