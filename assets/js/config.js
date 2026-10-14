/**
 * Anjora Handicrafts - Global Configuration
 * Easily configure your store information, Razorpay payment gateway credentials,
 * WhatsApp ordering, and shipping settings here.
 */

const CONFIG = {
    // Brand Information
    storeName: "Anjora Handicrafts",
    tagline: "Authentic Indian Handmade Heritage & Artisan Crafts",
    contactEmail: "contact@anjorahandicrafts.com",
    contactPhone: "+91 98765 43210",
    whatsappNumber: "919876543210", // With country code, no + or spaces
    address: "Artisan Craft Village, Heritage Lane, Jaipur, Rajasthan 302001, India",
    
    // Currency & Checkout
    currency: "INR",
    currencySymbol: "₹",
    freeShippingThreshold: 999, // Orders above this amount get free shipping
    standardShippingFee: 99,
    taxRate: 0.05, // 5% GST included or calculated
    
    // Razorpay Payment Gateway Settings
    // 1. Sign up for a free Razorpay account at https://razorpay.com/
    // 2. Go to Dashboard -> Settings -> API Keys -> Generate Key
    // 3. Paste your Key ID below (e.g. "rzp_test_..." for testing or "rzp_live_..." for production)
    razorpay: {
        keyId: "rzp_test_placeholder_key", // REPLACE WITH YOUR RAZORPAY KEY ID (e.g., rzp_test_xxxxxxxx)
        companyName: "Anjora Handicrafts",
        themeColor: "#d1933f", // Handicraft Ochre / Gold brand color
        allowSimulationIfKeyMissing: true // Allows full checkout testing even before entering a live key!
    },

    // Available Discount Coupons
    coupons: [
        { code: "WELCOME10", discountPercent: 10, minSpend: 499, description: "10% off on your first order" },
        { code: "HERITAGE15", discountPercent: 15, minSpend: 1999, description: "15% off on orders above ₹1,999" },
        { code: "ANJORA20", discountPercent: 20, minSpend: 3999, description: "20% off on royal master collection" }
    ],

    // Social Media Links
    social: {
        instagram: "https://instagram.com/",
        facebook: "https://facebook.com/",
        pinterest: "https://pinterest.com/",
        youtube: "https://youtube.com/"
    }
};

// Make accessible globally
window.CONFIG = CONFIG;
