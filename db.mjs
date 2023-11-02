import moongoose from 'mongoose';
import {config} from 'dotenv';

config();

console.log(process.env.DSN);

moongoose.connect(process.env.DSN);

//My schema goes here .

//User Schema.
const User = new moongoose.Schema({
    username :  { type: String, required: true },
    password :  { type: String, required: true },
    email : { type: String, required: true },
    genres : Array,
    recentlyWatched : [{ type: moongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    favorites : [{ type: moongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    people : [{ type: moongoose.Schema.Types.ObjectId, ref: 'People' }]
});

//Movie Schema.
const Movie = new moongoose.Schema({
    movieId: { type: String, required: true },
    title : { type: String, required: true },
    year :  { type: String, required: true },
    genres : { type: Array, required: true },
    rating : Number,
    actors : [{ type: moongoose.Schema.Types.ObjectId, ref: 'People' }],
    director : [{ type: moongoose.Schema.Types.ObjectId, ref: 'People' }],
    description : String,
    image : String,
    region : String,
    time : Number,
});

//People Schema.
const People = new moongoose.Schema({
    peopleId: { type: String, required: true },
    name : { type: String, required: true },
    movies : [{ type: moongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    image : String,
})

//My models goes here.
const UserModel = moongoose.model('User', User);
const MovieModel = moongoose.model('Movie', Movie);
const PeopleModel = moongoose.model('People', People);


