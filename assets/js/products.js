/**
 * Anjora Handicrafts - Product Catalog Data
 * You can easily add, edit, or remove products here.
 * Images can be local files (e.g., 'assets/images/products/my-product.jpg') or web URLs.
 */

const CATEGORIES = [
    {
        id: "handmade-accessories",
        name: "Handmade Accessories",
        description: "Handmade crochet hair accessories, floral hair bands, and unique yarn-crafted gifts.",
        image: "data:image/jpeg;base64,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",
        itemCount: 1
    }
]
const PRODUCTS = [
{
        id: "prod-013",
        name: "Hand Made Hair Band – Crochet Sunflower Hair Accessory",
        slug: "hand-made-hair-band-crochet-sunflower",
        category: "handmade-accessories",
        categoryName: "Handmade Accessories",
        price: 399,
        originalPrice: 499,
        rating: 5.0,
        reviewCount: 0,
        badge: "Handmade",
        featured: false,
        trending: true,
        artisan: {
            name: "Anjora Handicrafts",
            region: "India",
            experience: "Handcrafted crochet design"
        },
        shortDesc: "A cheerful crochet sunflower hair accessory in golden orange, chocolate brown, and olive green yarn, perfect for adding a handmade floral touch to everyday hairstyles and gifting.",
        description: "Add a sunny handmade accent to your look with this crochet sunflower hair accessory from Anjora Handicrafts. The design features textured golden-orange petals, a rich brown flower centre, and olive-green leaves and stems, carefully arranged to create a charming floral finish. Its warm colours pair beautifully with casual outfits, festive looks, and thoughtful handmade gifts. Style it for daily wear, celebrations, birthdays, or as a small gift for someone who loves flowers and yarn crafts. Each piece has a distinctive handmade character. Please check the product photos for the exact design and colours. As this is a yarn-crafted item, keep it dry and store it away from sharp objects to help preserve its texture.",
        materials: "Crochet yarn in orange, brown, and olive green (exact fibre composition not specified)",
        dimensions: "Please confirm measurements before ordering",
        weight: "Lightweight; exact weight not specified",
        stock: 10,
        images: ["data:image/jpeg;base64,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"],
        tags: ["hand made hair band", "crochet sunflower", "handmade hair accessory", "floral hair accessory", "crochet flower", "yarn craft", "gift for her"]
    }
];

// Helper functions for easy querying
window.CATEGORIES = CATEGORIES;
window.PRODUCTS = PRODUCTS;

window.getProductById = function(id) {
    return PRODUCTS.find(p => p.id === id || p.slug === id) || null;
};

window.getFeaturedProducts = function() {
    return PRODUCTS.filter(p => p.featured);
};

window.getTrendingProducts = function() {
    return PRODUCTS.filter(p => p.trending);
};

window.getProductsByCategory = function(catId) {
    if (!catId || catId === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === catId);
};
