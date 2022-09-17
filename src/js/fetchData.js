const inputFormTitle = document.querySelector('.search-form__input');
const inputFormButton = document.querySelector('.search-form__btn');
const inputFormGenreChange = document.querySelector('.header__genre-option');

const galleryOfMovies = document.querySelector('.gallery_movies');
const genresList = document.querySelector('.genres');
const paginationButtons = document.querySelector('.pagination_buttons');
const noPosterImage = require('../images/misc/no_picture.jpg');

// SPIS TREŚCI:
// Scenariusz 1: FIRST LOAD
// Scenariusz 2: SEARCH MOVIE
// Scenariusz 3: GENRE SELECT
// Scenariusz 4: TRENDING DAY / TRENDING WEEK

// Ustalanie gatunku/gatunków filmu
// Paginacja

const API_KEY = '?api_key=fd87aef18dfd3a2446d882cb85b7272d';
const BASE_URL = 'https://api.themoviedb.org/3';
const MAIN_PAGE_URL = '/trending/all/day';
const SEARCH_MOVIE_URL = '/search/movie';
const GENRE_MOVIE_LIST_URL = '/genre/movie/list';
const GENRE_TV_LIST_URL = '/genre/tv/list';
const TRENDING_DAY_URL = '/trending/movie/day';
const TRENDING_WEEK_URL = '/trending/movie/week';

// Scenariusz 1: FIRST LOAD krok 1
// Pobranie danych do galerii, która wyświetla się po WEJŚCIU na stronę
const fetchFirstLoadMovies = async page => {
  const response = await fetch(
    `${BASE_URL}${MAIN_PAGE_URL}${API_KEY}&page=${page}&include_adult=false`,
  );
  const firstLoadMovies = await response.json();
  return firstLoadMovies;
};

// Scenariusz 2: SEARCH MOVIE krok 1
// Pobranie danych do galerii, która wyświetla się po WPISANIU FILMU
const fetchInputMovieTitle = async (page, movieTitle) => {
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

// Scenariusz 1: FIRST LOAD krok 2
// Tworzenie galerii filmów po WEJŚCIU na stronę (lub przeładowaniu)
let renderMoviesFirstLoad = async data => {
  const genreName = await getMovieGenresNames();
  galleryOfMovies.innerHTML = '';
  const markup = data
    .map(
      ({
        poster_path,
        title,
        name,
        genre_ids,
        release_date,
        first_air_date,
        vote_average,
        id,
        media_type,
        original_title,
        original_name,
      }) => {
        return `
                <li class="movie-card" data-id="${id}" data-type="${media_type}">
                    <img class="movie-card__img" src="${
                      poster_path != null
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : noPosterImage
                    }" alt="poster of '${title ? title : name}'"  loading="lazy"/>
                    <h2 class="movie-card__title">${title ? title : name}</h2>
                    <div class="movie-card__info">
                        <p class="movie-card__genre-and-year">
                            <span class="movie-card__genre">${genre_ids
                              .map(id => genreName[id])
                              .join(', ')}</span>
                            <span class="movie-card__year">${
                              release_date
                                ? release_date
                                : first_air_date
                                ? first_air_date
                                : 'no-data'
                            }</span>
                        </p>
                        <p class="movie-card__vote-average">${vote_average.toFixed(2)}</p>
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
let renderMoviesInputTitle = async data => {
  const genreName = await getMovieGenresNames();
  galleryOfMovies.innerHTML = '';
  const markup = data
    .map(
      ({
        poster_path,
        title,
        name,
        genre_ids,
        release_date,
        first_air_date,
        vote_average,
        id,
        media_type,
        original_title,
        original_name,
      }) => {
        return `
                <li class="movie-card" data-id="${id}" data-type="movie">
                    <img class="movie-card__img" src="${
                      poster_path != null
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : noPosterImage
                    }" alt="${title ? title : name}" loading="lazy" />
                    <h2 class="movie-card__title">${title ? title : name}</h2>
                    <div class="movie-card__info">
                        <p class="movie-card__genre-and-year">
                            <span class="movie-card__genre">${genre_ids
                              .map(id => genreName[id])
                              .join(', ')}</span>
                            <span class="movie-card__year">${
                              release_date
                                ? release_date
                                : first_air_date
                                ? first_air_date
                                : 'no-data'
                            }</span>
                        </p>
                        <p class="movie-card__vote-average">${vote_average.toFixed(2)}</p>
                    </div>
                </li>
            `;
      },
    )
    .join('');
  return galleryOfMovies.insertAdjacentHTML('beforeend', markup);
};

//-----------------------------------------------------------------//
// ZNALEZIENIE LISTY WSZYSTKICH GATUNKÓW FILMÓW
// z obu podzbiorów bazy danych: Movie oraz TV

const getAllGenres = async () => {
  const responseGenresMovie = await fetch(
    `${BASE_URL}${GENRE_MOVIE_LIST_URL}${API_KEY}&language=en-US`,
  );
  const responseGenresTV = await fetch(`${BASE_URL}${GENRE_TV_LIST_URL}${API_KEY}&language=en-US`);

  const genresMovieList = await responseGenresMovie.json();
  const genresTVList = await responseGenresTV.json();

  const allGenresList = [
    ...new Map(
      [...genresMovieList.genres, ...genresTVList.genres].map(genre => [genre['id'], genre]),
    ).values(),
  ];
  allGenresListMain = allGenresList;
  return allGenresList;
};
let genreResponse;

let allGenresListMain;
console.log(allGenresListMain);

const getMovieGenresNames = async () => {
  if (!genreResponse) {
    genreResponse = await getAllGenres();
  }
  return genreResponse.reduce((allGenres, genre) => {
    return { ...allGenres, [genre.id]: genre.name };
  }, {});
};

let printAllGenresList = () => {
  genresList.innerHTML = '';
  const markup = allGenresList
    .map(genre => {
      return `
                <div>
                    <ul>
                        <li class="genres">${genre}</li>
                    </ul>
                </div>
            `;
    })
    .join('');
  return genresList.insertAdjacentHTML('beforeend', markup);
};

/*

//-----------------------------------------------------------------//

let genresList = [];


// Funkcja, która pyta o gatunki i zwraca je na liście rozwijanej

function fetchIDFilms() {
  return newFilmsBandle
    .onFetchId()
    .then(genres => {
      genresList = genres;
      renderGenresList(genres);
      return genresList;
    })
    .then(genresList => localeStorageServices.save('FilmIDs', genresList))
    .catch(console.log);
}




// Funkcja zmieniająca identyfikatory gatunków na ich NAZWY

function parsGenres(genresId, genresList) {
  const nameGenres = [];
  for (let i = 0; i <= genresId.length; i += 1) {
    genresList.map(({ id, name }) => {
      if (id === genresId[i]) {
        nameGenres.push(name);
      }
    });
  }
  return nameGenres;
}


*/

//-----------------------------------------------------------------//
// PAGINACJA
const pagination = async (totalPages, title) => {
  // paginationButtons = '';
  // if (totalPages >= 1) {
  //   for (let i = 1; i <= totalPages; i++) {
  //     let pageButton = document.createElement('button');
  //     pageButton.innerHTML = i;
  //     paginationButtons.appendChild(pageButton);
  //   }
  // }
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
  noPosterImage,
};
