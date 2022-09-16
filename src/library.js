import './sass/main.scss';
import { fetchMovieById, renderMoviesFirstLoad } from './js/fetchData';
import { load, save } from './js/utils';
import { getMovieAndDisplayModal } from './js/modal';

const watchedButton = document.querySelector('[js-btn-watched]');
const queueButton = document.querySelector('[js-btn-queue]');

let libraryList = load('watchedList');
let moviesList = [];

//Test data
// save('watchedList', [
//   { movieId: 556694, type: 'movie' },
//   { movieId: 77169, type: 'tv' },
//   { movieId: 97970, type: 'tv' },
//   { movieId: 747687, type: 'movie' },
// ]);

// save('queueList', [
//   { movieId: 77169, type: 'tv' },
//   { movieId: 747687, type: 'movie' },
// ]);

watchedButton.addEventListener('click', () => {
  queueButton.classList.remove('library__btn--selected');
  watchedButton.classList.add('library__btn--selected');
  moviesList = [];
  libraryList = load('watchedList');
  getAllLibraryMovies();
});
queueButton.addEventListener('click', () => {
  watchedButton.classList.remove('library__btn--selected');
  queueButton.classList.add('library__btn--selected');
  moviesList = [];
  libraryList = load('queueList');
  getAllLibraryMovies();
});

const getAllLibraryMovies = async () => {
  const tempObj = [];

  for (const movie of libraryList) {
    let response = await fetchMovieById(movie.movieId, movie.type).then(res => res);
    response = {
      ...response,
      genre_ids: [...response.genres.map(genre => genre.id)],
      media_type: movie.type,
    };
    tempObj.push(response);
  }
  moviesList = [...tempObj];
  await renderMoviesFirstLoad(moviesList);
  let liElements = document.querySelectorAll('.movie-card');
  liElements.forEach(element => {
    element.addEventListener('click', () => {
      getMovieAndDisplayModal(element.dataset.id, element.dataset.type);
    });
  });
};

getAllLibraryMovies();
