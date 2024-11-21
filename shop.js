import { products } from './image.js';

document.getElementById('hamburger').addEventListener('click', function() {
    const navIcons = document.getElementById('navIcons');
    navIcons.classList.toggle('active'); // Toggle the active class
});
// Event listener for the close button
document.getElementById('closeBtn').addEventListener('click', function() {
    const navIcons = document.getElementById('navIcons');
    navIcons.classList.remove('active'); // Remove the active class to slide it out
});



let currentPage = 1; // Track the current page
let itemsPerPage = calculateItemsPerPage(); // Dynamically set based on screen size

// Function to calculate items per page based on the screen size
function calculateItemsPerPage() {
    return window.innerWidth <= 768 ? 8 : 9; // 8 items for responsive view, 9 for normal
}

// Function to display products
function displayProducts(productsToDisplay) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = ''; // Clear existing products

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = productsToDisplay.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        let card = document.createElement("div");
        card.classList.add("card", product.category);

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        let image = document.createElement("img");
        image.setAttribute("src", product.image);
        image.setAttribute("alt", product.productName);
        imgContainer.appendChild(image);
        card.appendChild(imgContainer);

        let container = document.createElement("div");
        container.classList.add("container");

        let name = document.createElement("h5");
        name.classList.add("product-name");
        name.innerText = product.productName.toUpperCase();
        container.appendChild(name);

        // Handle default price display
        let priceElement = document.createElement("h6");

        if (typeof product.price === "object") {
            // If the price is an object (size-based), pick the default size
            const defaultSize = "small"; // Define your default size
            const defaultPrice = product.price[defaultSize];
            priceElement.innerText = `N${defaultPrice} (${defaultSize.charAt(0).toUpperCase() + defaultSize.slice(1)})`; // Display default size price
        } else {
            // For fixed price items
            priceElement.innerText = `N${product.price}`;
        }

        container.appendChild(priceElement);

        card.appendChild(container);
        productsContainer.appendChild(card);

        // Add event listener to redirect to product details
        card.addEventListener("click", function () {
            const productDetails = {
                item: product.item,
                productName: product.productName,
                category: product.category,
                price: product.price, // Pass size-based pricing object if available
                image: product.image,
                additionalImages: product.additionalImages || [],
                description: product.description || "No description available."
            };
            localStorage.setItem("selectedProduct", JSON.stringify(productDetails));
            window.location.href = "product-details.html";
        });
    });
}

// Assuming this is in your external JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-value');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            filterProduct(button.innerText); // Pass the button text to filterProduct
        });
    });
});

// Function to filter products
window.filterProduct = function (value) {
    console.log("Filtering for:", value); // Debugging statement

    // Normalize the value to lowercase
    const filterValue = value.toLowerCase();

    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach(button => {
        if (filterValue === button.innerText.toLowerCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    // If the filter value is "all", show all products
    let filteredProducts = filterValue === "all"
        ? products.data
        : products.data.filter(product => product.category.toLowerCase() === filterValue);

    console.log("Filtered products:", filteredProducts); // Debugging statement

    currentPage = 1; // Reset to first page
    displayProducts(filteredProducts);
    updatePagination(filteredProducts.length);
}



// Function to update pagination
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.classList.add("pagination-button");
        if (i === currentPage) button.classList.add("active"); // Highlight current page

        button.addEventListener("click", function () {
            currentPage = i;
            displayProducts(products.data); // Display products for the selected page
        });

        paginationContainer.appendChild(button);
    }
}

// Function to handle search
function filterProductsBySearch(searchValue) {
    let filteredProducts = products.data.filter(product => {
        return product.productName.toLowerCase().includes(searchValue.toLowerCase());
    });

    currentPage = 1; // Reset to first page
    displayProducts(filteredProducts);
    updatePagination(filteredProducts.length);
}

// Set up event listeners on page load
document.addEventListener("DOMContentLoaded", function () {
    updateCartIcon(); // Update the cart icon

    // Capture the search input field
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", function () {
        filterProductsBySearch(this.value);
    });

    // Check for filter query parameter
    const filterValue = getQueryParam("filter");
    if (filterValue) {
        filterProduct(filterValue);
    } else {
        displayProducts(products.data);
        updatePagination(products.data.length);
    }

    // Adjust items per page dynamically on resize
    window.addEventListener("resize", function () {
        itemsPerPage = calculateItemsPerPage(); // Recalculate items per page
        displayProducts(products.data);
        updatePagination(products.data.length);
    });
});

// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


// Use the filter value
window.onload = function() {
    const filterValue = getQueryParam('filter');
    if (filterValue) {
        console.log("Filter value:", filterValue);
        filterProduct(filterValue); // Call filterProduct to display filtered products
    } else {
        displayProducts(products.data); // Display all products if no filter is applied
    }
};

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

// Call updateCartIcon on page load
document.addEventListener("DOMContentLoaded", function() {
    updateCartIcon(); // Call this to ensure the cart count is displayed
});

// footer
document.querySelectorAll('.toggle-dropdown').forEach(item => {
    item.addEventListener('click', function() {
        // Toggle the active class on the parent <li>
        const parentLi = this.parentElement;
        parentLi.classList.toggle('active');

        // Toggle the dropdown visibility
        const dropdown = parentLi.querySelector('.dropdown');
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    });
});