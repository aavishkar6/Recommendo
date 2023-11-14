const addToFavoritesButtons = document.querySelectorAll('.add-to-favorites');
const addToRecentsButtons = document.querySelectorAll('.add-to-recents');

addToFavoritesButtons.forEach( button => {
    button.addEventListener('click', addToFavorites);
});

addToRecentsButtons.forEach( button => {
    button.addEventListener('click', addToRecents);
});

function addToFavorites(event) {
    const movieContainer = event.target.closest('.movie-card');
    const movieName = movieContainer.querySelector('.movie-title').textContent;
    const releaseDate = movieContainer.querySelector('.movie-release-date').textContent.split(':')[1].trim();
    const overview = movieContainer.querySelector('.movie-description').textContent.trim();
    const rating = movieContainer.querySelector('.movie-popularity').textContent.split(':')[1].trim();
    const genres = movieContainer.querySelector('.movie-genres').textContent;
    const movieId = movieContainer.querySelector('.movie-id').textContent;
    const moviePoster = movieContainer.querySelector('.movie-image').src;
    console.log(movieId)
    console.log(movieName);

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
            alert(`Movie added to favorites! Movie title was ${movieName}`);

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
}

function addToRecents(event) {
    const movieContainer = event.target.closest('.movie-card');
    const movieName = movieContainer.querySelector('.movie-title').textContent;
    const releaseDate = movieContainer.querySelector('.movie-release-date').textContent.split(':')[1].trim();
    const overview = movieContainer.querySelector('.movie-description').textContent.trim();
    const rating = movieContainer.querySelector('.movie-popularity').textContent.split(':')[1].trim();
    const genres = movieContainer.querySelector('.movie-genres').textContent;
    const movieId = movieContainer.querySelector('.movie-id').textContent;
    const moviePoster = movieContainer.querySelector('.movie-image').src;
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
            alert(`Movie added to recently watched! Movie title was ${movieName}`);

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
}