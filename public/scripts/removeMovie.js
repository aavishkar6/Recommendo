
const removeFromFavorite = document.querySelectorAll('.remove-from-favorites');
const removeFromRecents = document.querySelectorAll('.remove');

removeFromFavorite.forEach( button => {
    button.addEventListener('click', removeFromFavorites);
});

removeFromRecents.forEach( button => {  
    button.addEventListener('click', removeRecents);
});

function removeRecents(event) {
    const movieContainer = event.target.closest('.movie-card');
    const movieId = movieContainer.querySelector('.movie-id').textContent;
    const movieName = movieContainer.querySelector('.movie-title').textContent;
    const data = { movieId: movieId };
    async function postJSON(data) {
        try {
            const response = await fetch("/recents", {
            method: "DELETE", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
            alert(`Movie removed from recents! Movie title was ${movieName}`);

        } catch (error) {
            console.error("Error:", error);
        }
    }
    postJSON(data);

}

function removeFromFavorites(event) {
    const movieContainer = event.target.closest('.movie-card');
    const movieId = movieContainer.querySelector('.movie-id').textContent;
    const movieName = movieContainer.querySelector('.movie-title').textContent;
    
    const data = { movieId: movieId };
    async function postJSON(data) {
        try {
            const response = await fetch("/", {
            method: "DELETE", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
            alert(`Movie removed from favorites! Movie title was ${movieName}`);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    postJSON(data);

}