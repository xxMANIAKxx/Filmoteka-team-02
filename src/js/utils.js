const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const addToLibrary = (movieId, type, listType = 'watchedList') => {
  const libraryList = load(listType);
  if (libraryList == undefined) {
    let tempWatchedList = [];
    tempWatchedList.push({
      movieId,
      type,
    });
    return save(listType, tempWatchedList);
  }

  let alreadyInList = false;
  libraryList.forEach(movie => {
    if (movie.movieId === movieId && movie.type === type) {
      alreadyInList = true;
      alert('Movie already on the list.');
    }
  });

  if (alreadyInList) return;

  libraryList.push({
    movieId,
    type,
  });
  return save(listType, libraryList);
};

export default {
  save,
  load,
  remove,
  addToLibrary,
};
