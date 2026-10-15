/**
 * Anjora Handicrafts - Main Scripts
 * Handles UI, Navigation, Wishlist, Search, Modals, Sliders and Common Functions
 */

// Toast Notifications
window.showToast = function(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
};

// Wishlist Manager
const Wishlist = {
    key: "anjora_wishlist",

    getItems() {
        try {
            return JSON.parse(localStorage.getItem(this.key)) || [];
        } catch (e) {
            return [];
        }
    },

    toggle(productId) {
        let items = this.getItems();
        const index = items.indexOf(productId);
        let added = false;

        if (index > -1) {
            items.splice(index, 1);
            showToast("Removed from your wishlist");
        } else {
            items.push(productId);
            added = true;
            showToast("Saved to your wishlist!");
        }

        localStorage.setItem(this.key, JSON.stringify(items));
        this.updateUI();
        return added;
    },

    has(productId) {
        return this.getItems().includes(productId);
    },

    updateUI() {
        const items = this.getItems();
        document.querySelectorAll(".wishlist-count-badge").forEach(el => {
            el.textContent = items.length;
            el.style.display = items.length > 0 ? "flex" : "none";
        });

        // Update button states on cards
        document.querySelectorAll("[data-wishlist-btn]").forEach(btn => {
            const id = btn.getAttribute("data-wishlist-btn");
            if (this.has(id)) {
                btn.classList.add("in-wishlist");
                btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
            } else {
                btn.classList.remove("in-wishlist");
                btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
            }
        });
    }
};
window.Wishlist = Wishlist;

// Product Card HTML generator
window.renderProductCard = function(product) {
    const isWishlisted = Wishlist.has(product.id);
    const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-badge-wrap">
                ${product.badge ? `<span class="badge badge-heritage">${product.badge}</span>` : ''}
                ${discountPct > 0 ? `<span class="badge badge-sale">${discountPct}% OFF</span>` : ''}
            </div>

            <div class="product-thumb-wrap">
                <a href="${product.id === 'prod-013' ? 'hand-made-hair-band-crochet-sunflower.html' : 'product.html?id=' + product.id}">
                    <img src="${product.images[0]}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'">
                </a>
                <div class="product-quick-actions">
                    <button class="action-circle-btn" onclick="openQuickView('${product.id}')" title="Quick View">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button class="action-circle-btn ${isWishlisted ? 'in-wishlist' : ''}" data-wishlist-btn="${product.id}" onclick="Wishlist.toggle('${product.id}')" title="Save to Wishlist">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="action-circle-btn" onclick="Cart.addItem('${product.id}')" title="Add to Cart">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="product-info">
                <div class="product-artisan-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>
                    ${product.artisan.name} (${product.artisan.region.split(',')[0]})
                </div>

                <h3 class="product-name">
                    <a href="${product.id === 'prod-013' ? 'hand-made-hair-band-crochet-sunflower.html' : 'product.html?id=' + product.id}">${product.name}</a>
                </h3>

                <div class="product-rating">
                    <span class="stars">★★★★★</span>
                    <span class="review-count">(${product.reviewCount})</span>
                </div>

                <div class="product-price-row">
                    <span class="current-price">${CONFIG.currencySymbol}${product.price.toLocaleString()}</span>
                    <span class="original-price">${CONFIG.currencySymbol}${product.originalPrice.toLocaleString()}</span>
                    <span class="discount-tag">Save ${discountPct}%</span>
                </div>

                <button class="btn-add-cart" onclick="Cart.addItem('${product.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
};

// Quick View Modal
window.openQuickView = function(productId) {
    const product = window.getProductById(productId);
    if (!product) return;

    let overlay = document.getElementById("quickViewModal");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "quickViewModal";
        overlay.className = "modal-overlay";
        document.body.appendChild(overlay);
    }

    const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    overlay.innerHTML = `
        <div class="modal-card">
            <button class="modal-close-btn" onclick="closeQuickView()">✕</button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem;">
                <div>
                    <img src="${product.images[0]}" alt="${product.name}" style="width: 100%; border-radius: var(--radius-md); aspect-ratio: 1/1; object-fit: cover;">
                </div>
                <div style="display: flex; flex-direction: column;">
                    <div style="font-size: 0.8rem; color: var(--primary); font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">
                        ${product.categoryName}
                    </div>
                    <h2 style="font-size: 1.5rem; margin-bottom: 0.75rem; color: var(--secondary);">${product.name}</h2>
                    <div class="product-rating" style="margin-bottom: 1rem;">
                        <span class="stars">★★★★★</span>
                        <span class="review-count">${product.rating} (${product.reviewCount} reviews)</span>
                    </div>
                    <div class="product-price-row" style="margin-bottom: 1.25rem;">
                        <span class="current-price" style="font-size: 1.5rem;">${CONFIG.currencySymbol}${product.price.toLocaleString()}</span>
                        <span class="original-price">${CONFIG.currencySymbol}${product.originalPrice.toLocaleString()}</span>
                        <span class="discount-tag">${discountPct}% OFF</span>
                    </div>
                    <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">
                        ${product.shortDesc}
                    </p>
                    <div style="background: var(--cream-bg); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; font-size: 0.85rem;">
                        <div><strong>Artisan:</strong> ${product.artisan.name}</div>
                        <div><strong>Origin:</strong> ${product.artisan.region}</div>
                        <div><strong>Materials:</strong> ${product.materials}</div>
                    </div>
                    <div style="display: flex; gap: 1rem; margin-top: auto;">
                        <button class="btn btn-primary" style="flex: 1;" onclick="Cart.addItem('${product.id}'); closeQuickView();">
                            Add to Cart
                        </button>
                        <a href="${product.id === 'prod-013' ? 'hand-made-hair-band-crochet-sunflower.html' : 'product.html?id=' + product.id}" class="btn btn-outline" style="padding: 0.85rem 1.25rem;">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    overlay.onclick = function(e) {
        if (e.target === overlay) closeQuickView();
    };
};

window.closeQuickView = function() {
    const overlay = document.getElementById("quickViewModal");
    if (overlay) {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }
};

// Initialize Global Search & Event Handlers
document.addEventListener("DOMContentLoaded", () => {
    // Sync Wishlist UI
    Wishlist.updateUI();

    // Live Header Search
    const searchInput = document.getElementById("headerSearchInput");
    const searchDropdown = document.getElementById("headerSearchResults");

    if (searchInput && searchDropdown) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (query.length < 2) {
                searchDropdown.classList.remove("active");
                return;
            }

            const matches = PRODUCTS.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.categoryName.toLowerCase().includes(query) ||
                p.artisan.name.toLowerCase().includes(query) ||
                p.tags.some(t => t.toLowerCase().includes(query))
            ).slice(0, 6);

            if (matches.length === 0) {
                searchDropdown.innerHTML = `<div style="padding: 1.25rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No handcrafted treasures found for "${e.target.value}".</div>`;
            } else {
                searchDropdown.innerHTML = matches.map(m => `
                    <a href="product.html?id=${m.id}" class="search-result-item">
                        <img src="${m.images[0]}" alt="${m.name}" class="search-result-thumb">
                        <div class="search-result-info">
                            <div class="search-result-title">${m.name}</div>
                            <div class="search-result-price">${CONFIG.currencySymbol}${m.price.toLocaleString()} <span style="font-size:0.75rem; color:#888;">· ${m.categoryName}</span></div>
                        </div>
                    </a>
                `).join("");
            }
            searchDropdown.classList.add("active");
        });

        // Close search on click outside
        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.remove("active");
            }
        });
    }

    // Mobile Navigation Drawer Toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const mobileDrawer = document.getElementById("mobileNavDrawer");
    const mobileClose = document.getElementById("mobileNavClose");

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener("click", () => {
            mobileDrawer.classList.add("active");
            mobileToggle.setAttribute("aria-expanded", "true");
            document.body.style.overflow = "hidden";
        });
    }
    if (mobileClose && mobileDrawer) {
        mobileClose.addEventListener("click", () => {
            mobileDrawer.classList.remove("active");
            if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        });
    }

    // Hero Slider Carousel
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");
    let currentSlide = 0;
    let slideInterval = null;

    function goToSlide(index) {
        slides.forEach((s, i) => {
            s.classList.toggle("active", i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle("active", i === index);
        });
        currentSlide = index;
    }

    if (slides.length > 1) {
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                goToSlide(index);
                resetSlideTimer();
            });
        });

        function startSlideTimer() {
            slideInterval = setInterval(() => {
                let next = (currentSlide + 1) % slides.length;
                goToSlide(next);
            }, 6000);
        }

        function resetSlideTimer() {
            clearInterval(slideInterval);
            startSlideTimer();
        }

        startSlideTimer();
    }

    // Newsletter Submission
    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector("input[type='email']");
            if (emailInput && emailInput.value) {
                showToast("Thank you for joining the Anjora Artisan Family! Check your inbox for 10% off.");
                emailInput.value = "";
            }
        });
    }
});
