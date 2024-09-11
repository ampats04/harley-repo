// cart.js

// Get cart data from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Store updated cart in localStorage
    alert(`${product.name} added to cart!`);
}

// Function to show cart modal with items
function showCartModal() {
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear existing content

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <p>${item.name} - ${item.price}</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartModal.style.display = 'block';
}

// Close the modal when clicking on the close button
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
});

// Show the cart when the cart icon is clicked
document.getElementById('cart-icon').addEventListener('click', showCartModal);

// Close modal if clicked outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
};
