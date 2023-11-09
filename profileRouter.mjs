import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import './db.mjs';
import argon2 from 'argon2';

// construct User model from User schema
const User = mongoose.model('User');

const profileRouter = express.Router();

profileRouter.get('/profile', (req, res) => {
    res.render('profile/profile', { title: 'Profile' });
})

export default profileRouter;