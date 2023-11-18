import './config.mjs'
import './db.mjs';
//import routers
import authRouter from './authRouter.mjs';
import profileRouter from './profileRouter.mjs';
//import util functions
import { getMovies, findMovie, getFavorite, getGenre, getRecents } from './utils.mjs'
//import dependencies
import mongoose from 'mongoose';
import { ObjectID } from 'mongoose/lib/schema/index.js';
import argon2 from 'argon2';
import express from 'express';
import exphbs from 'express-handlebars';
//import exphbs from 'exphbs'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { rmSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { fail } from 'assert';
import bodyParser from 'body-parser';

// const exphbs = require('express-handlebars');
//initialize express
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// construct User model from User schema
const User = mongoose.model('User');
const Movie = mongoose.model('Movie');

app.set('view engine', 'hbs');

// static file serving middlware
app.use(express.static(path.join(__dirname, 'public')));

// body parsing middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: false }));

//initialize session
const sessionOptions = {
    secret:'secret for signing session id',
    saveUninitialized: false,
    resave: false
}

app.use(session(sessionOptions))

//configure passport middleware
passport.use(new LocalStrategy(
    async function(username, password, done) {
        const user = await User.findOne({ username: username })
        if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
        const isPasswordValid = await argon2.verify(user.password, password)
        //const isPasswordValid = user.password === password;
        if (!isPasswordValid) { return done(null, false, { message: 'Incorrect password.' }); }
        return done(null, user);
    }
));        
        
passport.serializeUser(function(user, done) {  
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    const user = await User.findById(id);
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session())

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
}

// redirect all of the authentication routes to authRouter
app.use('/', authRouter);

// redirect all of profile routes to profileRouter
app.use('/', profileRouter);

// also redirect componenets to componenetsRouter. Needs to be worked on
app.get('/', isAuthenticated, async (req, res) => {
    // get favorites of the user
    const favorites = await getFavorite(req.user.username);
    console.log('favorites is ', favorites)
    // parse the genre_ids and release_date
    if ( favorites.length !== 0 ){  
        favorites.forEach( movie => {
            movie.genre_ids = getGenre(movie.genre_ids)
            movie.release_date = movie.release_date.split('-')[0]
        })
    }
    //console.log(getFavorite)
    res.render('components/homePage', { title: 'Home', layout: 'layouts/main.hbs', favorites: favorites });
})

app.delete('/', isAuthenticated, async (req, res) => {
    const body = req.body;
    console.log(body)

    const response = await User.updateOne({
        username: req.user.username,
        $pull: { favorites: body.movieId } 
    })

    console.log(response)
    res.json({message: 'deleted movie from favorites'});
    //res.redirect('/');

})

app.get('/add', isAuthenticated, async (req, res) => {
    // get the movies from the api if the user searches for a query.
    if (req.query.movie) {
        console.log('movie is ', req.query.movie);
        const movies = await getMovies(req.query.movie);
        movies.results.forEach( movie => {
            movie.genre_ids = getGenre(movie.genre_ids)
            movie.release_date = movie.release_date.split('-')[0]
        })
        res.render('components/addMovie', { title: 'Add Movie', layout: 'layouts/main.hbs', movies: movies.results, search: req.query.movie });
    } else {
        // else none received, render the page with no movies
        console.log('no movie received')
        res.render('components/addMovie', { title: 'Add Movie', layout: 'layouts/main.hbs', search: '' });
    }
    
})

app.post('/add', isAuthenticated, async (req, res) => {
    if ( req.body ){
        // add the movie to the database if it is not already there.
        if ( ! await findMovie(req.body.title) ){
            const movie = new Movie({
                movieId: req.body.movieId,
                title: req.body.title,
                release_date: req.body.release_date,
                overview: req.body.overview,
                vote_average: req.body.vote_average,
                genres: await req.body.genre_ids.split(',') ,
                posterPath: req.body.poster_path
            })
            const result = await movie.save()
            console.log( result )
        }
        const movie = await Movie.find(
            {movieId: req.body.movieId}
        )
        const objectId = movie[0]['_id']
        const update = await User.updateOne(
            {username: req.user.username}, 
            {$push: { favorites: objectId }}
        );
        
        console.log(update);

        res.json({message: 'received'});
    } else {
        console.log('no movie received');
    }
})

app.get('/recents', isAuthenticated, async (req, res) =>{
    const movies = await getRecents(req.user.username);

    console.log(movies);
    if (!movies){
        console.log('no movies found');
    }

    res.render('components/recents', { title: 'Recently Watched', layout: 'layouts/main.hbs', movies: movies });
});

app.post('/recents', isAuthenticated, async (req, res) => {
    console.log( 'body is', req.body )

    if ( req.body){
        // add the movie to the database if it is not already there.
        if ( ! await findMovie(req.body.title) ){
            const movie = new Movie({
                movieId: req.body.movieId,
                title: req.body.title,
                release_date: req.body.release_date,
                overview: req.body.overview,
                vote_average: req.body.vote_average,
                genres: await req.body.genre_ids.split(',') ,
                posterPath: req.body.poster_path
            })
            const result = await movie.save()
            console.log( result )
        }
        // 
        const movie = await Movie.find(
            {movieId: req.body.movieId}
        )
        const objectId = movie[0]['_id']
        const update = await User.updateOne(
            {username: req.user.username}, 
            {$push: { recentlyWatched: objectId }}
        );
        
        console.log(update);

        res.json({message: 'received'});
    }

});

app.delete('/recents', isAuthenticated, async (req, res) => {
    const body = req.body;
    console.log(body)

    const response = await User.updateOne({
        username: req.user.username,
        $pull: { recentlyWatched: body.movieId } 
    })

    console.log(response)
    res.json({message: 'deleted movie from favorites'});

});

app.get('/recommend', isAuthenticated, (req, res) => {
    res.render('components/recommend', { title: 'Recommend', layout: 'layouts/main.hbs' });
})

app.get('/new', isAuthenticated, (req, res) => {
    res.render('components/new', { title: 'New', layout: 'layouts/main.hbs' });
})

app.listen(process.env.PORT || 3000);
