// Array to store chosen items
let cart = [];
let total = 0;

function addToCart(itemName, price) {
    // Check if item is already in cart
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    
    updateCartUI();
}

// NEW FUNCTION: Removes one quantity of an item, or removes it completely if quantity is 1
function removeFromCart(itemName) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1; // Drop the count down by one
        } else {
            // Find the position of the item and slice it completely out of the array
            const itemIndex = cart.indexOf(existingItem);
            cart.splice(itemIndex, 1);
        }
    }
    
    updateCartUI(); // Redraw the screen
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Clear current UI display
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
        totalPriceElement.innerText = '0.00';
        return;
    }
    
    total = 0;
    
    // Render each item row
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        // UPDATED HTML: Added a small interactive cancel action link button next to the price
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>
                $${itemTotal.toFixed(2)} 
                <span class="cancel-link" onclick="removeFromCart('${item.name}')" style="color: #c0392b; cursor: pointer; margin-left: 10px; font-weight: bold;" title="Cancel item">×</span>
            </span>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    totalPriceElement.innerText = total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some coffee first.");
        return;
    }
    
    alert(`Order placed successfully! Total: $${total.toFixed(2)}\nThank you for choosing The Daily Grind!`);
    
    // Reset cart after checkout
    cart = [];
    updateCartUI();
}