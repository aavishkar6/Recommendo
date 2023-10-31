
# Recommendo - explore movies from all over the world. 

## Overview
There are a lot of movies out there to watch. When your mate suggests you a movie saying it is the best they have ever seen, you know it might go either way. Instead of scrolling through endless recommendation of movies and hoping that you find something interesting, you should directly be able to watch the movie depending on your preferences. <u>**This is where Recommendo comes in.**</u>

Recommendo allows you to keep track of your watchlist, recommend new and popular movies from all across the world. Heck, if you want to try something different, it will help you choose that too.

## Data Model

The application will store User Information, Movies and Actors.

* users can prefer multiple movies.
* each movie can be prefered by more than one users.
*

An Example User:

```javascript
{
  username: "Andy Dufresne",
  hash: // a password hash,
  preferences: // list of favorite movies.
  genres: // list of favorite genres.
  recentlyWatched: // list of recently watched movies.
}
```
An Example movies document
```javascript
{
  movieId: //Id for the movie.
  movieName: "Shawshank Redemption",
  ratings: //ratings for the movie.
  actorId: //list of actors that feature in the movie.
  region: //region for this version of the title.
  time: //primary runTime of the movie.
  imageId: //poster for the image.
}
```
An Example Actors document
```javascript
{
    actorId: //Unique identifier for the actor.
    name: "Morgan Freeman" ,//name of the actor.
    movies: //list of movies that the actor has featured in.
}
```


## [Link to Commented First Draft Schema](db.mjs) 

(__TODO__: create a first draft of your Schemas in db.mjs and link to it)

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(__TODO__: draw out a site map that shows how pages are related to each other)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://en.wikipedia.org/wiki/Use_case))

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

