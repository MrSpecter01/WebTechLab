let currentStage = 1;
const totalStages = 4;

// Temporary data storage
let formData = {
    username: "",
    email: "",
    job: ""
};

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressBar = document.getElementById('progressBar');

// 1. Navigation Controller
nextBtn.addEventListener('click', () => {
    if (validateStage(currentStage)) {
        if (currentStage < totalStages) {
            goToStage(currentStage + 1);
        } else {
            alert("Form Submitted Successfully!");
            console.log("Final Data:", formData);
        }
    }
});

prevBtn.addEventListener('click', () => {
    goToStage(currentStage - 1);
});

// 2. State Transition Function
function goToStage(stageNum) {
    // Hide current stage, show new stage
    document.getElementById(`stage${currentStage}`).classList.add('hidden');
    document.getElementById(`stage${stageNum}`).classList.remove('hidden');
    
    currentStage = stageNum;
    updateUI();
}

// 3. UI Update (Progress Bar & Buttons)
function updateUI() {
    // Update Progress Bar
    const progressPercent = (currentStage / totalStages) * 100;
    progressBar.style.width = progressPercent + "%";

    // Show/Hide Prev Button
    prevBtn.classList.toggle('hidden', currentStage === 1);

    // Change Next to Submit on last stage
    nextBtn.innerText = currentStage === totalStages ? "Submit" : "Next";

    // Update Summary if on final stage
    if (currentStage === 4) {
        document.getElementById('summary').innerHTML = `
            <p><strong>Username:</strong> ${formData.username}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Job:</strong> ${formData.job}</p>
        `;
    }
}

// 4. Strict Validation Engine
function validateStage(stage) {
    let isValid = true;
    const err1 = document.getElementById('err1');
    const err2 = document.getElementById('err2');
    const err3 = document.getElementById('err3');

    if (stage === 1) {
        const val = document.getElementById('user').value;
        if (val.length < 5) {
            err1.innerText = "Username must be 5+ characters";
            isValid = false;
        } else {
            err1.innerText = "";
            formData.username = val; // Store data
        }
    } 
    else if (stage === 2) {
        const val = document.getElementById('mail').value;
        if (!val.includes('@')) {
            err2.innerText = "Please enter a valid email";
            isValid = false;
        } else {
            err2.innerText = "";
            formData.email = val; // Store data
        }
    }
    else if (stage === 3) {
        const val = document.getElementById('job').value;
        if (val === "") {
            err3.innerText = "Please select a job";
            isValid = false;
        } else {
            err3.innerText = "";
            formData.job = val; // Store data
        }
    }

    return isValid;
}