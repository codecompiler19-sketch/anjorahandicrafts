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
                <a href="${product.slug}.html">
                    <img src="${encodeURI(product.images[0])}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80'">
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
                    <a href="${product.slug}.html">${product.name}</a>
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
                    <img src="${encodeURI(product.images[0])}" alt="${product.name}" style="width: 100%; border-radius: var(--radius-md); aspect-ratio: 1/1; object-fit: cover;">
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
                        <a href="${product.slug}.html" class="btn btn-outline" style="padding: 0.85rem 1.25rem;">
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
                    <a href="${m.slug}.html" class="search-result-item">
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

    // Hero Slider Carousel with dots and left/right arrows
    const heroSection = document.querySelector(".hero-section.hero-image-only");
    const slides = heroSection ? heroSection.querySelectorAll(".hero-slide") : [];
    const dots = heroSection ? heroSection.querySelectorAll(".hero-dot") : [];
    const previousArrow = heroSection ? heroSection.querySelector(".hero-arrow-left") : null;
    const nextArrow = heroSection ? heroSection.querySelector(".hero-arrow-right") : null;
    let currentSlide = 0;
    let slideInterval = null;

    function goToSlide(index) {
        if (!slides.length) return;
        currentSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
            dot.setAttribute("aria-current", i === currentSlide ? "true" : "false");
        });
    }

    function startSlideTimer() {
        if (slides.length < 2) return;
        clearInterval(slideInterval);
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
    }

    function resetSlideTimer() {
        clearInterval(slideInterval);
        startSlideTimer();
    }

    if (slides.length > 1) {
        dots.forEach((dot, index) => dot.addEventListener("click", () => {
            goToSlide(index);
            resetSlideTimer();
        }));
        if (previousArrow) previousArrow.addEventListener("click", () => {
            goToSlide(currentSlide - 1);
            resetSlideTimer();
        });
        if (nextArrow) nextArrow.addEventListener("click", () => {
            goToSlide(currentSlide + 1);
            resetSlideTimer();
        });
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


// Sticky social media sidebar — shared across storefront pages.
function initAnjoraSocialSidebar() {
    if (document.getElementById("anjoraSocialSidebar")) return;

    const socials = [
        { name: "WhatsApp", url: "https://wa.me/919999278207", label: "Chat with Anjora on WhatsApp", icon: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5Z"/><path d="M8.8 8.2c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .7.6 1 1.5 1.8 2.5 2.3.3.1.5.1.7-.1l.8-1c.2-.2.4-.3.7-.2l1.7.8c.3.1.4.3.4.5 0 .3-.2 1.3-.8 1.8-.5.5-1.3.8-2.1.7-1.1-.1-2.5-.7-4-2-1.8-1.6-2.9-3.5-3.2-4.5-.3-1 .1-1.7.5-2Z"/>' },
        { name: "Instagram", url: "https://www.instagram.com/anjorahandicrafts/", label: "Follow Anjora on Instagram", icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" class="social-dot"/>' },
        { name: "Facebook", url: "https://facebook.com", label: "Visit Facebook", icon: '<path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9a1 1 0 0 1 1-1Z"/>' },
        { name: "YouTube", url: "https://youtube.com", label: "Visit YouTube", icon: '<path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.5A2.5 2.5 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12Z"/><path d="m10 9 5 3-5 3Z"/>' },
        { name: "Pinterest", url: "https://pinterest.com", label: "Visit Pinterest", icon: '<path d="M12 22a10 10 0 1 0-3.7-.7"/><path d="M9 18c1.1-1.6 1.5-3.6 2-5.5-.4-.8-.5-1.8-.1-2.8.8-2 3.4-2 3.7-.1.2 1.2-.7 3.2-1.1 4.7-.4 1.3.6 2.3 1.9 1.8 2.3-.8 3.5-3.5 3.2-6.2-.4-3.5-4.4-5-7.5-3.5-3.5 1.7-3.7 6-.9 8"/>' }
    ];

    const dock = document.createElement("aside");
    dock.id = "anjoraSocialSidebar";
    // Start hidden so the sidebar never flashes open during page rendering.
    dock.className = "anjora-social-sidebar is-collapsed";
    dock.setAttribute("aria-label", "Anjora social media links");
    dock.innerHTML = `
        <div class="anjora-social-rail" id="anjoraSocialRail">
            ${socials.map(s => `<a class="anjora-social-link social-${s.name.toLowerCase()}" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" title="${s.name}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${s.icon}</svg><span class="anjora-social-tooltip">${s.name}</span></a>`).join("")}
        </div>
        <button class="anjora-social-collapse" type="button" aria-label="Show social media sidebar" aria-expanded="false" title="Show social links"><span aria-hidden="true">›</span></button>
    `;
    document.body.appendChild(dock);

    const collapse = dock.querySelector(".anjora-social-collapse");
    const setCollapsed = (collapsed) => {
        dock.classList.toggle("is-collapsed", collapsed);
        collapse.setAttribute("aria-expanded", String(!collapsed));
        collapse.setAttribute("aria-label", collapsed ? "Show social media sidebar" : "Hide social media sidebar");
        collapse.title = collapsed ? "Show social links" : "Hide social links";
        collapse.querySelector("span").textContent = collapsed ? "›" : "‹";
    };

    let userChangedSidebar = false;
    collapse.addEventListener("click", () => {
        userChangedSidebar = true;
        setCollapsed(!dock.classList.contains("is-collapsed"));
    });

    // Wait until the page and its assets have loaded, then briefly preview the
    // social links for one second before returning to the compact closed state.
    const startPreview = () => {
        window.setTimeout(() => {
            if (userChangedSidebar) return;
            setCollapsed(false);
            window.setTimeout(() => {
                if (!userChangedSidebar) setCollapsed(true);
            }, 1000);
        }, 5000);
    };

    if (document.readyState === "complete") {
        startPreview();
    } else {
        window.addEventListener("load", startPreview, { once: true });
    }
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnjoraSocialSidebar, { once: true });
} else {
    initAnjoraSocialSidebar();
}
