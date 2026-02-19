let inventory = [];

async function loadInventory() {
    try {
        const response = await fetch('inventory.json');
        inventory = await response.json();
        renderTable();
    } catch (error) {
        console.error("Load failed", error);
    }
}

function renderTable() {
    const body = document.getElementById("inventoryBody");
    const filter = document.getElementById("filterCategory").value.toLowerCase();
    body.innerHTML = "";
    let total = 0;

    inventory.forEach(item => {
        // Search filter logic
        if (item.category.toLowerCase().includes(filter)) {
            const isLowStock = item.stock < 10;
            total += item.price * item.stock;

            body.innerHTML += `
                <tr class="${isLowStock ? 'low-stock' : ''}">
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>$${item.price}</td>
                    <td>${item.stock} ${isLowStock ? '(LOW)' : ''}</td>
                    <td>
                        <button onclick="editItem(${item.id})">Edit</button>
                        <button onclick="deleteItem(${item.id})">Delete</button>
                    </td>
                </tr>`;
        }
    });
    document.getElementById("totalValue").innerText = total.toLocaleString();
}

function saveProduct() {
    const id = document.getElementById("prodId").value;
    const name = document.getElementById("name").value;
    const cat = document.getElementById("category").value;
    const price = parseFloat(document.getElementById("price").value);
    const stock = parseInt(document.getElementById("stock").value);

    if (!name || isNaN(price) || isNaN(stock)) return alert("Invalid data");

    if (id) {
        const idx = inventory.findIndex(p => p.id == id);
        inventory[idx] = { id: parseInt(id), name, category: cat, price, stock };
    } else {
        const nextId = inventory.length > 0 ? Math.max(...inventory.map(p => p.id)) + 1 : 1;
        inventory.push({ id: nextId, name, category: cat, price, stock });
    }

    clearForm();
    renderTable();
}

function deleteItem(id) {
    inventory = inventory.filter(p => p.id !== id);
    renderTable();
}

function editItem(id) {
    const item = inventory.find(p => p.id === id);
    document.getElementById("prodId").value = item.id;
    document.getElementById("name").value = item.name;
    document.getElementById("category").value = item.category;
    document.getElementById("price").value = item.price;
    document.getElementById("stock").value = item.stock;
}

function clearForm() {
    document.getElementById("prodId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
}

window.onload = loadInventory;