let students = [
    { id: 1, name: "Alice", dept: "CS", marks: 85 },
    { id: 2, name: "Bob", dept: "IT", marks: 78 }
];

const tableBody = document.getElementById('studentTableBody');

function loadStudents() {
    tableBody.innerHTML = "";
    students.forEach(s => {
        // Create a row element
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.dept}</td>
            <td>${s.marks}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${s.id})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

document.getElementById('saveBtn').addEventListener('click', () => {
    const idField = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const dept = document.getElementById('dept').value;
    const marks = document.getElementById('marks').value;

    if (!name || !dept || !marks) return alert("Fill all fields");

    if (idField) {
        // UPDATE: Find by ID and replace
        const index = students.findIndex(s => s.id == idField);
        students[index] = { id: parseInt(idField), name, dept, marks };
    } else {
        // CREATE: Find the max ID and add 1
        const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        students.push({ id: nextId, name, dept, marks });
    }
    
    resetForm();
    loadStudents();
});

function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    loadStudents();
}

function editStudent(id) {
    const s = students.find(student => student.id === id);
    document.getElementById('studentId').value = s.id;
    document.getElementById('name').value = s.name;
    document.getElementById('dept').value = s.dept;
    document.getElementById('marks').value = s.marks;
    document.getElementById('saveBtn').innerText = "Update Student";
}

function resetForm() {
    document.getElementById('studentId').value = "";
    document.getElementById('name').value = "";
    document.getElementById('dept').value = "";
    document.getElementById('marks').value = "";
    document.getElementById('saveBtn').innerText = "Save Student";
}

loadStudents();