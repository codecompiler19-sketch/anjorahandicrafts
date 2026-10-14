# Anjora Handicrafts - E-Commerce Website & Theme

> **Authentic Indian Handmade Heritage & Artisan Crafts**  
> Designed for effortless deployment on **GitHub Pages**, custom domain binding, and seamless **Razorpay Payment Gateway** integration.

---

## 🌟 Key Features

1. **Artisan E-Commerce Aesthetic (Inspired by Hastvikas)**
   - Warm luxury Indian handicraft palette (Artisan Ochre `#d1933f`, Deep Charcoal `#1a1a1a`, Warm Cream `#faf7f2`).
   - Elegant typography with *Cinzel* & *Playfair Display* headings paired with clean, readable body font.
2. **Complete Page Architecture**
   - **`index.html`** - Dynamic Hero Slider, Value Propositions, Craft Categories, Featured Handicrafts, Artisan Spotlight, Bestsellers, Testimonials, Newsletter.
   - **`shop.html`** - Full Catalog with live filters by category, price ranges, sort by price/rating, and keyword search.
   - **`product.html`** - Multi-image gallery with thumbnail switcher, artisan provenance bio, craft specifications table, customer reviews, Add to Cart & Buy Now buttons.
   - **`cart.html`** & **Slide-Over Cart Drawer** - Slide flyout cart + full cart view, quantity adjust, coupon discount system (`WELCOME10`, `HERITAGE15`), free shipping threshold progress bar.
   - **`checkout.html`** - Address form, Razorpay SDK trigger with fallback simulated sandbox mode, order summary.
   - **`order-success.html`** - Printable receipt/tax invoice, order ID, WhatsApp order tracking link.
   - **`about.html`** - Brand story, heritage artisan clusters (Moradabad, Mithila, Jaipur, Saharanpur, Kashmir), fair-trade ethics.
   - **`contact.html`** - Contact form, direct WhatsApp chat concierge, studio address, corporate gifting inquiries.
   - **`privacy-policy.html`** - Complete Privacy Policy complying with e-commerce payment standards.
   - **`terms.html`** - Terms of Service addressing handcrafted organic variations and warranties.
   - **`refund-policy.html`** - Clear shipping timeline, fragile item damage replacement guarantee, and Razorpay refund process.
   - **`wishlist.html`** - Persistent saved items list.
3. **Razorpay Payment Gateway Ready**
   - Official Razorpay Checkout SDK integration (`checkout.razorpay.com`).
   - Supports UPI (GPay, PhonePe, Paytm, BHIM), Credit/Debit Cards, Net Banking, and Wallets.
   - Built-in **Simulated Sandbox Mode** allows immediate checkout testing before entering your Razorpay API Key.
   - Direct WhatsApp order placement button as an alternative checkout option.
4. **GitHub Pages Zero-Config Static Architecture**
   - Pure HTML5/CSS3/JavaScript (No npm build steps required to run).
   - `.nojekyll` and `CNAME` files included for 1-click deployment and custom domain support.

---

## 🚀 How to Test on Localhost

A lightweight HTTP server can be launched using Python:

```bash
# In the project directory:
python -m http.server 8000
```

Then open your browser at:
```
http://localhost:8000
```

---

## 💳 How to Connect Razorpay Payment Gateway

1. Sign up for a free Razorpay account at [https://razorpay.com](https://razorpay.com).
2. Go to **Dashboard** → **Account & Settings** → **API Keys** → **Generate Key**.
3. You will receive a **Key ID** (e.g. `rzp_test_xxxxxxxxxxxx` for test mode or `rzp_live_xxxxxxxxxxxx` for real payments).
4. Open `assets/js/config.js` and paste your Key ID:
   ```javascript
   razorpay: {
       keyId: "rzp_test_YOUR_ACTUAL_KEY_HERE",
       companyName: "Anjora Handicrafts",
       themeColor: "#d1933f"
   }
   ```
5. *Quick Test:* You can also test on the checkout page by clicking **"Configure Key"** directly in your browser.

---

## 🖼️ How to Add Your Own Product Images & Banners

### 1. Adding New Products or Editing Existing Ones
Open `assets/js/products.js`:
- Each product is an object containing `id`, `name`, `price`, `originalPrice`, `category`, `artisan`, `description`, `materials`, `dimensions`, and `images`:
```javascript
{
    id: "prod-013",
    name: "Handcrafted Dhokra Brass Bell",
    category: "brass-metalware",
    categoryName: "Brass & Metalware",
    price: 1450,
    originalPrice: 1950,
    artisan: {
        name: "Shyam Sundar",
        region: "Bastar, Chhattisgarh",
        experience: "20 years in tribal lost-wax craft"
    },
    images: [
        "assets/images/products/dhokra-bell.jpg" // Local file or online URL
    ]
}
```

### 2. Changing Hero Banners
In `index.html` under `<section class="hero-section">`:
- Replace the background image URLs in `style="background-image: url('...');"` with your banner images (saved in `assets/images/banners/`).

### 3. Updating Store Phone, Email, WhatsApp & Address
Open `assets/js/config.js` and modify:
- `whatsappNumber`: Your WhatsApp number with country code (e.g. `919876543210`).
- `contactEmail`: Your business email.
- `address`: Your shop or warehouse address.
- `freeShippingThreshold`: Amount for free shipping (default: ₹999).

---

## 🌐 How to Host on GitHub Pages with Your Custom Domain

### Step 1: Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new), named `AnjoraHandicrafts` (or `yourusername.github.io`).
2. Run these commands inside your project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Anjora Handicrafts store"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages
1. On GitHub, go to your repository **Settings** → **Pages** (on the left sidebar).
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
3. Choose branch: **`main`** / Folder: **`/ (root)`** and click **Save**.
4. Your website will be live in 1-2 minutes at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

### Step 3: Connect Custom Domain (e.g. `anjorahandicrafts.com`)
1. Open the file named `CNAME` in the repository root and replace the text with your domain:
   ```
   anjorahandicrafts.com
   ```
2. In your domain registrar (GoDaddy, Namecheap, Hostinger, Cloudflare):
   - Add four **A Records** pointing `@` to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add a **CNAME Record** pointing `www` to `YOUR_USERNAME.github.io`.
3. In GitHub repo **Settings** → **Pages**, check **Enforce HTTPS**.

---

## 📂 Project Directory Structure

```
AnjoraHandicrafts/
├── index.html              # Home page with banners, categories & featured crafts
├── shop.html               # Catalog with category/price filters and search
├── product.html            # Product details, gallery & specs
├── cart.html               # Shopping cart & coupon management
├── checkout.html           # Razorpay checkout & delivery form
├── order-success.html      # Receipt invoice & order confirmation
├── about.html              # Story of Anjora & artisan empowerment
├── contact.html            # Contact form & WhatsApp concierge
├── privacy-policy.html     # Privacy policy
├── terms.html              # Terms and conditions
├── refund-policy.html      # Shipping, damage claim & returns policy
├── wishlist.html           # Saved items
├── CNAME                   # Custom domain mapping
├── .nojekyll               # GitHub Pages Jekyll bypass
├── README.md               # Complete setup guide
└── assets/
    ├── css/
    │   └── style.css       # Full responsive handicraft theme
    ├── js/
    │   ├── config.js       # Store & Razorpay configuration
    │   ├── products.js     # Catalog dataset & categories
    │   ├── main.js         # Header, search, modals, wishlist
    │   ├── cart.js         # Shopping cart state & drawer
    │   ├── shop.js         # Filter & sort engine
    │   └── checkout.js     # Razorpay & WhatsApp checkout
    └── images/
        ├── banners/        # Hero banner images
        ├── categories/     # Category icons & images
        └── products/       # Product photography
```

---

*Handcrafted with Pride in India for Anjora Handicrafts.*
