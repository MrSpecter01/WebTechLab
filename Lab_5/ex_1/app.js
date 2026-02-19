let xmlDoc = null;

// 1. Load XML via AJAX
function loadXML() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            renderTable();
        }
    };
    xhr.send();
}

// 2. READ: Parse XML and Show in Table
function renderTable() {
    const tableBody = document.getElementById("empTableBody");
    tableBody.innerHTML = "";
    
    const employees = xmlDoc.getElementsByTagName("employee");

    for (let i = 0; i < employees.length; i++) {
        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const dept = employees[i].getElementsByTagName("dept")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;

        tableBody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dept}</td>
                <td>$${salary}</td>
                <td>
                    <button class="delete-btn" onclick="deleteEmployee('${id}')">Delete</button>
                </td>
            </tr>`;
    }
}

// 3. CREATE: Add new Node with Sequential ID
function saveEmployee() {
    const name = document.getElementById("name").value;
    const dept = document.getElementById("dept").value;
    const salary = document.getElementById("salary").value;

    if (!name || !dept || !salary) {
        alert("Please fill out all fields");
        return;
    }

    // --- NEW LOGIC: Calculate Next Sequential ID ---
    const employees = xmlDoc.getElementsByTagName("employee");
    let maxId = 0;

    for (let i = 0; i < employees.length; i++) {
        const currentId = parseInt(employees[i].getElementsByTagName("id")[0].textContent);
        if (currentId > maxId) {
            maxId = currentId;
        }
    }
    const nextId = maxId + 1;
    // -----------------------------------------------

    // Create XML elements
    const newEmp = xmlDoc.createElement("employee");
    
    const idNode = xmlDoc.createElement("id");
    idNode.textContent = nextId; // Use the sequential ID
    
    const nameNode = xmlDoc.createElement("name");
    nameNode.textContent = name;
    
    const deptNode = xmlDoc.createElement("dept");
    deptNode.textContent = dept;
    
    const salNode = xmlDoc.createElement("salary");
    salNode.textContent = salary;

    newEmp.appendChild(idNode);
    newEmp.appendChild(nameNode);
    newEmp.appendChild(deptNode);
    newEmp.appendChild(salNode);

    xmlDoc.getElementsByTagName("company")[0].appendChild(newEmp);
    
    // Clear inputs and refresh table
    document.getElementById("name").value = "";
    document.getElementById("dept").value = "";
    document.getElementById("salary").value = "";
    renderTable();
}

// 4. DELETE: Remove Node
function deleteEmployee(id) {
    const employees = xmlDoc.getElementsByTagName("employee");
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getElementsByTagName("id")[0].textContent == id) {
            employees[i].parentNode.removeChild(employees[i]);
            break;
        }
    }
    renderTable();
}

window.onload = loadXML;