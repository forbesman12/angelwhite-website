// Function to update the cart icon
function updateCartIcon() {
    const cartCountElement = document.getElementById("cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.length;

    if (cartCountElement) {
        cartCountElement.innerText = cartCount > 0 ? cartCount : '0';
        cartCountElement.style.display = cartCount > 0 ? 'inline' : 'none';
    }
}

// Function to add an item to the cart
function addToCart(productDetails) {
    const quantity = document.getElementById("quantity").value;
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;

    if (quantity && size && color) {
        const cartItem = {
            productName: productDetails.productName,
            price: productDetails.price,
            quantity: parseInt(quantity, 10),
            size: size,
            color: color,
            image: productDetails.image
        };

        // Add to cart in localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart icon
        updateCartIcon();

        // Show confirmation
        alert(`Added ${quantity} ${size} ${color} item(s) to cart!`);
    } else {
        alert("Please select a quantity, size, and color.");
    }
}

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function() {
    const productDetails = JSON.parse(localStorage.getItem("selectedProduct"));

    if (productDetails) {
        // Populate product details
        document.getElementById("product-name").innerText = productDetails.productName;
        document.getElementById("product-price").innerText = "N" + productDetails.price;
        document.getElementById("main-image").setAttribute("src", productDetails.image);

        // Display additional images
        const additionalImagesContainer = document.querySelector(".thumbnail-container");
        additionalImagesContainer.innerHTML = '';

        if (productDetails.additionalImages && productDetails.additionalImages.length > 0) {
            productDetails.additionalImages.forEach((imageSrc) => {
                const imgElement = document.createElement("img");
                imgElement.setAttribute("src", imageSrc);
                imgElement.setAttribute("alt", `Thumbnail of ${productDetails.productName}`);
                imgElement.classList.add("thumbnail");

                // Add click event to change main image
                imgElement.addEventListener("click", function() {
                    document.getElementById("main-image").setAttribute("src", imageSrc);
                });

                additionalImagesContainer.appendChild(imgElement);
            });
        }

        // Populate product description if available
        if (productDetails.description) {
            document.getElementById("product-description").innerText = productDetails.description;
        }

        // Add to cart functionality
        document.getElementById("add-to-cart-button").addEventListener("click", function() {
            addToCart(productDetails); // Call the addToCart function
        });

        // Call updateCartIcon on page load
        updateCartIcon();
    }
});