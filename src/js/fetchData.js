const inputFormTitle = document.querySelector('.search-form__input');
const inputFormButton = document.querySelector('.search-form__btn');
const inputFormGenreChange = document.querySelector('.header__genre-option');

const galleryOfMovies = document.querySelector('.gallery_movies');
const paginationButtons = document.querySelector('.pagination_buttons');

// Scenariusz 1: FIRST LOAD
// Scenariusz 2: SEARCH MOVIE
// Scenariusz 3: GENRE SELECT
// Scenariusz 4: TRENDING DAY / TRENDING WEEK

const API_KEY = '?api_key=fd87aef18dfd3a2446d882cb85b7272d';
const BASE_URL = 'https://api.themoviedb.org/3';
const MAIN_PAGE_URL = '/trending/all/day';
const SEARCH_MOVIE_URL = '/search/movie';
const GENRE_SELECT_URL = '/genre/movie/list';
const TRENDING_DAY_URL = '/trending/movie/day';
const TRENDING_WEEK_URL ='/trending/movie/week';

let page = 1;


// Scenariusz 1: FIRST LOAD krok 1
// Pobranie danych do galerii, która wyświetla się po WEJŚCIU na stronę
const fetchFirstLoadMovies = async () => {
    const response = await fetch(
        `${BASE_URL}${MAIN_PAGE_URL}${API_KEY}&page=${page}`
    );
    const firstLoadMovies = await response.json();
    return firstLoadMovies;
};
fetchFirstLoadMovies;


// Scenariusz 2: SEARCH MOVIE krok 1
// Pobranie danych do galerii, która wyświetla się po WPISANIU FILMU
const fetchInputMovieTitle = async movieTitle => {
    const response = await fetch(
        `${BASE_URL}${SEARCH_MOVIE_URL}${API_KEY}&query=${movieTitle}&page=${page}&include_adult=false`
    );
    const responseObject = await response.json();
    return responseObject;
};
fetchInputMovieTitle;


// Scenariusz 1: FIRST LOAD krok 2
// Tworzenie galerii filmów po WEJŚCIU na stronę (lub przeładowaniu)
let renderMoviesFirstLoad = (data) => {
    galleryOfMovies.innerHTML = '';
    const markup = data
        .map(({poster_path, original_title, title, genre_ids, release_date, vote_average, original_name, id}) => {
            return `
                <li class="movie-card">
                    <img class="movie-card__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" loading="lazy" />
                    <h2 class="movie-card__title">${title}</h2>
                    <div class="movie-card__info">
                        <p class="movie-card__genre-and-year">
                            <span class="movie-card__genre">${genre_ids}</span>
                            <span class="movie-card__year">${release_date}</span>
                        </p>
                        <p class="movie-card__vote-average">${vote_average}</p>
                    </div>
                </li>
            `})
        .join("");
    return galleryOfMovies.insertAdjacentHTML('beforeend', markup);
};


// Scenariusz 2: SEARCH MOVIE krok 2
// Tworzenie galerii po WPISANIU FILMU w input
let renderMoviesInputTitle = (data) => {
    galleryOfMovies.innerHTML = '';
    const markup = data
        .map(({poster_path, original_title, title, genre_ids, release_date, vote_average, original_name, id}) => {
            return `
                <li class="movie-card">
                    <img class="movie-card__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" loading="lazy" />
                    <h2 class="movie-card__title">${title}</h2>
                    <div class="movie-card__info">
                        <p class="movie-card__genre-and-year">
                            <span class="movie-card__genre">${genre_ids}</span>
                            <span class="movie-card__year">${release_date}</span>
                        </p>
                        <p class="movie-card__vote-average">${vote_average}</p>
                    </div>
                </li>
            `})
        .join("");
    return galleryOfMovies.insertAdjacentHTML('beforeend', markup);
};


// Scenariusz 1: FIRST LOAD krok 3
// Nasłuchiwanie pierwszego załadowania strony lub przeładowania
window.addEventListener('load', async event => {
    event.preventDefault();

    try {
        const array = await fetchFirstLoadMovies ();
        const arrayMovies = [];

        array.results.forEach(async movie => {
            arrayMovies.push(movie);
        });

        renderMoviesFirstLoad(arrayMovies);
        console.log(arrayMovies);

        const totalPages = await array.total_pages;
        const totalMovies = await array.total_results;

        console.log(`Total pages: ${totalPages}`);
        console.log(`Total results: ${totalMovies}`);

        pagination(totalPages, title);

        // arrayMovies.forEach(async movie => {
        //   console.log(movie);
        // });
        
    } catch (error) {
    console.error(error);
    }
});


// Scenariusz 2: SEARCH MOVIE krok 3
// Nasłuchiwanie zdarzenia wpisania filmu w input
inputFormButton.addEventListener ('click', async event => {
    event.preventDefault();

    const movieTitle = inputFormTitle.value.trim();

    try {
        const array = await fetchInputMovieTitle (movieTitle);
        const arrayMovies = [];

        array.results.forEach(async movie => {
            arrayMovies.push(movie);
        });

        renderMoviesInputTitle(arrayMovies);
        console.log(arrayMovies);

        const totalPages = await array.total_pages;
        const totalMovies = await array.total_results;

        console.log(`Total pages: ${totalPages}`);
        console.log(`Total results: ${totalMovies}`);

        pagination(totalPages, title);

        // arrayMovies.forEach(async movie => {
        //   console.log(movie);
        // });
        
    } catch (error) {
    console.error(error);
    }
});



const pagination = async (totalPages, title) => {
    paginationButtons = '';
    if (totalPages >= 1) {
        for (let i = 1; i <= totalPages; i++) {
            let pageButton = document.createElement('button');
            pageButton.innerHTML = i;
            paginationButtons.appendChild(pageButton);
        }
    }
};






export{fetchFirstLoadMovies}