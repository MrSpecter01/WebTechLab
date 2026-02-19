let students = [];

// 1. READ: Fetch JSON data
async function loadStudents() {
    try {
        const response = await fetch('students.json');
        if (!response.ok) throw new Error("Could not fetch data");
        students = await response.json();
        renderTable();
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to load student records.");
    }
}

// 2. Render Table
function renderTable() {
    const list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach(student => {
        list.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
                <td>
                    <button class="edit-btn" onclick="prepareUpdate(${student.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>`;
    });
}

// 3. CREATE / UPDATE
function saveStudent() {
    const idField = document.getElementById("studentId").value;
    const name = document.getElementById("name").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = document.getElementById("marks").value;

    if (!name || !course || !marks) return alert("Please fill all fields");

    if (idField) {
        // UPDATE logic
        const index = students.findIndex(s => s.id == idField);
        students[index] = { id: parseInt(idField), name, course, marks: parseInt(marks) };
    } else {
        // CREATE logic (Sequential ID)
        const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        students.push({ id: nextId, name, course, marks: parseInt(marks) });
    }

    resetForm();
    renderTable();
}

// 4. PREPARE UPDATE (Fill form)
function prepareUpdate(id) {
    const student = students.find(s => s.id === id);
    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("course").value = student.course;
    document.getElementById("marks").value = student.marks;
    document.getElementById("saveBtn").innerText = "Update Record";
}

// 5. DELETE
function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    renderTable();
}

function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("course").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("saveBtn").innerText = "Add Student";
}

window.onload = loadStudents;