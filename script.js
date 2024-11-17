
const data_product = [
    {
        id: 1,
        name: "Brown Paper Bag",
        image: "assests/p3.png", // Correct path to the image
        new_price: 29.99,
        old_price: 35.88,
    },
    {
        id: 2,
        name: "Brown Paper Bowl",
        image: "assests/bowls.png", // Correct path to the image
        new_price: 29.99,
        old_price: 35.88,
    },
    {
        id: 3,
        name: "Salad Pack by 50pcs",
        image: "assests/saladpack.png", // Correct path to the image
        new_price: 15000,
        old_price: 18000,
    },
    {
        id: 4,
        name: "Burger Pack",
        image: "assests/burger.png", // Correct path to the image
        new_price: 29.99,
        old_price: 35.88,
    },
    // You can add more products here
];

const catalog = document.getElementById('catalog');

// Check if the catalog element is found
if (catalog) {
    data_product.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price-container">
            <p class="price">$${product.new_price.toFixed(2)}</p>
            <p class="old-price">$${product.old_price.toFixed(2)}</p>
            <div class="price-container">
        `;
        catalog.appendChild(productItem);
    });
} else {
    console.error('Catalog element not found');
}


document.getElementById('hamburger').addEventListener('click', function() {
    const navIcons = document.getElementById('navIcons');
    navIcons.classList.toggle('active'); // Toggle the active class
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


// script for slider function
let slideIndex = 0;
showSlides(slideIndex);

// Function to change slides
function currentSlide(index) {
    slideIndex = index - 1;
    showSlides(slideIndex);
}

function showSlides(index) {
    const slides = document.querySelector('.collection');
    const dots = document.querySelectorAll('.slider-dot');

    if (index >= dots.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = dots.length - 1;
    }

    // Slide the images
    slides.style.transform = `translateX(${-slideIndex * 100}%)`;

    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}


// Automatically show the first slide
currentSlide(1);
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