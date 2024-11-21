// Function to update the cart icon and total item count
function updateCartIcon() {
    const cartCountElement = document.getElementById("cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Calculate total item count in the cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartCountElement) {
        cartCountElement.innerText = totalItems > 0 ? totalItems : '0';
        cartCountElement.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

// Function to add an item to the cart
function addToCart(productDetails) {
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;

    // Validate user inputs
    if (!quantity || !size || !color) {
        alert("Please select a valid quantity, size, and color.");
        return;
    }

    // Calculate the price based on size
    const price = productDetails.price[size] || productDetails.price;

    // Create a cart item
    const cartItem = {
        productName: productDetails.productName,
        price: price,
        quantity: quantity,
        size: size,
        color: color,
        image: productDetails.image
    };

    // Retrieve and update the cart in localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(
        item =>
            item.productName === cartItem.productName &&
            item.size === cartItem.size &&
            item.color === cartItem.color
    );

    if (existingItemIndex !== -1) {
        // Update the quantity of the existing item
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add the new item to the cart
        cart.push(cartItem);
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart icon
    updateCartIcon();

    // Show confirmation
    alert(`Added ${quantity} ${size} ${color} item(s) to the cart!`);
}

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    const productDetails = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!productDetails) {
        alert("Product details not found.");
        return;
    }

    // Populate product details
    document.getElementById("product-name").innerText = productDetails.productName;
    document.getElementById("main-image").setAttribute("src", productDetails.image);

    // Handle size-based pricing
    const priceElement = document.getElementById("product-price");
    const sizeSelector = document.getElementById("size");

    function updatePrice() {
        const selectedSize = sizeSelector.value;

        // Check if price is an object and retrieve the price based on the selected size
        let price;
        if (typeof productDetails.price === "object") {
            price = productDetails.price[selectedSize] || productDetails.price.default || "Price not available";
        } else {
            // For fixed price items
            price = productDetails.price;
        }

        priceElement.innerText = `N${price}`;
    }

    // Update price when size is changed
    sizeSelector.addEventListener("change", updatePrice);

    // Set the initial price
    updatePrice();

    // Display additional images
    const additionalImagesContainer = document.querySelector(".thumbnail-container");
    additionalImagesContainer.innerHTML = ''; // Clear previous thumbnails

    if (productDetails.additionalImages && productDetails.additionalImages.length > 0) {
        productDetails.additionalImages.forEach(imageSrc => {
            const imgElement = document.createElement("img");
            imgElement.setAttribute("src", imageSrc);
            imgElement.setAttribute("alt", `Thumbnail of ${productDetails.productName}`);
            imgElement.classList.add("thumbnail");

            // Add click event to change the main image
            imgElement.addEventListener("click", () => {
                document.getElementById("main-image").setAttribute("src", imageSrc);
            });

            additionalImagesContainer.appendChild(imgElement);
        });
    }

    // Populate product description if available
    if (productDetails.description) {
        document.getElementById("product-description").innerText = productDetails.description;
    }

    // Add "Add to Cart" functionality
    document.getElementById("add-to-cart-button").addEventListener("click", () => {
        addToCart(productDetails);
    });

    // Update cart icon on page load
    updateCartIcon();
});