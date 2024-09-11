// component.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Load HTML components
    loadHTML('header.html', 'header');
    loadHTML('slider.html', 'slider');
    loadHTML('products.html', 'product');
    loadHTML('footer.html', 'footer');
});

function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (elementId === 'product') {
                initializeProducts(); // Initialize products once HTML is loaded
            } else if (elementId === 'slider') {
                initializeSlider();
            } else if (elementId === 'header') {
                initializeHeader();
            } 
        })
        .catch(error => console.error('Error loading file:', error));
}

function initializeHeader() {
    // Setup cart modal functionality
    document.getElementById('cart-icon').addEventListener('click', function() {
        document.getElementById('cartModal').style.display = 'block';
        displayCart(); // Ensure this function is defined in your JS file
    });

    document.getElementById('clearCartBtn').addEventListener('click', function() {
    localStorage.removeItem('cart'); 
    updateCartCount(); 
    displayCart();
});

    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('cartModal').style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === document.getElementById('cartModal')) {
            document.getElementById('cartModal').style.display = 'none';
        }
    };

    updateCartCount();
}


function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    document.getElementById('cart-count').textContent = totalQuantity;
}


function initializeProducts() {
    fetch('/json/products.json')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched products:', data);
            renderProducts(data);
        })
        .catch(error => console.error('Error loading products:', error));
}
function addToCart(product) {
   
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        // Add the new product to the cart with a quantity of 1
        product.quantity = 1;
        cart.push(product);
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); 
    alert(`${product.name} has been added to your cart!`);
}

function renderProducts(products) {
    const container = document.getElementById('product');
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Create product image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('product-image-container');

        const mainImage = document.createElement('img');
        mainImage.classList.add('product-image', 'main-image');
        mainImage.src = product.image;
        mainImage.alt = product.name;
        imageContainer.appendChild(mainImage);

        if (product.hoverImage) {
            const hoverImage = document.createElement('img');
            hoverImage.classList.add('product-image', 'hover-image');
            hoverImage.src = product.hoverImage;
            hoverImage.alt = `Hover ${product.name}`;
            imageContainer.appendChild(hoverImage);
        } else {
            // Add a class to disable hover effect if hoverImage is not present
            card.classList.add('no-hover');
        }

        card.appendChild(imageContainer);
        card.innerHTML += `
            <h2>Name: ${product.name}</h2>
            <p>Type: ${product.type}</p>
            <p>Color: ${product.color}</p>
            <p class="price">Price: ${product.price}</p>
            <button class="checkout-button">Add to cart</button>
        `;

        // Add checkout button functionality
        const checkoutBtn = card.querySelector('.checkout-button');
        checkoutBtn.addEventListener('click', () => addToCart(product));

        container.appendChild(card);
    });
}

// Show the cart modal and load cart contents
document.getElementById('cart-icon').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'block';
    displayCart(); // Ensure this function is defined in your JS file
});

// Close the cart modal when the close button is clicked
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'none';
});

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target === document.getElementById('cartModal')) {
        document.getElementById('cartModal').style.display = 'none';
    }
};

// Function to display cart contents inside the modal
function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    cartItemsContainer.innerHTML = ''; // Clear previous content

    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <p class = "cart-p" >Your cart is empty.</p>
                <h4 class = "cart-h4">0 Item(s)</h4>
            </div>
        `;
        clearCartBtn.style.display = 'none'; // Hide Clear Cart button
        checkoutBtn.style.display = 'none'; // Hide Proceed to Checkout button
    }
    else {
        clearCartBtn.style.display = 'block'; // Hide Clear Cart button
        checkoutBtn.style.display = 'block'; // Hide Proceed to Checkout button
        let totalPrice = 0; // Initialize total price variable

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <p><strong>${item.name}</strong></p>
                    <p>${item.type}</p>
                    <p>${item.price}</p>
                    <p>${item.color}</p>
                    <p>Qty: ${item.quantity || 1}</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);

            // Add to total price
            totalPrice += parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * (item.quantity || 1); // Remove currency symbols and parse to float
        });

        // Display total price
        const totalElement = document.createElement('div');
        totalElement.classList.add('cart-total');
        totalElement.innerHTML = `<h3 class = "cart-h3">Total: $${totalPrice.toFixed(2)}</h3>`;
        cartItemsContainer.appendChild(totalElement);
    }
}


// Clear the cart and update the modal display


function initializeSlider() {
    // Load and initialize the slider logic
    const script = document.createElement('script');
    script.src = '/js/slider.js';
    document.body.appendChild(script);
}
