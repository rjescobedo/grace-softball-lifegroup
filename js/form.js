// Function to handle the form submission event
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the default form submission behavior

    const form = event.target;
    
    // Show a loading message or hide the form (optional)
    form.querySelector('button[type="submit"]').disabled = true;
    
    // Create a FormData object to handle the form data
    const formData = new FormData(form);

    // Send the form data using fetch to Netlify
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // If the response is successful, show the success message
            document.getElementById('success-message').style.display = 'block';
            form.reset();  // Optionally reset the form
        } else {
            // If there was an error, show the error message
            document.getElementById('error-message').style.display = 'block';
        }
    })
    .catch(() => {
        // If there was an error with the fetch request
        document.getElementById('error-message').style.display = 'block';
    })
    .finally(() => {
        // Re-enable the submit button after handling the response
        form.querySelector('button[type="submit"]').disabled = false;
    });

    // Hide messages after 5 seconds
setTimeout(() => {
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
}, 5000);
});
