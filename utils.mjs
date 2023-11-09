import axios from 'axios';
import mongoose from 'mongoose';
import './db.mjs'

const Movie = mongoose.model('Movie');
const User = mongoose.model('User');

export async function getMovies (movie){
    try {
        const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=398b5afb4273aa1b5552a5b91071c1e6`
        )
        return (response.data)
    } catch (error) {
        console.log(error)
        return (error)
    }
}

export async function findMovie(movieId) {
    try {
      const movie = await Movie.findOne({ title: movieId });
      if (movie) {
        console.log('found movie')
        return true;
      }
  
      return false;
    } catch (error) {
      console.error('Error finding movie:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  }

export async function getFavorite(username){
    try {
        const user = await User.findOne(
            { username: username },
        )
        console.log(user)
        const movies = []
        user.favorites.forEach(async (objectId) => {
            console.log(objectId)
            const movie = await Movie.findOne({ _id: objectId });
            console.log(movie)
            movies.push(movie)
        })
        console.log(movies)
        return movies
    } catch (error) {
        console.log(error)
        return (error)
    }  
}

// export default (
//     getMovies,
//     findMovie
// )