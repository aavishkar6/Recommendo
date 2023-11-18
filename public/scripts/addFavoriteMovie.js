const addToFavoritesButtons = document.querySelectorAll('button.btn.btn-primary.favorites');
const addToRecentsButtons = document.querySelectorAll('button.btn.btn-primary.recents');

addToFavoritesButtons.forEach( button => {
    button.addEventListener('click', addToFavorites);
});

addToRecentsButtons.forEach( button => {
    button.addEventListener('click', addToRecents);
});

function addToFavorites(event) {
    const movieContainer = event.target.closest('.container.py-2');
    const movieName = movieContainer.querySelector('.postcard__title.blue').textContent;
    const releaseDate = movieContainer.querySelector('.postcard__subtitle.small').textContent.trim();
    const overview = movieContainer.querySelector('.postcard__preview-txt').textContent.trim();
    const rating = movieContainer.querySelector('.popularity').textContent;;
    const genres = movieContainer.querySelector('.tag__item').textContent;
    const movieId = movieContainer.querySelector('.movie-id').textContent;
    const moviePoster = movieContainer.querySelector('.postcard__img').src;

    async function postJSON(data) {
        try {
            const response = await fetch("/add", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
            alert(`${movieName} added to favorites!`);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    const data = { 
        movieId : movieId,
        title: movieName,
        release_date: releaseDate,
        overview: overview,
        vote_average: rating,
        genre_ids: genres,
        poster_path: moviePoster
        };

    postJSON(data);
    event.preventDefault();
}

function addToRecents(event) {

    const movieContainer = event.target.closest('.container.py-2');
    const movieName = movieContainer.querySelector('.postcard__title.blue').textContent;
    const releaseDate = movieContainer.querySelector('.postcard__subtitle.small').textContent.trim();
    const overview = movieContainer.querySelector('.postcard__preview-txt').textContent.trim();
    const rating = movieContainer.querySelector('.popularity').textContent;;
    const genres = movieContainer.querySelector('.tag__item').textContent;
    const movieId = movieContainer.querySelector('.movie-id').textContent;
    const moviePoster = movieContainer.querySelector('.postcard__img').src;

    console.log(movieId)
    console.log(movieName);

    async function postJSON(data) {
        try {
            const response = await fetch("/recents", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
            alert(`${movieName} added to recently watched!`);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    const data = { 
        movieId : movieId,
        title: movieName,
        release_date: releaseDate,
        overview: overview,
        vote_average: rating,
        genre_ids: genres,
        poster_path: moviePoster
        };
    postJSON(data);

    event.preventDefault();
}