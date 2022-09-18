


// TUTAJ WRZUCAM MOGĄCE SIĘ NAM PRZYDAĆ FUNCJE I METODY


import axios from 'axios';

const API_KEY = 'c01f14dcdb58e9cec669b1017a4d540c';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class FilmsApiService {
    constructor() {
        this.searchQueryFilms = '';
        this.page = 1;
        this.pages = 0;
        this.totalItems = 0;
        this.with_genres = 0;
    }


    // Metoda na otrzymywanie popularnych filmów dnia.

    async onFetchTopDayFilms() {
        const searchParams = new URLSearchParams({
            page: this.page,
        });

        const response = await axios.get(
            `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&${searchParams}`,
        );
        const data = await response.data;
        this.totalPage = data.total_pages;
        this.totalItems = data.total_results;
        return data.results;
    }


    // Metoda na otrzymywanie popularnych filmów tygodnia.

    async onFetchTopWeekFilms() {
        const searchParams = new URLSearchParams({
            page: this.page,
        });

        const response = await axios.get(
            `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&${searchParams}`,
        );
        const data = await response.data;
        this.totalPage = data.total_pages;
        this.totalItems = data.total_results;
        return data.results;
    }

    // Metoda pobierania filmu/filmów za pomocą ciągu zapytania (za pomocą metody Setter).

    async onFetchKeyWordFilms() {
        const searchParams = new URLSearchParams({
            query: this.searchQueryFilms,
            include_adult: false,
            page: this.page,
        });

        const response = await axios.get(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&${searchParams}`,
        );
        const data = await response.data;
        this.totalPage = data.total_pages;
        this.totalItems = data.total_results;
        return data.results;
    }


    // Metoda uzyskiwania id gatunków filmowych.

    async onFetchId() {
        const response = await axios.get(
            `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
        );
        const data = await response.data;
        const genres = await data.genres;
        return genres;
    }

    // Metoda resetowania strony do wartości początkowej (page=1).
    resetPageNumber() {
        this.page = 1;
    }

    resetTotalItems() {
        this.totalItems = 0;
    }


    // metoda uzyskiwania id gatunków filmowych
    async onFetchId() {
        const response = await axios.get(
            `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
        );
        const data = await response.data;
        const genres = await data.genres;
        return genres;
    }
    

    // Metoda pobierania filmu/filmów według gatunku żądania (za pomocą metody Setter).
    async onFetchGenresFilms() {
        const searchParams = new URLSearchParams({
            with_genres: this.with_genres,
            include_adult: false,
            page: this.page,
        });

        const response = await axios.get(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&${searchParams}`,
        );

        const data = await response.data;
        this.totalPage = data.total_pages;
        this.totalItems = data.total_results;
        return data.results;
    }
    



    // Metoda pobierająca do pobrania aktualnej wartości gatunku.
    
    get genre() {
        return this.with_genres;
    }
    

    //Metoda ustawiania do wyszukiwania filmów według gatunku.

    set genre(genreId) {
        this.with_genres = genreId;
    }


}








