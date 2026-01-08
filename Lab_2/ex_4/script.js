const form = document.getElementById('registrationForm');
const userList = document.getElementById('userList');
const clearAllBtn = document.getElementById('clearAll');

// Load users on page startup
document.addEventListener('DOMContentLoaded', displayUsers);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const mobile = document.getElementById('userMobile').value.trim();
    const pass = document.getElementById('userPass').value.trim();

    // 1. Mandatory Fields Validation
    if (!name || !email || !mobile || !pass) {
        alert("All fields are mandatory!");
        return;
    }

    // 2. Mobile Validation (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
        alert("Mobile number must be exactly 10 digits!");
        return;
    }

    // 3. Password Validation (min 6 chars)
    if (pass.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 4. Duplicate Email Validation
    if (users.some(user => user.email === email)) {
        alert("This email is already registered!");
        return;
    }

    // Store user as object
    const newUser = { name, email, mobile, pass };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    form.reset();
    displayUsers();
});

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td><button class="delete-btn" onclick="deleteUser(${index})">Delete</button></td>
            </tr>
        `;
        userList.innerHTML += row;
    });
}

// Delete individual user
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

// Clear all users
clearAllBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete ALL users?")) {
        localStorage.removeItem('users');
        displayUsers();
    }
});