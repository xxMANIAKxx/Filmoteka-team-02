import { fetchMoviesByGenre, renderMoviesFirstLoad } from './fetchData';
import genresData from './genres.json';
import { addModalListenerFunction } from './modal';
import { createPagination } from './pagination';

const genreSelect = document.querySelector('select.genre');
genreSelect.addEventListener('change', () => {
  let selectedGenreId;
  genresData.forEach(genre => {
    if (genre.name === genreSelect.value) {
      selectedGenreId = genre.id;
    }
  });
  getAllMoviesByGenre(selectedGenreId, 1);
});

const getAllMoviesByGenre = async (genre, page) => {
  try {
    const data = await fetchMoviesByGenre(page, genre);
    await renderMoviesFirstLoad(data.results);
    addModalListenerFunction();
    console.log(data);
    createPagination(data, '', genre);
  } catch (error) {
    console.error(error);
  }
};
