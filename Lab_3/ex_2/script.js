// 1. Our "Data" - starts empty
let cart = [];
let couponDiscount = 0;

// 2. Function to add items
function addItem(name, price, category) {
    // Check if item already exists to just update quantity
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, category, quantity: 1 });
    }
    updateUI();
}

// 3. Function to remove items
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    updateUI();
}

// 4. Coupon Validation (String Methods)
function applyCoupon() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    
    // Validate: Must start with "SAVE" and end with a number
    if (code.startsWith("SAVE") && code.length > 4) {
        const percent = parseInt(code.substring(4)); // Get the number after "SAVE"
        if (!isNaN(percent)) {
            couponDiscount = percent / 100;
            alert(`Coupon Applied: ${percent}% off!`);
        }
    } else {
        alert("Invalid Coupon Code");
        couponDiscount = 0;
    }
    updateUI();
}

// 5. The "Brain" - Calculates totals and updates the screen
function updateUI() {
    const cartList = document.getElementById('cartItems');
    cartList.innerHTML = ""; // Clear list
    
    let subtotal = 0;
    let bulkDiscount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Rule: Bulk Discount (10% off if buying more than 3 of the same item)
        if (item.quantity >= 3) {
            bulkDiscount += (itemTotal * 0.10);
        }

        // Add to the HTML list
        cartList.innerHTML += `
            <li>
                ${item.name} (x${item.quantity}) - $${itemTotal}
                <button onclick="removeItem('${item.name}')">Remove</button>
            </li>
        `;
    });

    // Rule: Night Owl Discount (Extra $5 off if it's after 8 PM)
    const hour = new Date().getHours();
    const timeDiscount = (hour >= 20 || hour <= 5) ? 5 : 0;

    const finalDiscount = bulkDiscount + (subtotal * couponDiscount) + timeDiscount;
    const finalTotal = Math.max(0, subtotal - finalDiscount);

    // Update screen
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('discount').innerText = finalDiscount.toFixed(2);
    document.getElementById('totalPrice').innerText = finalTotal.toFixed(2);
}