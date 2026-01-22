const regForm = document.getElementById('regForm');
const roleSelect = document.getElementById('role');
const skillsGroup = document.getElementById('skillsGroup');

// 1. Show/Hide Skills
roleSelect.addEventListener('change', () => {
    if (roleSelect.value === 'admin') {
        skillsGroup.style.display = 'none';
    } else {
        skillsGroup.style.display = 'block';
    }
});

// 2. Validation Logic
regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Grab inputs
    const name = document.getElementById('username');
    const email = document.getElementById('email');
    const age = document.getElementById('age');
    const pass = document.getElementById('password');
    const confirmPass = document.getElementById('confirmPassword'); // New field
    const role = roleSelect.value;

    // Reset error messages/colors
    document.querySelectorAll('.error').forEach(el => el.innerText = "");
    document.querySelectorAll('input').forEach(el => el.classList.remove('invalid-input'));

    let isValid = true;

    // Name Validation
    if (name.value.length < 3) {
        document.getElementById('nameError').innerText = "Name too short";
        name.classList.add('invalid-input');
        isValid = false;
    }

    // Email Validation
    if (!email.value.includes('@') || !email.value.includes('.')) {
        document.getElementById('emailError').innerText = "Enter a valid email domain";
        email.classList.add('invalid-input');
        isValid = false;
    }

    // Age Validation
    if (age.value < 18 && role === 'admin') {
        document.getElementById('ageError').innerText = "Admins must be 18+";
        age.classList.add('invalid-input');
        isValid = false;
    }

    // Dynamic Password Strength
    let minLength = (role === 'admin') ? 10 : 6;
    if (pass.value.length < minLength) {
        document.getElementById('passError').innerText = `${role} password needs ${minLength} chars`;
        pass.classList.add('invalid-input');
        isValid = false;
    }

    // NEW: Confirm Password Validation
    if (confirmPass.value !== pass.value) {
        document.getElementById('confirmPassError').innerText = "Passwords do not match";
        confirmPass.classList.add('invalid-input');
        isValid = false;
    } else if (confirmPass.value === "") {
        document.getElementById('confirmPassError').innerText = "Please confirm your password";
        confirmPass.classList.add('invalid-input');
        isValid = false;
    }

    // If all pass
    if (isValid) {
        alert("Registration Successful!");
        regForm.reset();
        skillsGroup.style.display = 'block'; 
    }
});