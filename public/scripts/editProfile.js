let userName = null;
async function getGenres() {
    $(document).ready(function() {
        $('.select2').select2({
            placeholder: "Select preferences",
            allowClear: true
        });                    

    });

    const userPreferences = await fetch("/userprofile", {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(response => response.json())
    .then(data => {
        userName = data.username;
        return data.genres
    })

    $('#preferences').val(userPreferences).trigger('change');
}
getGenres();
let validation = true;
let timeoutId = null;
document.getElementById('userName').addEventListener('input', function(e) {
    clearTimeout(timeoutId);
    const username = e.target.value;
    const defaultUsername = userName;

    timeoutId = setTimeout(() => {
      fetch('/check-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })
      .then(response => response.json())
      .then(data => {
        const userError = document.getElementById('userError');
        const userSuccess = document.getElementById('userSuccess');
        if ( data.message === 'Username exists' && username !== defaultUsername  ){
            userError.innerHTML = 'Username already exists';
            userError.style.color = 'red';
            userSuccess.innerHTML = '';
            validation = false;
        } else {
            userSuccess.innerHTML = 'This username is available';
            userSuccess.style.color = 'green';
            userError.innerHTML = '';
            validation = true;
        }
      })
      .catch(error => console.error('Error:', error));
    }, 500); // Adjust debounce time as needed
  });

//select the saveChanges button
const button = document.querySelector('button.btn.btn-primary.save');
button.addEventListener('click', saveChanges);
function saveChanges(event){
    console.log('hami yaha pugyau')
    if ( validation ){
        console.log('validation passed');
        const username = document.getElementById('userName').value;
        const email = document.getElementById('email').value;
        const genres = document.getElementById('preferences');
        const selectedGenres = Array.from(genres.selectedOptions).map(option => option.value);
        console.log('selected genres are ', selectedGenres);

        const data = {
            username: username,
            email: email,
            genres: selectedGenres
        }
        async function updateProfile(data){
            try {
                const response = await fetch("/editProfile", {
                    method: "POST", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                console.log("Success:", result);
                alert('Profile updated successfully!');
            } catch (error) {
                console.error("Error:", error);
                alert( 'Error : ', error)
            }
        }
        updateProfile(data);
        
    } else {
        alert('Form validation failed.');
    }
    event.preventDefault();
    
}



