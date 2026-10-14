/**
 * Anjora Handicrafts - Cart Management System
 * Stores items in localStorage, handles cart drawer, quantity updates,
 * discounts, and shipping calculations.
 */

const Cart = {
    key: "anjora_cart",
    appliedCouponKey: "anjora_applied_coupon",

    getItems() {
        try {
            return JSON.parse(localStorage.getItem(this.key)) || [];
        } catch (e) {
            return [];
        }
    },

    saveItems(items) {
        localStorage.setItem(this.key, JSON.stringify(items));
        this.updateUI();
    },

    getAppliedCoupon() {
        try {
            return JSON.parse(localStorage.getItem(this.appliedCouponKey)) || null;
        } catch (e) {
            return null;
        }
    },

    applyCoupon(code) {
        const cleanCode = (code || "").trim().toUpperCase();
        const found = CONFIG.coupons.find(c => c.code === cleanCode);
        const subtotal = this.getSubtotal();

        if (!found) {
            return { success: false, message: "Invalid coupon code." };
        }
        if (subtotal < found.minSpend) {
            return {
                success: false,
                message: `Coupon requires a minimum order of ${CONFIG.currencySymbol}${found.minSpend}.`
            };
        }

        localStorage.setItem(this.appliedCouponKey, JSON.stringify(found));
        this.updateUI();
        return {
            success: true,
            message: `Coupon '${found.code}' applied! You saved ${found.discountPercent}%.`
        };
    },

    removeCoupon() {
        localStorage.removeItem(this.appliedCouponKey);
        this.updateUI();
    },

    addItem(productId, qty = 1) {
        const product = window.getProductById ? window.getProductById(productId) : null;
        if (!product) return false;

        let items = this.getItems();
        const existing = items.find(item => item.id === productId);

        if (existing) {
            existing.qty += qty;
        } else {
            items.push({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.images[0],
                categoryName: product.categoryName,
                artisanName: product.artisan.name,
                qty: qty
            });
        }

        this.saveItems(items);
        this.openDrawer();
        if (window.showToast) {
            window.showToast(`Added "${product.name}" to your cart!`);
        }
        return true;
    },

    updateQty(productId, newQty) {
        let items = this.getItems();
        if (newQty <= 0) {
            this.removeItem(productId);
            return;
        }
        const item = items.find(i => i.id === productId);
        if (item) {
            item.qty = newQty;
            this.saveItems(items);
        }
    },

    removeItem(productId) {
        let items = this.getItems().filter(i => i.id !== productId);
        this.saveItems(items);
        if (window.showToast) {
            window.showToast("Item removed from cart");
        }
    },

    clearCart() {
        localStorage.removeItem(this.key);
        localStorage.removeItem(this.appliedCouponKey);
        this.updateUI();
    },

    getCount() {
        return this.getItems().reduce((acc, item) => acc + item.qty, 0);
    },

    getSubtotal() {
        return this.getItems().reduce((acc, item) => acc + (item.price * item.qty), 0);
    },

    getCalculations() {
        const subtotal = this.getSubtotal();
        const coupon = this.getAppliedCoupon();
        let discount = 0;

        if (coupon && subtotal >= coupon.minSpend) {
            discount = Math.round((subtotal * coupon.discountPercent) / 100);
        } else if (coupon) {
            // Expire coupon if subtotal fell below threshold
            this.removeCoupon();
        }

        const isFreeShipping = subtotal >= CONFIG.freeShippingThreshold || subtotal === 0;
        const shipping = isFreeShipping ? 0 : CONFIG.standardShippingFee;
        const total = Math.max(0, subtotal - discount + shipping);

        return {
            subtotal,
            discount,
            shipping,
            isFreeShipping,
            total,
            coupon
        };
    },

    openDrawer() {
        const drawer = document.getElementById("cartDrawer");
        const overlay = document.getElementById("cartOverlay");
        if (drawer && overlay) {
            drawer.classList.add("active");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    },

    closeDrawer() {
        const drawer = document.getElementById("cartDrawer");
        const overlay = document.getElementById("cartOverlay");
        if (drawer && overlay) {
            drawer.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }
    },

    updateUI() {
        // Update all badge counts
        const count = this.getCount();
        document.querySelectorAll(".cart-count-badge").forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? "flex" : "none";
        });

        // Update Drawer Content
        const items = this.getItems();
        const calcs = this.getCalculations();
        const bodyEl = document.getElementById("cartDrawerItems");
        const footerEl = document.getElementById("cartDrawerFooter");
        const shippingBarEl = document.getElementById("cartShippingProgress");

        if (shippingBarEl) {
            const threshold = CONFIG.freeShippingThreshold;
            const diff = threshold - calcs.subtotal;
            const pct = Math.min(100, (calcs.subtotal / threshold) * 100);

            if (calcs.subtotal === 0) {
                shippingBarEl.innerHTML = `Add authentic handicrafts to unlock <strong>Free Shipping</strong> above ${CONFIG.currencySymbol}${threshold}!`;
            } else if (diff > 0) {
                shippingBarEl.innerHTML = `
                    <div>Add <strong>${CONFIG.currencySymbol}${diff}</strong> more to qualify for <strong>FREE Shipping!</strong></div>
                    <div class="shipping-progress-track"><div class="shipping-progress-fill" style="width: ${pct}%"></div></div>
                `;
            } else {
                shippingBarEl.innerHTML = `
                    <div style="color: var(--success); font-weight: 700;">🎉 Congratulations! You have unlocked FREE Pan-India Shipping!</div>
                    <div class="shipping-progress-track"><div class="shipping-progress-fill" style="width: 100%; background: var(--success);"></div></div>
                `;
            }
        }

        if (bodyEl) {
            if (items.length === 0) {
                bodyEl.innerHTML = `
                    <div class="cart-empty-state">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; color: #b5ad9e;">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <p style="font-weight: 600; color: var(--secondary); margin-bottom: 0.5rem;">Your shopping cart is empty</p>
                        <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">Discover magnificent brassware, folk paintings, blue pottery and more directly from artisans.</p>
                        <a href="shop.html" class="btn btn-primary btn-sm" onclick="Cart.closeDrawer()">Explore Collections</a>
                    </div>
                `;
                if (footerEl) footerEl.style.display = "none";
            } else {
                if (footerEl) footerEl.style.display = "block";
                bodyEl.innerHTML = items.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=150&q=80'">
                        <div class="cart-item-details">
                            <h4 class="cart-item-title"><a href="product.html?id=${item.id}">${item.name}</a></h4>
                            <div class="cart-item-artisan">Artisan: ${item.artisanName}</div>
                            <div class="cart-item-price-row">
                                <div class="qty-control">
                                    <button class="qty-btn" onclick="Cart.updateQty('${item.id}', ${item.qty - 1})">-</button>
                                    <span class="qty-val">${item.qty}</span>
                                    <button class="qty-btn" onclick="Cart.updateQty('${item.id}', ${item.qty + 1})">+</button>
                                </div>
                                <div style="font-weight: 700; color: var(--secondary);">
                                    ${CONFIG.currencySymbol}${(item.price * item.qty).toLocaleString()}
                                </div>
                                <button class="cart-item-remove" onclick="Cart.removeItem('${item.id}')" title="Remove item">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join("");

                if (footerEl) {
                    footerEl.innerHTML = `
                        <div class="cart-summary-line">
                            <span>Subtotal</span>
                            <span>${CONFIG.currencySymbol}${calcs.subtotal.toLocaleString()}</span>
                        </div>
                        ${calcs.discount > 0 ? `
                            <div class="cart-summary-line" style="color: var(--success);">
                                <span>Discount (${calcs.coupon.code})</span>
                                <span>-${CONFIG.currencySymbol}${calcs.discount.toLocaleString()}</span>
                            </div>
                        ` : ''}
                        <div class="cart-summary-line">
                            <span>Shipping</span>
                            <span>${calcs.isFreeShipping ? '<span style="color: var(--success); font-weight:700;">FREE</span>' : CONFIG.currencySymbol + calcs.shipping}</span>
                        </div>
                        <div class="cart-total-line">
                            <span>Estimated Total</span>
                            <span>${CONFIG.currencySymbol}${calcs.total.toLocaleString()}</span>
                        </div>
                        <div class="cart-actions">
                            <a href="checkout.html" class="btn btn-primary" style="width: 100%;">
                                Proceed to Checkout
                            </a>
                            <a href="cart.html" class="btn btn-outline" style="width: 100%; padding: 0.65rem;">
                                View Full Cart & Offers
                            </a>
                        </div>
                    `;
                }
            }
        }

        // Trigger custom event so cart page or checkout page updates automatically
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { items, calcs } }));
    }
};

window.Cart = Cart;
document.addEventListener("DOMContentLoaded", () => {
    Cart.updateUI();
});
