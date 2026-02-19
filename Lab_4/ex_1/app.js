const usernameInput = document.getElementById('username');
const feedback = document.getElementById('feedback');
const submitBtn = document.getElementById('submitBtn');

let isAvailable = false;

usernameInput.addEventListener('input', () => {
    const username = usernameInput.value.trim().toLowerCase();

    if (username.length < 3) {
        feedback.textContent = "Too short...";
        feedback.className = "";
        isAvailable = false;
        return;
    }

    // Show loading state
    feedback.textContent = "Checking...";
    feedback.className = "loading";

    // Simulate server delay and fetch data
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            if (data.takenUsernames.includes(username)) {
                feedback.textContent = "✘ Username already taken";
                feedback.className = "taken";
                isAvailable = false;
            } else {
                feedback.textContent = "✔ Username available";
                feedback.className = "available";
                isAvailable = true;
            }
        })
        .catch(err => console.error("Error fetching users:", err));
});

// Prevent form submission if username is invalid
document.getElementById('registrationForm').addEventListener('submit', (e) => {
    if (!isAvailable) {
        e.preventDefault();
        alert("Please choose a valid username first!");
    }
});