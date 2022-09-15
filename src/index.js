import {
  fetchFirstLoadMovies,
  fetchInputMovieTitle,
  inputFormButton,
  inputFormTitle,
  pagination,
  renderMoviesFirstLoad,
  renderMoviesInputTitle,
} from './js/fetchData';
import './sass/main.scss';

fetchFirstLoadMovies;
fetchInputMovieTitle;

// Scenariusz 1: FIRST LOAD krok 3
// Nasłuchiwanie pierwszego załadowania strony lub przeładowania
window.addEventListener('load', async event => {
  event.preventDefault();
  try {
    const array = await fetchFirstLoadMovies();
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
inputFormButton.addEventListener('click', async event => {
  event.preventDefault();

  const movieTitle = inputFormTitle.value.trim();

  try {
    const array = await fetchInputMovieTitle(movieTitle);
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
