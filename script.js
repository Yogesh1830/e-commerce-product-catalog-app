// Mock Database Architecture Array
const mockProducts = [
    { id: 101, name: "Pro Wireless Headphones", desc: "Active noise-canceling high fidelity sound headset.", price: 299.99 },
    { id: 102, name: "Mechanical Gaming Keyboard", desc: "Hot-swappable tactile RGB mechanical switches.", price: 129.50 },
    { id: 103, name: "UltraWide Curved Monitor", desc: "34-inch cinematic panoramic productivity desktop display.", price: 449.99 },
    { id: 104, name: "Ergonomic Wireless Mouse", desc: "Precision optical tracking sensor with comfort thumb rest.", price: 79.99 }
];

// Memory State Tracking Container
let globalCart = [];

// DOM Router System Configurations
const navButtons = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');
const productGrid = document.getElementById('product-grid');
const cartItemsList = document.getElementById('cart-items-list');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

// Client-Side Tab Switch Router Processing Logic
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        button.classList.add('active');
        const targetTab = button.getAttribute('data-tab');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
});

// Grid UI Layout Render Loop Execution
function renderCatalog() {
    productGrid.innerHTML = mockProducts.map(product => `
        <div class="product-card">
            <div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
            </div>
            <div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// State Control Add Event Processing Logic
window.addToCart = function(productId) {
    const item = mockProducts.find(p => p.id === productId);
    globalCart.push(item);
    updateCartUI();
};

// State Control Remove Event Processing Logic
window.removeFromCart = function(index) {
    globalCart.splice(index, 1);
    updateCartUI();
};

// Compute Subtotals and Synchronize UI Layout States
function updateCartUI() {
    // Sync quantities count badges
    cartCount.textContent = globalCart.length;

    // Render items view listing panel workspace
    if (globalCart.length === 0) {
        cartItemsList.innerHTML = `<p style="color:#64748b;">Your shopping cart is currently empty.</p>`;
    } else {
        cartItemsList.innerHTML = globalCart.map((item, index) => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <div style="color:#64748b; font-size:0.9rem;">$${item.price.toFixed(2)}</div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join('');
    }

    // Accumulate total billing sums dynamically
    const overallSum = globalCart.reduce((acc, current) => acc + current.price, 0);
    cartTotal.textContent = `$${overallSum.toFixed(2)}`;
}

// Run initial workspace compilation bindings
renderCatalog();
updateCartUI();
