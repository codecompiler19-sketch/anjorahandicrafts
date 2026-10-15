/**
 * Anjora Handicrafts - Checkout & Razorpay Integration
 * Supports Razorpay Standard Checkout SDK, customizable API Key,
 * simulated sandbox testing mode, and WhatsApp order dispatch.
 */

const Checkout = {
    init() {
        this.renderOrderReview();
        this.bindEvents();
        this.loadRazorpayScript();

        // Listen for cart changes
        window.addEventListener("cartUpdated", () => {
            this.renderOrderReview();
        });
    },

    loadRazorpayScript() {
        if (!document.getElementById("razorpay-sdk")) {
            const script = document.createElement("script");
            script.id = "razorpay-sdk";
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.head.appendChild(script);
        }
    },

    renderOrderReview() {
        const items = Cart.getItems();
        const calcs = Cart.getCalculations();
        const container = document.getElementById("checkoutOrderItems");
        const totalsContainer = document.getElementById("checkoutTotals");

        if (!container || !totalsContainer) return;

        if (items.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding: 2rem 0;">
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">Your shopping cart is currently empty.</p>
                    <a href="shop.html" class="btn btn-primary btn-sm">Return to Shop</a>
                </div>
            `;
            const submitBtn = document.getElementById("btnProceedPayment");
            if (submitBtn) submitBtn.disabled = true;
            return;
        }

        container.innerHTML = items.map(item => `
            <div style="display: flex; align-items: center; gap: 1rem; padding: 0.85rem 0; border-bottom: 1px solid var(--border-color);">
                <img src="${item.image}" alt="${item.name}" style="width: 54px; height: 54px; object-fit: cover; border-radius: var(--radius-sm);">
                <div style="flex: 1;">
                    <div style="font-size: 0.9rem; font-weight: 600; color: var(--secondary);">${item.name}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">Qty: ${item.qty} × ${CONFIG.currencySymbol}${item.price.toLocaleString()}</div>
                </div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--secondary);">
                    ${CONFIG.currencySymbol}${(item.price * item.qty).toLocaleString()}
                </div>
            </div>
        `).join("");

        totalsContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-muted);">
                <span>Subtotal</span>
                <span>${CONFIG.currencySymbol}${calcs.subtotal.toLocaleString()}</span>
            </div>
            ${calcs.discount > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--success); font-weight: 600;">
                    <span>Coupon Discount (${calcs.coupon.code})</span>
                    <span>-${CONFIG.currencySymbol}${calcs.discount.toLocaleString()}</span>
                </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.9rem; color: var(--text-muted);">
                <span>Pan-India Shipping</span>
                <span>${calcs.isFreeShipping ? '<strong style="color: var(--success)">FREE</strong>' : CONFIG.currencySymbol + calcs.shipping}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; color: var(--secondary); padding-top: 0.75rem; border-top: 1px dashed var(--border-color); margin-top: 0.5rem;">
                <span>Total Payable</span>
                <span>${CONFIG.currencySymbol}${calcs.total.toLocaleString()}</span>
            </div>
        `;

        // Update Razorpay Key notice badge
        const keyNotice = document.getElementById("razorpayKeyNotice");
        if (keyNotice) {
            const currentKey = localStorage.getItem("custom_razorpay_key") || CONFIG.razorpay.keyId;
            const isConfigured = currentKey && !currentKey.includes("placeholder");
            keyNotice.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:space-between; font-size: 0.8rem; background: ${isConfigured ? '#e8f5e9' : '#fff8e1'}; padding: 0.65rem 1rem; border-radius: var(--radius-sm); border: 1px solid ${isConfigured ? '#c8e6c9' : '#ffe082'}; margin-bottom: 1.25rem;">
                    <div>
                        <strong>Razorpay Status:</strong> ${isConfigured ? `Active Key (${currentKey.substring(0, 12)}...)` : 'Test/Demo Mode'}
                    </div>
                    <button type="button" onclick="Checkout.openKeyConfigModal()" style="color: var(--primary); font-weight: 700; text-decoration: underline; font-size: 0.8rem;">
                        ${isConfigured ? 'Change Key' : 'Configure Key'}
                    </button>
                </div>
            `;
        }
    },

    bindEvents() {
        const checkoutForm = document.getElementById("checkoutForm");
        if (checkoutForm) {
            checkoutForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.processPayment();
            });
        }

        const couponForm = document.getElementById("checkoutCouponForm");
        if (couponForm) {
            couponForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const codeInput = document.getElementById("checkoutCouponCode");
                if (codeInput && codeInput.value) {
                    const res = Cart.applyCoupon(codeInput.value);
                    if (res.success) {
                        showToast(res.message, "success");
                    } else {
                        showToast(res.message, "danger");
                    }
                }
            });
        }
    },

    getFormData() {
        return {
            fullName: document.getElementById("custName")?.value.trim(),
            email: document.getElementById("custEmail")?.value.trim(),
            phone: document.getElementById("custPhone")?.value.trim(),
            address: document.getElementById("custAddress")?.value.trim(),
            city: document.getElementById("custCity")?.value.trim(),
            state: document.getElementById("custState")?.value.trim(),
            pincode: document.getElementById("custPincode")?.value.trim(),
            notes: document.getElementById("custNotes")?.value.trim()
        };
    },

    validateCustomerData(data) {
        if (!data.fullName) return "Please enter your full name.";
        if (!data.phone || data.phone.length < 10) return "Please enter a valid 10-digit mobile number.";
        if (!data.email || !data.email.includes("@")) return "Please enter a valid email address.";
        if (!data.address) return "Please enter your complete delivery address.";
        if (!data.city) return "Please enter your city.";
        if (!data.state) return "Please enter your state.";
        if (!data.pincode || data.pincode.length < 6) return "Please enter a valid 6-digit PIN code.";
        return null;
    },

    processPayment() {
        const customer = this.getFormData();
        const error = this.validateCustomerData(customer);
        if (error) {
            showToast(error, "danger");
            return;
        }

        const items = Cart.getItems();
        if (items.length === 0) {
            showToast("Your cart is empty!", "danger");
            return;
        }

        const calcs = Cart.getCalculations();
        const orderId = "ANJ-" + Math.floor(100000 + Math.random() * 900000);
        const razorpayKey = localStorage.getItem("custom_razorpay_key") || CONFIG.razorpay.keyId;

        // Check if real key is configured
        const hasRealKey = razorpayKey && !razorpayKey.includes("placeholder");

        if (hasRealKey && typeof Razorpay !== "undefined") {
            // Launch Real Razorpay Standard Checkout Popup
            const options = {
                key: razorpayKey,
                amount: Math.round(calcs.total * 100), // In Paise
                currency: CONFIG.currency,
                name: CONFIG.storeName,
                description: `Order ${orderId} - Authentic Handicrafts`,
                image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=200&q=80",
                handler: (response) => {
                    this.finalizeOrder({
                        orderId,
                        paymentId: response.razorpay_payment_id,
                        paymentMethod: "Razorpay (Online Card / UPI / Netbanking)",
                        customer,
                        items,
                        calcs
                    });
                },
                prefill: {
                    name: customer.fullName,
                    email: customer.email,
                    contact: customer.phone
                },
                notes: {
                    delivery_address: `${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}`,
                    customer_notes: customer.notes
                },
                theme: {
                    color: CONFIG.razorpay.themeColor
                },
                modal: {
                    ondismiss: () => {
                        showToast("Payment modal was closed.", "info");
                    }
                }
            };

            const rzp = new Razorpay(options);
            rzp.on("payment.failed", (response) => {
                showToast("Payment Failed: " + (response.error.description || "Unknown error"), "danger");
            });
            rzp.open();
        } else {
            // Record the order locally before sending the customer to the payment instructions.
            // This is a browser-side pending order, not a server-confirmed or paid order.
            this.finalizeOrder({
                orderId,
                paymentId: "pending",
                paymentMethod: "Payment pending",
                status: "Awaiting payment",
                customer,
                items,
                calcs,
                redirectDelay: 0
            });
        }
    },

    showSimulatedPaymentModal(orderId, customer, items, calcs) {
        let modal = document.getElementById("simulatedPaymentModal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "simulatedPaymentModal";
            modal.className = "modal-overlay";
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="modal-card" style="max-width: 500px; padding: 2rem;">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 50%; background: #e8f5e9; color: var(--success); margin-bottom: 1rem;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                            <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                    </div>
                    <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem; color: var(--secondary);">Razorpay Sandbox Checkout</h3>
                    <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">
                        You are testing locally. You can simulate an instant successful transaction, enter your own Razorpay Key ID, or place the order via WhatsApp!
                    </p>
                </div>

                <div style="background: var(--cream-bg); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.5rem; font-size: 0.875rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                        <span>Order ID:</span>
                        <strong>${orderId}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                        <span>Amount to Pay:</span>
                        <strong style="color: var(--primary); font-size: 1.1rem;">${CONFIG.currencySymbol}${calcs.total.toLocaleString()}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Customer:</span>
                        <span>${customer.fullName}</span>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <button class="btn btn-primary" onclick="Checkout.confirmSimulatedSuccess('${orderId}')" style="width: 100%;">
                        ✓ Simulate Successful Payment (Demo)
                    </button>
                    <button class="btn btn-outline" onclick="Checkout.orderViaWhatsApp('${orderId}')" style="width: 100%; border-color: #25D366; color: #25D366;">
                        💬 Order via WhatsApp (Direct to Artisan)
                    </button>
                    <button class="btn" onclick="Checkout.openKeyConfigModal()" style="font-size: 0.8rem; color: var(--text-muted); text-decoration: underline;">
                        Enter my official Razorpay Key ID
                    </button>
                    <button class="btn" onclick="Checkout.closeSimulatedModal()" style="font-size: 0.8rem; color: var(--text-muted);">
                        Cancel
                    </button>
                </div>
            </div>
        `;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    },

    closeSimulatedModal() {
        const modal = document.getElementById("simulatedPaymentModal");
        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    },

    confirmSimulatedSuccess(orderId) {
        this.closeSimulatedModal();
        const customer = this.getFormData();
        const items = Cart.getItems();
        const calcs = Cart.getCalculations();

        this.finalizeOrder({
            orderId,
            paymentId: "pay_test_sim_" + Math.random().toString(36).substr(2, 9),
            paymentMethod: "Razorpay Test / Simulated Gateway",
            customer,
            items,
            calcs
        });
    },

    orderViaWhatsApp(orderId) {
        this.closeSimulatedModal();
        const customer = this.getFormData();
        const items = Cart.getItems();
        const calcs = Cart.getCalculations();

        const itemsText = items.map(i => `• ${i.name} (Qty: ${i.qty}) - ${CONFIG.currencySymbol}${i.price * i.qty}`).join("%0A");
        
        const message = `*Namaste Anjora Handicrafts!*%0A%0A` +
            `I would like to place an order:%0A` +
            `*Order ID:* ${orderId}%0A%0A` +
            `*Items Ordered:*%0A${itemsText}%0A%0A` +
            `*Total Payable:* ${CONFIG.currencySymbol}${calcs.total.toLocaleString()}%0A%0A` +
            `*Delivery Address:*%0A` +
            `${customer.fullName}%0A` +
            `${customer.phone}%0A` +
            `${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}%0A%0A` +
            `Please confirm payment and dispatch details.`;

        this.finalizeOrder({
            orderId,
            paymentId: "wa_order_" + Math.random().toString(36).substr(2, 6),
            paymentMethod: "WhatsApp Direct Order",
            customer,
            items,
            calcs,
            redirectDelay: 1000
        });

        const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
        window.open(waUrl, "_blank");
    },

    finalizeOrder(orderData) {
        orderData.orderDate = new Date().toISOString();
        
        // Save order receipt
        localStorage.setItem("anjora_last_order", JSON.stringify(orderData));

        // Append to order history
        try {
            const history = JSON.parse(localStorage.getItem("anjora_order_history")) || [];
            history.unshift(orderData);
            localStorage.setItem("anjora_order_history", JSON.stringify(history.slice(0, 20)));
        } catch (e) {}

        // Clear active cart
        Cart.clearCart();

        // Redirect to success confirmation page
        setTimeout(() => {
            window.location.href = `order-success.html?orderId=${orderData.orderId}`;
        }, orderData.redirectDelay || 300);
    },

    openKeyConfigModal() {
        this.closeSimulatedModal();
        const currentKey = localStorage.getItem("custom_razorpay_key") || (CONFIG.razorpay.keyId.includes("placeholder") ? "" : CONFIG.razorpay.keyId);

        let modal = document.getElementById("keyConfigModal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "keyConfigModal";
            modal.className = "modal-overlay";
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="modal-card" style="max-width: 480px; padding: 2rem;">
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--secondary);">Connect Your Razorpay Gateway</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.5;">
                    Enter your Razorpay Key ID below. You can find this in your <a href="https://dashboard.razorpay.com/" target="_blank" style="color: var(--primary); text-decoration: underline;">Razorpay Dashboard</a> under <em>Settings → API Keys</em>.
                </p>

                <div class="form-group">
                    <label class="form-label">Razorpay Key ID</label>
                    <input type="text" id="customRzpKeyInput" class="form-control" placeholder="e.g. rzp_test_xxxxxxxx or rzp_live_xxxxxxxx" value="${currentKey}">
                    <span style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.35rem;">
                        This key is saved in your browser's local settings for instant live testing. You can also permanently paste it inside <code>assets/js/config.js</code>.
                    </span>
                </div>

                <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem;">
                    <button class="btn btn-outline btn-sm" onclick="Checkout.closeKeyConfigModal()">Cancel</button>
                    <button class="btn btn-primary btn-sm" onclick="Checkout.saveCustomKey()">Save Key</button>
                </div>
            </div>
        `;

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    },

    closeKeyConfigModal() {
        const modal = document.getElementById("keyConfigModal");
        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    },

    saveCustomKey() {
        const input = document.getElementById("customRzpKeyInput");
        if (input) {
            const val = input.value.trim();
            if (val) {
                localStorage.setItem("custom_razorpay_key", val);
                showToast("Razorpay Key ID saved successfully!", "success");
            } else {
                localStorage.removeItem("custom_razorpay_key");
                showToast("Reset to default test simulation mode.", "info");
            }
            this.closeKeyConfigModal();
            this.renderOrderReview();
        }
    }
};

window.Checkout = Checkout;
document.addEventListener("DOMContentLoaded", () => {
    Checkout.init();
});
