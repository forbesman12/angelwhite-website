document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");

    // Function to render cart items in the HTML
    function renderCart() {
        if (cart.length > 0) {
            cartItemsContainer.innerHTML = '';
            cart.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.productName}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h2>${item.productName}</h2>
                        <p>${item.color} / ${item.size}</p>
                        <p class="cart-item-price">₦${item.price.toLocaleString()}</p>
                        <div class="cart-item-quantity">
                            <button onclick="decreaseQuantity(${index})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="increaseQuantity(${index})">+</button>
                        </div>
                    </div>
                    <span class="cart-item-delete" onclick="removeItem(${index})">&times;</span>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        } else {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        }
        updateCartIcon(); // Update the cart icon and WhatsApp link
    }

    function updateCartIcon() {
        const cartCountElement = document.getElementById("cart-count");
        const cartCount = cart.length;
        cartCountElement.innerText = cartCount > 0 ? cartCount : '0';
        cartCountElement.style.display = cartCount > 0 ? 'inline' : 'none';
    
        // Construct the message for WhatsApp
        let message = "I'd like to order the following items from your store:\n\n";
        if (cart.length > 0) {
            cart.forEach((item) => {
                message += `${item.productName} - ${item.color} / ${item.size}, ₦${item.price.toLocaleString()} x ${item.quantity}\n`;
            });
        } else {
            message += "(No items in the cart)"; // Fallback message if cart is empty
        }
    
        // Debug: Log the message to see if it's correctly constructed
        console.log("WhatsApp Message:", message);
    
        // Update the href of the checkout button with the WhatsApp link
        const whatsappNumber = "2349067493752"; // Your WhatsApp number
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Debug: Log the WhatsApp link to verify it's correct
        console.log("WhatsApp Link:", whatsappLink);
    
        // Update the checkout button
        document.getElementById("checkout-button").href = whatsappLink;
    }
    

    // Function to decrease quantity
    window.decreaseQuantity = function(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1); // Remove item if quantity is 1
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Re-render the cart and update the WhatsApp link
    };

    // Function to increase quantity
    window.increaseQuantity = function(index) {
        cart[index].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Re-render the cart and update the WhatsApp link
    };

    // Function to remove item from the cart
    window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Re-render the cart and update the WhatsApp link
    };

    // Call this function to render the cart items and update the WhatsApp link on page load
    renderCart();
});
