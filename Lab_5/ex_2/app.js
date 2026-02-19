let xmlDoc = null;

// Load XML via AJAX
function loadLibrary() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;
            renderBooks();
        }
    };
    xhr.send();
}

function renderBooks() {
    const tableBody = document.getElementById("bookTableBody");
    tableBody.innerHTML = "";
    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const status = books[i].getElementsByTagName("status")[0].textContent;

        tableBody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td><strong>${status}</strong></td>
                <td>
                    <button class="btn-toggle" onclick="toggleStatus('${id}')">Toggle Status</button>
                    <button class="btn-delete" onclick="deleteBook('${id}')">Delete</button>
                </td>
            </tr>`;
    }
}

function addBook() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const status = document.getElementById("status").value;

    if (!title || !author) return alert("Please fill all fields");

    // Sequential ID logic
    const books = xmlDoc.getElementsByTagName("book");
    let maxId = 0;
    for (let i = 0; i < books.length; i++) {
        let currentId = parseInt(books[i].getElementsByTagName("id")[0].textContent);
        if (currentId > maxId) maxId = currentId;
    }

    const newBook = xmlDoc.createElement("book");
    
    // Create and attach child nodes
    const nodes = { id: maxId + 1, title, author, status };
    for (let key in nodes) {
        let node = xmlDoc.createElement(key);
        node.textContent = nodes[key];
        newBook.appendChild(node);
    }

    xmlDoc.documentElement.appendChild(newBook);
    renderBooks();
}

function toggleStatus(id) {
    const books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent == id) {
            let statusNode = books[i].getElementsByTagName("status")[0];
            statusNode.textContent = (statusNode.textContent === "Available") ? "Checked Out" : "Available";
            break;
        }
    }
    renderBooks();
}

function deleteBook(id) {
    const books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent == id) {
            books[i].parentNode.removeChild(books[i]);
            break;
        }
    }
    renderBooks();
}

window.onload = loadLibrary;