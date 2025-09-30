/* ============================================
   GLACIER STORE - Shopping Cart System
   Complete e-commerce cart functionality
   ============================================ */

class ShoppingCart {
    constructor() {
        this.items = [];
        this.isOpen = false;
        this.init();
    }

    init() {
        // Load cart from localStorage
        this.loadCart();

        // Create cart UI
        this.createCartUI();

        // Bind events
        this.bindEvents();

        // Update UI
        this.updateCartUI();
    }

    loadCart() {
        const savedCart = localStorage.getItem('glacierCart');
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart);
            } catch(e) {
                this.items = [];
            }
        }
    }

    saveCart() {
        localStorage.setItem('glacierCart', JSON.stringify(this.items));
    }

    createCartUI() {
        // Create cart icon in header
        const cartIconHTML = `
            <button class="cart-icon-btn" id="cart-toggle">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count">0</span>
            </button>
        `;

        // Add cart icon to header - try multiple selectors for different page structures
        let headerActions = document.querySelector('.nav-actions');
        if (!headerActions) {
            headerActions = document.querySelector('.nav-right');
        }
        if (!headerActions) {
            headerActions = document.querySelector('.header-actions');
        }

        if (headerActions) {
            const cartIconDiv = document.createElement('div');
            cartIconDiv.innerHTML = cartIconHTML;
            cartIconDiv.className = 'cart-icon-wrapper';
            // Insert before the first child (before the "Commander" button)
            headerActions.insertBefore(cartIconDiv.firstElementChild, headerActions.firstChild);
        }

        // Create cart sidebar
        const cartSidebarHTML = `
            <div class="cart-sidebar" id="cart-sidebar">
                <div class="cart-header">
                    <h3>Votre Panier</h3>
                    <button class="cart-close" id="cart-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="cart-items" id="cart-items">
                    <!-- Cart items will be inserted here -->
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span class="cart-total-price">0€</span>
                    </div>
                    <button class="btn-checkout">Commander</button>
                </div>
            </div>
            <div class="cart-overlay" id="cart-overlay"></div>
        `;

        // Add cart sidebar to body
        const cartContainer = document.createElement('div');
        cartContainer.innerHTML = cartSidebarHTML;
        document.body.appendChild(cartContainer);
    }

    bindEvents() {
        // Add to cart button
        const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addToCart();
            });
        });

        // Upsell buttons
        const upsellBtns = document.querySelectorAll('.btn-add-upsell');
        upsellBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const upsellId = btn.dataset.upsellId;
                const upsellName = btn.dataset.upsellName;
                const upsellPrice = parseInt(btn.dataset.upsellPrice);
                this.addUpsell(upsellId, upsellName, upsellPrice);
            });
        });

        // Bundle button
        const bundleBtn = document.querySelector('.btn-add-bundle');
        if (bundleBtn) {
            bundleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addBundle();
            });
        }

        // Cart toggle
        const cartToggle = document.getElementById('cart-toggle');
        if (cartToggle) {
            cartToggle.addEventListener('click', () => this.toggleCart());
        }

        // Cart close
        const cartClose = document.getElementById('cart-close');
        if (cartClose) {
            cartClose.addEventListener('click', () => this.closeCart());
        }

        // Cart overlay
        const cartOverlay = document.getElementById('cart-overlay');
        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => this.closeCart());
        }

        // Quantity controls on product page
        const quantityMinus = document.querySelector('.quantity-btn.minus');
        const quantityPlus = document.querySelector('.quantity-btn.plus');
        const quantityInput = document.getElementById('quantity');

        if (quantityMinus) {
            quantityMinus.addEventListener('click', () => {
                const current = parseInt(quantityInput.value);
                if (current > 1) {
                    quantityInput.value = current - 1;
                }
            });
        }

        if (quantityPlus) {
            quantityPlus.addEventListener('click', () => {
                const current = parseInt(quantityInput.value);
                quantityInput.value = current + 1;
            });
        }
    }

    addToCart() {
        // Get selected chiller model
        const selectedModel = window.selectedChillerModel || 'ice';
        console.log('Ajout au panier - Modèle:', selectedModel); // Log pour debug

        // Get product details from the page
        const isIceModel = selectedModel === 'ice';
        const modelName = isIceModel ? 'Chiller ICE' : 'Chiller PREMIUM';
        const productTitle = `Glacialis by Glacier® - ${modelName}`;

        // Get price based on selected model
        const price = isIceModel ? 5499 : 4999;

        const quantityInput = document.getElementById('quantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

        // Get correct image based on model
        const imagePath = isIceModel
            ? '/images%20site/images/Modif%20site/chiller/Chiller%20ice%20prof.png'
            : '/images%20site/images/Modif%20site/chiller/Chiller%20pr%C3%A9mium%20prof.png';

        // Product object with unique ID per model
        const product = {
            id: `glacialis-${selectedModel}-${Date.now()}`,
            modelType: selectedModel,
            name: productTitle,
            price: price,
            quantity: quantity,
            image: imagePath
        };

        // Check if this specific model already exists in cart
        const existingItemIndex = this.items.findIndex(item =>
            item.modelType === product.modelType && !item.type
        );

        if (existingItemIndex > -1) {
            // Update quantity if same model exists
            this.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new product (can have both ICE and PREMIUM in cart)
            this.items.push(product);
        }

        // Save and update UI
        this.saveCart();
        this.updateCartUI();

        // Show success message
        this.showAddedMessage();

        // Open cart
        this.openCart();
    }

    addUpsell(upsellId, upsellName, upsellPrice) {
        // Check if upsell already exists
        const existingUpsell = this.items.find(item => item.id === `upsell-${upsellId}`);

        if (existingUpsell) {
            // Show message that option is already added
            this.showMessage('Cette option est déjà dans votre panier!', 'info');
            return;
        }

        // Get selected model to determine filter image
        const selectedModel = window.selectedChillerModel || 'ice';

        // Determine image based on upsell type and selected model
        let upsellImage;
        if (upsellId === 'filtration') {
            // Filter image varies by model
            upsellImage = selectedModel === 'premium'
                ? '/images%20site/images/Modif%20site/filtre%20et%20couv/cartridge_filter.png'
                : '/images%20site/images/Modif%20site/filtre%20et%20couv/Filtre%20blanc.png';
        } else {
            // Cover image is always the new IMG_couvd
            upsellImage = '/images%20site/images/Modif%20site/filtre%20et%20couv/IMG_couvd.jpg.png';
        }

        // Add upsell to cart
        const upsell = {
            id: `upsell-${upsellId}`,
            name: upsellName,
            price: upsellPrice,
            quantity: 1,
            type: 'upsell',
            image: upsellImage
        };

        this.items.push(upsell);
        this.saveCart();
        this.updateCartUI();
        this.showAddedMessage();
        this.openCart();
    }

    addBundle() {
        // Check if any upsell already exists
        const hasFiltration = this.items.find(item => item.id === 'upsell-filtration');
        const hasCouverture = this.items.find(item => item.id === 'upsell-couverture');

        if (hasFiltration || hasCouverture) {
            // Remove existing upsells before adding bundle
            this.items = this.items.filter(item =>
                item.id !== 'upsell-filtration' && item.id !== 'upsell-couverture'
            );
        }

        // Get selected model to determine filter image
        const selectedModel = window.selectedChillerModel || 'ice';
        const filterImage = selectedModel === 'premium'
            ? '/images%20site/images/Modif%20site/filtre%20et%20couv/cartridge_filter.png'
            : '/images%20site/images/Modif%20site/filtre%20et%20couv/Filtre%20blanc.png';

        // Add bundle items with special pricing
        const bundleItems = [
            {
                id: 'bundle-filtration',
                name: 'Système de Filtration Premium (Pack)',
                price: 199, // Discounted price in bundle
                quantity: 1,
                type: 'bundle',
                originalPrice: 299,
                image: filterImage
            },
            {
                id: 'bundle-couverture',
                name: 'Couverture Isolante Premium (Pack)',
                price: 199, // Discounted price in bundle
                quantity: 1,
                type: 'bundle',
                originalPrice: 199,
                image: '/images%20site/images/Modif%20site/filtre%20et%20couv/IMG_couvd.jpg.png'
            }
        ];

        // Add bundle items
        bundleItems.forEach(item => {
            const existing = this.items.find(i => i.id === item.id);
            if (!existing) {
                this.items.push(item);
            }
        });

        this.saveCart();
        this.updateCartUI();
        this.showMessage('Pack Complet ajouté! Vous économisez 100€!', 'success');
        this.openCart();
    }

    showMessage(text, type = 'success') {
        // Create message element
        const message = document.createElement('div');
        message.className = 'cart-added-message';
        const bgColor = type === 'success' ? '#10b981' : type === 'info' ? '#3b82f6' : '#ef4444';
        message.style.background = bgColor;
        message.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${text}</span>
        `;

        document.body.appendChild(message);

        // Show animation
        setTimeout(() => {
            message.classList.add('show');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 3000);
    }

    removeFromCart(itemId) {
        // If removing a bundle item, remove both bundle items
        if (itemId.startsWith('bundle-')) {
            this.items = this.items.filter(item => !item.id.startsWith('bundle-'));
            this.showMessage('Pack complet retiré du panier', 'info');
        } else {
            this.items = this.items.filter(item => item.id !== itemId);
        }

        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(itemId, newQuantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(itemId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    updateCartUI() {
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // Update cart items
        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) {
            if (this.items.length === 0) {
                cartItemsContainer.innerHTML = '<p class="cart-empty">Votre panier est vide</p>';
            } else {
                cartItemsContainer.innerHTML = this.items.map(item => {
                    // Show original price strikethrough for bundle items
                    const priceDisplay = item.type === 'bundle' && item.originalPrice
                        ? `<div class="cart-item-price">
                            <span style="text-decoration: line-through; color: #999; font-size: 0.9rem; margin-right: 8px;">
                                ${item.originalPrice}€
                            </span>
                            <span style="color: #10b981; font-weight: 700;">${item.price}€</span>
                          </div>`
                        : `<div class="cart-item-price">${item.price}€</div>`;

                    // Show bundle badge if it's a bundle item
                    const bundleBadge = item.type === 'bundle'
                        ? '<span style="background: #FFD700; color: #333; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-left: 8px;">PACK</span>'
                        : '';

                    // Only show quantity controls for non-upsell items
                    const quantityControls = item.type !== 'upsell'
                        ? `<div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                          </div>`
                        : '<div style="width: 100px;"></div>';

                    return `
                        <div class="cart-item" data-id="${item.id}">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                            <div class="cart-item-details">
                                <h4>${item.name}${bundleBadge}</h4>
                                ${priceDisplay}
                            </div>
                            ${quantityControls}
                            <button class="cart-item-remove" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                }).join('');

                // Bind quantity and remove events
                cartItemsContainer.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const itemId = btn.dataset.id;
                        const item = this.items.find(i => i.id === itemId);
                        if (item) {
                            this.updateQuantity(itemId, item.quantity - 1);
                        }
                    });
                });

                cartItemsContainer.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const itemId = btn.dataset.id;
                        const item = this.items.find(i => i.id === itemId);
                        if (item) {
                            this.updateQuantity(itemId, item.quantity + 1);
                        }
                    });
                });

                cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.removeFromCart(btn.dataset.id);
                    });
                });
            }
        }

        // Update total
        const cartTotal = document.querySelector('.cart-total-price');
        if (cartTotal) {
            const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = total.toLocaleString('fr-FR') + '€';
        }
    }

    toggleCart() {
        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }

    openCart() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');

        if (sidebar && overlay) {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }

    closeCart() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');

        if (sidebar && overlay) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }

    showAddedMessage() {
        // Create success message
        const message = document.createElement('div');
        message.className = 'cart-added-message';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Produit ajouté au panier!</span>
        `;

        document.body.appendChild(message);

        // Show animation
        setTimeout(() => {
            message.classList.add('show');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.glacierCart = new ShoppingCart();
});