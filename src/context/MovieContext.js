import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);

  const saveMovie = movie => {
    setSavedMovies([...savedMovies, movie]);
  };

  const removeMovie = movieId => {
    setSavedMovies(savedMovies.filter(movie => movie.id !== movieId));
  };

  return (
    <MovieContext.Provider value={{ savedMovies, saveMovie, removeMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
