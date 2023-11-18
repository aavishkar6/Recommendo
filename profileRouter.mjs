import express from 'express';
import passport from 'passport';
import mongoose, { get } from 'mongoose';
import fs from 'fs';
import './db.mjs';
import { getGenre, getFavorite, getRecents } from './utils.mjs';
//import argon2 from 'argon2';

// construct User model from User schema
const User = mongoose.model('User');

const profileRouter = express.Router();

profileRouter.get('/profile', async (req, res) => {
    if ( req.isAuthenticated() ) {
        const user = await User.findOne(
            { username: req.user.username }
        )
        const favorites = await getFavorite(req.user.username);
        const recents = await getRecents(req.user.username);
        //console.log('user is ', user)
        res.render('profile/profile', { title: 'Profile', layout: 'layouts/main.hbs', user: user, favorites:favorites, recents:recents });
    } else {
        res.redirect('/login');
    }
})

profileRouter.get('/editProfile', async (req, res) => {
    if ( req.isAuthenticated() ){
        const user = await User.findOne(
            { username: req.user.username }
        )
        try {
            const genres = Object.values(JSON.parse(fs.readFileSync('./genreId.json', 'utf8')));;
            res.render('profile/editProfile', { title: 'Edit Profile', layout: 'layouts/main.hbs', user: user, genres: genres });
        } catch (err) {
            console.log(err)
        }
    } else {
        res.redirect('/login');
    }
})

profileRouter.post('/editProfile', async (req, res) => {
    const body = req.body;
    
    const update = await User.updateOne(
        { username: req.user.username },
        { $set: { username: body.username, email: body.email, genres: body.genres } }
    )
    console.log(update)
    
    res.json({message: 'received'});

})

profileRouter.get('/userprofile', async (req, res) => {
    if (req.isAuthenticated()){
        console.log(req.user.username)

        const user = await User.findOne(
            { username: req.user.username }
        )
        res.json(user)
    } else {
        res.redirect('/login');
    }
})

profileRouter.post('/check-username', async (req, res) => {
    if ( req.isAuthenticated() ){
        const username = req.body.username;
        const user = await User.findOne(
            { username: username }
        )
        if ( user ) {
            res.json({ message: 'Username exists' });
        } else {
            res.json({ message: 'Username does not exist' });
        }
    } else {
        res.redirect('/login');
    }
})

export default profileRouter;