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
const TRENDING_WEEK_URL = '/trending/movie/week';

let page = 1;

// Scenariusz 1: FIRST LOAD krok 1
// Pobranie danych do galerii, która wyświetla się po WEJŚCIU na stronę
const fetchFirstLoadMovies = async () => {
  const response = await fetch(`${BASE_URL}${MAIN_PAGE_URL}${API_KEY}&page=${page}`);
  const firstLoadMovies = await response.json();
  return firstLoadMovies;
};

// Scenariusz 2: SEARCH MOVIE krok 1
// Pobranie danych do galerii, która wyświetla się po WPISANIU FILMU
const fetchInputMovieTitle = async movieTitle => {
  const response = await fetch(
    `${BASE_URL}${SEARCH_MOVIE_URL}${API_KEY}&query=${movieTitle}&page=${page}&include_adult=false`,
  );
  const responseObject = await response.json();
  return responseObject;
};

// Pobranie pojedyńczego filmu/serialu przez Id. Opcje dla type to domyślnie 'movie' (parametr opcjonalny) lub serial 'tv'.
const fetchMovieById = async (movieId, type = 'movie') => {
  const response = await fetch(`${BASE_URL}/${type}/${movieId}${API_KEY}`);
  const responseObject = await response.json();
  return responseObject;
};

// Tworzenie galerii filmów po WEJŚCIU na stronę (lub przeładowaniu)
let renderMoviesFirstLoad = data => {
  galleryOfMovies.innerHTML = '';
  const markup = data
    .map(
      ({
        poster_path,
        original_title,
        title,
        genre_ids,
        media_type,
        release_date,
        vote_average,
        name,
        original_name,
        id,
      }) => {
        return `
                <li class="movie-card" data-id="${id}" data-type="${media_type}">
                    <img class="movie-card__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${
          title === undefined ? name : title
        }" loading="lazy" />
                    <h2 class="movie-card__title">${title === undefined ? name : title}</h2>
                    <div class="movie-card__info">
                        <p class="movie-card__genre-and-year">
                            <span class="movie-card__genre">${genre_ids}</span>
                            <span class="movie-card__year">${release_date}</span>
                        </p>
                        <p class="movie-card__vote-average">${vote_average}</p>
                    </div>
                </li>
            `;
      },
    )
    .join('');
  return galleryOfMovies.insertAdjacentHTML('beforeend', markup);
};

// Scenariusz 2: SEARCH MOVIE krok 2
// Tworzenie galerii po WPISANIU FILMU w input
let renderMoviesInputTitle = data => {
  galleryOfMovies.innerHTML = '';
  const markup = data
    .map(
      ({
        poster_path,
        original_title,
        title,
        genre_ids,
        media_type,
        release_date,
        vote_average,
        original_name,
        name,
        id,
      }) => {
        return `
                <li class="movie-card" data-id="${id}" data-type="${media_type}">
                    <img class="movie-card__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${
          title === undefined ? name : title
        }" loading="lazy" />
                    <h2 class="movie-card__title">${title === undefined ? name : title}</h2>
                    <div class="movie-card__info">
                        <p class="movie-card__genre-and-year">
                            <span class="movie-card__genre">${genre_ids}</span>
                            <span class="movie-card__year">${release_date}</span>
                        </p>
                        <p class="movie-card__vote-average">${vote_average}</p>
                    </div>
                </li>
            `;
      },
    )
    .join('');
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

export {
  inputFormButton,
  inputFormTitle,
  inputFormGenreChange,
  galleryOfMovies,
  paginationButtons,
  fetchFirstLoadMovies,
  fetchInputMovieTitle,
  fetchMovieById,
  renderMoviesFirstLoad,
  renderMoviesInputTitle,
  pagination,
};
