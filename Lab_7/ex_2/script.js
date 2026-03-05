const API_URL = "http://localhost:3000/books";
let page = 1;

// Load initial data
window.onload = () => fetchBooks(`${API_URL}?page=1`, false);

async function fetchBooks(url, append = false) {
    try {
        const response = await fetch(url);
        const books = await response.json();
        const display = document.getElementById('bookResults');

        const html = books.map(book => `
            <div class="book-card">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Category:</strong> ${book.category}</p>
                <p class="price">Price: ₹${book.price}</p>
                <p>Rating: ⭐ ${book.rating}</p>
            </div>
        `).join('');

        if (append) {
            display.innerHTML += html;
        } else {
            display.innerHTML = html;
            page = 1; // Reset page if it's a new search/filter
        }
    } catch (err) {
        console.error("Error fetching books:", err);
    }
}

function searchBooks() {
    const title = document.getElementById('searchTitle').value;
    fetchBooks(`${API_URL}/search?title=${title}`);
}

function filterBooks(category) {
    fetchBooks(`${API_URL}/category/${category}`);
}

function sortBy(field) {
    fetchBooks(`${API_URL}/sort/${field}`);
}

function getTop() {
    fetchBooks(`${API_URL}/top`);
}

function loadMore() {
    page++;
    fetchBooks(`${API_URL}?page=${page}`, true);
}