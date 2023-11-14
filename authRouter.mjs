import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import argon2 from 'argon2';
import './db.mjs';
//import argon2 from 'argon2';

// construct User model from User schema
const User = mongoose.model('User');

const authRouter = express.Router();

authRouter.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login', layout: 'layouts/auth.hbs' });
}); 

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}), (req, res) => {
    console.log('login successful');
    res.redirect('/');
});

authRouter.get('/signup', (req, res) => {
    //display register form here
    res.render('auth/signup', { title: 'Signup', layout: 'layouts/auth.hbs' });
});

authRouter.post('/signup', async (req, res) => { 
    //Handle form data here and user creation

    const pattern = new RegExp(`^${req.body.username}`,'i'); 
    const user = await User.findOne({ username: { $regex: pattern } });
    console.log(user);
    try {
        if ( user ) {
            console.log('User already exists. Please choose another username.')
            const message = 'User already exists. Please choose another username.'
            res.render('auth/signup', { layout : 'layouts/auth.hbs', error : message});
        } else {
            const u = new User({
                username: req.body.username,
                password: await argon2.hash(req.body.password),
                //password: req.body.password,
                email: req.body.email
            });
        const user = await u.save();
        console.log('user info received');
        res.render('auth/signup', { title: 'Success', layout :'layouts/auth.hbs', success: 'User created Successfully. Please log-in.' });
        }
    } catch(err){
        console.log(err);
        res.render('auth/signup', {error : 'Error signing up'});
    }
});

export default authRouter;