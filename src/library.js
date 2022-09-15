console.log('Here');
import utils from './js/utils';
import './sass/main.scss';
import { fetchMovieById, renderMovies } from './js/fetchData';

let libraryList = [];
let moviesList = [];
libraryList = utils.load('watchedList');
console.log(libraryList);

// libraryList.forEach(movie => {
//   moviesList.push(fetchMovieById(movie.id, movie.type));
// });
