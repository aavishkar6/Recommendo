import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
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
        console.log('favorites are ', favorites)
        console.log('recents are ', recents)
        res.render('profile/profile', { title: 'Profile', layout: 'layouts/main.hbs', user: user, favorites:favorites, recents:recents });
    } else {
        res.redirect('/login');
    }

})

export default profileRouter;