const searchBar = document.getElementById('searchBar');
const resultsContainer = document.getElementById('results');
let debounceTimer;

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase().trim();

    // 1. Clear previous timer (Debounce)
    clearTimeout(debounceTimer);
    resultsContainer.innerHTML = "";

    if (query === "") return;

    // 2. Set new timer (wait 500ms before fetching)
    debounceTimer = setTimeout(() => {
        fetchProducts(query);
    }, 500);
});

function fetchProducts(query) {
    resultsContainer.innerHTML = "Searching...";

    fetch('products.json')
        .then(response => {
            if (!response.ok) throw new Error("Could not reach server");
            return response.json();
        })
        .then(data => {
            // Filter the JSON based on query
            const filtered = data.filter(product => 
                product.name.toLowerCase().includes(query)
            );

            displayResults(filtered);
        })
        .catch(error => {
            resultsContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        });
}

function displayResults(products) {
    resultsContainer.innerHTML = "";

    if (products.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No results found.</p>';
        return;
    }

    products.forEach(item => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p>
            <p><strong>Price: $${item.price}</strong></p>
        `;
        resultsContainer.appendChild(div);
    });
}