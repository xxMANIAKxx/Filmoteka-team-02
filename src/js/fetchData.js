const inputFormTitle = document.querySelector('.search-form__input');
const inputFormButton = document.querySelector('.search-form__btn');
const inputFormGenreChange = document.querySelector('.header__genre-option');

const galleryOfMovies = document.querySelector('.gallery_movies');
const paginationButtons = document.querySelector('.pagination_buttons');

const API_KEY = '?api_key=fd87aef18dfd3a2446d882cb85b7272d';
const BASE_URL = 'https://api.themoviedb.org/3';
const MAIN_PAGE_URL = '/trending/all/day';
// const GENRE_URL = '/genre/movie/list';
let page = 1;


const fetchFirstLoadMovies = async () => {
    const response = await fetch(
        `${BASE_URL}${MAIN_PAGE_URL}${API_KEY}&page=${page}`
    );
    const firstLoadMovies = await response.json();
    console.log(firstLoadMovies);
    return firstLoadMovies;
};


const fetchInputMovieTitle = async movieTitle => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=fd87aef18dfd3a2446d882cb85b7272d&query=${movieTitle}&page=${page}&include_adult=false`
    );
    const responseObject = await response.json();
    return responseObject;
};

fetchInputMovieTitle;

let renderMovies = (data) => {
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


inputFormButton.addEventListener ('click', async event => {
    event.preventDefault();

    const movieTitle = inputFormTitle.value.trim();

    try {
        const array = await fetchInputMovieTitle (movieTitle);
        const arrayMovies = [];

        array.results.forEach(async movie => {
            arrayMovies.push(movie);
        });

        renderMovies(arrayMovies);

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

