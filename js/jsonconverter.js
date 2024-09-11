function renderProducts(products) {
    const container = document.getElementById('product');
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Type: ${product.type}</p>
            <p class="price">${product.price}</p>
        `;
        
        container.appendChild(card);
    });
}