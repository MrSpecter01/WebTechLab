// Function to add a new task
function addTask() {
    const input = document.getElementById('taskInput');
    const taskName = input.value;
    
    if (taskName === "") {
        alert("Please enter a task name");
        return;
    }

    const taskId = 'task-' + Date.now();
    const date = new Date().toLocaleDateString();

    // Create the task card element
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.id = taskId;
    taskCard.draggable = true;
    
    // Set up drag start event
    taskCard.ondragstart = (event) => {
        event.dataTransfer.setData("text", event.target.id);
    };

    taskCard.innerHTML = `
        <strong>${taskName}</strong>
        <p class="date-text">Created: ${date}</p>
    `;

    // Add to the 'To Do' column list
    document.querySelector('#todo .task-list').appendChild(taskCard);
    
    // Clear input
    input.value = "";
}

// Allow dropping by preventing default behavior
function allowDrop(event) {
    event.preventDefault();
}

// Handle the drop event
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const taskCard = document.getElementById(data);
    
    // Find the nearest column target (in case dropped on another card)
    let target = event.target;
    while (target && !target.classList.contains('column')) {
        target = target.parentElement;
    }

    if (target) {
        target.querySelector('.task-list').appendChild(taskCard);
        
        // Handle logic for "Completed" column
        if (target.id === 'completed') {
            taskCard.classList.add('done');
            alert("Task Completed Successfully");
        } else {
            taskCard.classList.remove('done');
        }
    }
}