import axios from 'axios';
import mongoose from 'mongoose';
import './db.mjs';
// import genre from './genreId.json' assert { type: "json" };
import fs from 'fs';

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
            { username: username }
        )
        //console.log('user is ', user)
        const movies = []
        await user.favorites.forEach( async (objectId) => {
            const movie = await Movie.findOne({ _id: objectId });
            movies.push(movie)
        })

        return movies
    } catch (error) {
        console.log(error)
        return (error)
    }  
}

export async function getRecents(username){
    try {
        const user = await User.findOne(
            { username: username }
        )
        //console.log('user is ', user)
        const recents = []
        await user.recentlyWatched.forEach( async (objectId) => {
            const movie = await Movie.findOne({ _id: objectId });
            recents.push(movie)
        })
        return recents
    } catch ( error ){
        console.log(error)
        return error
    }

}

export function getGenre(genre_ids){
    //import json file named genre.json
    const response = fs.readFile( './genreId.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            const genre = JSON.parse(data);
            let res = ''
            genre_ids.forEach(id => {
                res += genre[id] + ','
            })
            return res
        }
    });
    return response
}
