
const removeFromFavorite = document.querySelectorAll('button.btn.btn-primary.removefav');
const removeFromRecents = document.querySelectorAll('button.btn.btn-primary.removeRecents');

removeFromFavorite.forEach( button => {
    button.addEventListener('click', removeFromFavorites);
});

removeFromRecents.forEach( button => {  
    button.addEventListener('click', removeRecents);
});

function removeRecents(event) {
    const movieContainer = event.target.closest('.container.py-2');
    const movieId = movieContainer.querySelector('.movie-id').textContent;
    const movieName = movieContainer.querySelector('.postcard__title.blue').textContent;
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
    const movieContainer = event.target.closest('.container.py-2');
    const movieId = movieContainer.querySelector('.movie-id').textContent;
    const movieName = movieContainer.querySelector('.postcard__title.blue').textContent;

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
            alert(`${movieName} removed from favorites!`);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    postJSON(data);

}