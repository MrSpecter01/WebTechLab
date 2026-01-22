// 1. Predefined Questions (The Data)
const surveyData = [
    { id: "q1", type: "text", label: "What is your name?", required: true, limit: 20 },
    { id: "q2", type: "radio", label: "How satisfied are you?", options: ["Happy", "Neutral", "Sad"], required: true },
    { id: "q3", type: "checkbox", label: "Which features do you use?", options: ["Mobile App", "Website", "Support"], minSelect: 1 }
];

const container = document.getElementById('surveyContainer');
const form = document.getElementById('dynamicForm');

// 2. Generate the Form Dynamically
surveyData.forEach(q => {
    const div = document.createElement('div');
    div.className = 'question-block';

    const label = document.createElement('label');
    label.className = 'question-text';
    label.innerText = q.label;
    div.appendChild(label);

    // Create inputs based on type
    if (q.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = q.id;
        input.placeholder = `Max ${q.limit} characters`;
        div.appendChild(input);
    } 
    else if (q.type === 'radio' || q.type === 'checkbox') {
        const group = document.createElement('div');
        group.className = 'options-group';
        q.options.forEach(opt => {
            const optLabel = document.createElement('label');
            optLabel.innerHTML = `<input type="${q.type}" name="${q.id}" value="${opt}"> ${opt}`;
            group.appendChild(optLabel);
        });
        div.appendChild(group);
    }

    // Placeholder for error messages
    const errorSpan = document.createElement('span');
    errorSpan.id = `error-${q.id}`;
    errorSpan.className = 'error-msg';
    div.appendChild(errorSpan);

    container.appendChild(div);
});

// 3. Validation Logic
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isAllValid = true;

    surveyData.forEach(q => {
        const errorEl = document.getElementById(`error-${q.id}`);
        errorEl.innerText = ""; // Reset
        let valid = true;

        if (q.type === 'text') {
            const val = document.getElementById(q.id).value.trim();
            if (q.required && val === "") {
                errorEl.innerText = "This field is required.";
                valid = false;
            } else if (val.length > q.limit) {
                errorEl.innerText = `Too long! Max ${q.limit} chars.`;
                valid = false;
            }
        } 
        else if (q.type === 'radio') {
            const checked = document.querySelector(`input[name="${q.id}"]:checked`);
            if (q.required && !checked) {
                errorEl.innerText = "Please select one option.";
                valid = false;
            }
        }
        else if (q.type === 'checkbox') {
            const checkedCount = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
            if (checkedCount < q.minSelect) {
                errorEl.innerText = `Select at least ${q.minSelect} option(s).`;
                valid = false;
            }
        }

        if (!valid) isAllValid = false;
    });

    if (isAllValid) {
        alert("Survey Submitted Successfully!");
        form.reset();
    }
});