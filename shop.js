document.getElementById('hamburger').addEventListener('click', function() {
    const navIcons = document.getElementById('navIcons');
    navIcons.classList.toggle('active'); // Toggle the active class
});
// Event listener for the close button
document.getElementById('closeBtn').addEventListener('click', function() {
    const navIcons = document.getElementById('navIcons');
    navIcons.classList.remove('active'); // Remove the active class to slide it out
});

let products = {
    data: [
        {
            item: "1",
            productName: "Brown Paper Bag",
            category: "Paper",
            price: "6500",
            image: "./assests/paper.png",
            description: "A sturdy brown paper bag, perfect for carrying groceries or gifts.",
            additionalImages: ["./assests/paper1.jpg", "./assests/paper2.png", "./assests/paper2.png"] // Add more images as needed
        },
        {
            item: "2",
            productName: "Regular white T-shirt",
            category: "Bowls",
            price: "30",
            image: "./assests/bowls.png"
        },
        {
            item: "3",
            productName: "Craft Bow Plate by 50pcs",
            category: "Bowls",
            price: "20,000",
            image: "./assests/b1.png"
        },
        {
            item: "4",
            productName: "2ptn Box PaperPlate by 50pcs",
            category: "Plates",
            price: "30",
            image: "./assests/p3.png"
        },
        {   
            item: "5",
            productName: "2ptn plastic Plate 50pcs",
            category: "Plates",
            price: "30",
            image: "./assests/p2.png"
        },
        {
            item: "6",
            productName: "Big Paper Plate by by 100pcs",
            category: "Plates",
            price: "3500",
            image: "./assests/Paperplate.png"
        },
        {
            item: "7",
            productName: "Noodles Pack by 50pcs",
            category: "Paper",
            price: "15,000",
            image: "./assests/NoodlesPack.png"
        },
        {
            item: "8",
            productName: "Craft Rect Plate by 50pcs",
            category: "Plate",
            price: "20,000",
            image: "./assests/craftrecPlate.png"
        },
        {
            item: "9",
            productName: "2ptn plastic Plate 50pcs",
            category: "Plates",
            price: "30",
            image: "./assests/craftrecPlate.png"
        },
        {
            item: "10",
            productName: "Veggies Pack by 50pcs",
            category: "Paper",
            price: "18,000",
            image: "./assests/envelopebox.png"
        },
        {
            item: "11",
            productName: "Frenchfries cup 50pcs",
            category: "Paper",
            price: "6800",
            image: "./assests/pp1.png"
        },
        {
            item: "12",
            productName: " White foampack 50pcs",
            category: "Plates",
            price: "30",
            image: "./assests/foampack.png"
        },
        {
            item: "13",
            productName: "Burger Pack 50pcs",
            category: "Paper",
            price: "30",
            image: "./assests/burger.png"
        },
        // Add more products as needed
    ],
};

let currentPage = 1; // Track the current page
const itemsPerPage = 8; // Number of items to display per page

function displayProducts(productsToDisplay) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = ''; // Clear existing products

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToShow = productsToDisplay.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        // Create card
        let card = document.createElement("div");
        card.classList.add("card", product.category);

        // Image div
        let imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        // Image tag
        let image = document.createElement("img");
        image.setAttribute ("src", product.image);
        image.setAttribute("alt", product.productName); // Add alt text for accessibility
        imgContainer.appendChild(image);
        card.appendChild(imgContainer);

        // Container
        let container = document.createElement("div");
        container.classList.add("container");

        // Product name
        let name = document.createElement("h5");
        name.classList.add("product-name");
        name.innerText = product.productName.toUpperCase();
        container.appendChild(name);

        // Price
        let price = document.createElement("h6");
        price.innerText = "N" + product.price;
        container.appendChild(price);

        card.appendChild(container);
        productsContainer.appendChild(card);

        // NEW CODE: Add click event to redirect to product-details.html
        card.addEventListener("click", function() {
            const productDetails = {
                item: product.item,
                productName: product.productName,
                category: product.category,
                price: product.price,
                image: product.image,
                additionalImages: product.additionalImages // Save additional images
            };
            localStorage.setItem("selectedProduct", JSON.stringify(productDetails));
            window.location.href = "product-details.html";
        });
    });
}

function filterProduct(value) {
    // Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    // Filter products based on selected category
    let filteredProducts = products.data.filter(product => {
        return value === "all" || product.category.toLowerCase() === value.toLowerCase();
    });

    // Reset to first page and display filtered products
    currentPage = 1;
    displayProducts(filteredProducts);
    updatePagination(filteredProducts.length);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = '';

    // Create pagination buttons
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        button.classList.add("pagination-button");
        button.addEventListener("click", function() {
            currentPage = i;
            displayProducts(products.data); // Display products for the current page
        });
        paginationContainer.appendChild(button);
    }
}

// Capture the search input field
const searchInput = document.getElementById("search-input");

// Add an event listener for input changes
searchInput.addEventListener("input", function() {
    const searchValue = this.value.toLowerCase(); // Get the search value
    filterProductsBySearch(searchValue); // Call the filter function with the search value
});

// Function to filter products based on search input
function filterProductsBySearch(searchValue) {
    // Filter products based on the search value
    let filteredProducts = products.data.filter(product => {
        return product.productName.toLowerCase().includes(searchValue); // Check if product name includes the search value
    });

    // Reset to first page and display filtered products
    currentPage = 1;
    displayProducts(filteredProducts);
    updatePagination(filteredProducts.length);
}

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