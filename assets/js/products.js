/**
 * Anjora Handicrafts - Product Catalog Data
 * You can easily add, edit, or remove products here.
 * Images can be local files (e.g., 'assets/images/products/my-product.jpg') or web URLs.
 */

const CATEGORIES = [
    {
        id: "brass-metalware",
        name: "Brass & Metalware",
        description: "Hand-cast brass idols, traditional oil lamps, urlis, and Kashmiri engraved copperware.",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
        itemCount: 8
    },
    {
        id: "paintings-art",
        name: "Folk Paintings & Art",
        description: "Original Madhubani, Pichwai, Warli, and Pattachitra masterworks on handmade canvas.",
        image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        itemCount: 6
    },
    {
        id: "wooden-crafts",
        name: "Wooden Carvings",
        description: "Artisan carved Sheesham, Rosewood decor, miniature jharokhas, and heritage chests.",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
        itemCount: 6
    },
    {
        id: "blue-pottery",
        name: "Blue Pottery & Ceramics",
        description: "Famous GI-tagged Jaipur blue pottery with traditional cobalt and turquoise floral motifs.",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
        itemCount: 5
    },
    {
        id: "textiles-handloom",
        name: "Handloom & Textiles",
        description: "Hand block-printed cottons, Kashmiri Pashmina shawls, and Kantha embroidered throws.",
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
        itemCount: 5
    },
    {
        id: "pooja-festive",
        name: "Festive & Pooja Decor",
        description: "Sacred brass diyas, handcrafted lac bangles, pooja hampers, and organic copper thalis.",
        image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80",
        itemCount: 7
    }
];

const PRODUCTS = [
    {
        id: "prod-001",
        name: "Royal Handcrafted Brass Ganesha Idol in Antique Finish",
        slug: "royal-brass-ganesha-idol",
        category: "brass-metalware",
        categoryName: "Brass & Metalware",
        price: 2499,
        originalPrice: 3499,
        rating: 4.9,
        reviewCount: 42,
        badge: "Bestseller",
        featured: true,
        trending: true,
        artisan: {
            name: "Ramu Lal Sonar",
            region: "Moradabad, Uttar Pradesh",
            experience: "25+ years in lost-wax brass casting"
        },
        shortDesc: "Solid brass Ganesha idol hand-carved with intricate ornamental work and natural antique polish.",
        description: "Bring auspicious blessings and regal serenity into your living room or prayer sanctuary with this hand-cast Brass Ganesha idol. Crafted using the centuries-old lost-wax (Dhokra/Cire Perdue) casting technique by master artisans in Moradabad, every curve, adornment, and blessing gesture is finished by hand.",
        materials: "100% Solid Brass with Antique Patina",
        dimensions: "Height: 7.5 inches | Width: 5.2 inches | Depth: 3.8 inches",
        weight: "1.45 kg",
        stock: 12,
        images: [
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["brass", "ganesha", "pooja", "home-decor", "antique"]
    },
    {
        id: "prod-002",
        name: "Authentic Madhubani 'Tree of Life' Handmade Canvas Art",
        slug: "madhubani-tree-of-life-painting",
        category: "paintings-art",
        categoryName: "Folk Paintings & Art",
        price: 3200,
        originalPrice: 4500,
        rating: 5.0,
        reviewCount: 29,
        badge: "GI Heritage",
        featured: true,
        trending: true,
        artisan: {
            name: "Sita Devi & Family",
            region: "Madhubani, Mithila, Bihar",
            experience: "3rd generation Mithila folk artist"
        },
        shortDesc: "Original Mithila painting created using natural twig pens, vegetable dyes, and handmade rice paper.",
        description: "This mesmerizing 'Tree of Life' represents the sacred cosmic connection between earth, wildlife, and heavens. Drawn completely freehand using bamboo nibs and colored with organic plant and mineral pigments.",
        materials: "Handmade Cowdung-Treated Cotton Canvas, Natural Pigments",
        dimensions: "18 x 24 inches (Framed Ready to Hang)",
        weight: "800 grams",
        stock: 7,
        images: [
            "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["painting", "madhubani", "art", "folk", "handmade"]
    },
    {
        id: "prod-003",
        name: "Kashmiri Hand-Engraved Copper Degchi & Samovar Kettle",
        slug: "kashmiri-hand-engraved-copper-degchi",
        category: "brass-metalware",
        categoryName: "Brass & Metalware",
        price: 4999,
        originalPrice: 6500,
        rating: 4.8,
        reviewCount: 18,
        badge: "Artisan Gem",
        featured: true,
        trending: false,
        artisan: {
            name: "Ghulam Mohammad Mir",
            region: "Old Srinagar, Kashmir",
            experience: "35 years of Naqashi engraving"
        },
        shortDesc: "Traditional pure copper utensil hand-hammered and chiselled with intricate Chinar leaf motifs.",
        description: "A showpiece of legendary Kashmiri Naqashi metal craft. Pure copper is hand-hammered and tin-coated inside (Kalai) for authentic food-safe brewing of Kashmiri Kahwa tea or regal table decor.",
        materials: "99.9% Pure Copper, Traditional Tin Plating (Kalai)",
        dimensions: "Diameter: 9 inches | Capacity: 1.8 Liters",
        weight: "1.6 kg",
        stock: 5,
        images: [
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["copper", "kashmir", "degchi", "kitchenware", "antique"]
    },
    {
        id: "prod-004",
        name: "Jaipur Traditional Blue Pottery Floral Table Vase",
        slug: "jaipur-blue-pottery-floral-vase",
        category: "blue-pottery",
        categoryName: "Blue Pottery & Ceramics",
        price: 1350,
        originalPrice: 1899,
        rating: 4.9,
        reviewCount: 36,
        badge: "Craft of Jaipur",
        featured: true,
        trending: true,
        artisan: {
            name: "Kripal Kumbhar",
            region: "Kot Jewar, Jaipur, Rajasthan",
            experience: "Master Craftsman, National Awardee Family"
        },
        shortDesc: "Distinctive quartz-based Jaipur pottery with Persian cobalt and turquoise hand-painted glazes.",
        description: "Unlike traditional clay ceramics, Jaipur Blue Pottery is crafted from a unique mixture of quartz stone powder, powdered glass, and multani mitti, fired only once with vibrant cobalt blues.",
        materials: "Quartz composite, Natural Glaze, Hand-painted cobalt",
        dimensions: "Height: 10 inches | Rim Diameter: 4.5 inches",
        weight: "950 grams",
        stock: 15,
        images: [
            "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["pottery", "jaipur", "blue-pottery", "vase", "ceramic"]
    },
    {
        id: "prod-005",
        name: "Hand-Carved Sheesham Wood Jharokha Wall Mirror Frame",
        slug: "sheesham-wood-jharokha-wall-mirror",
        category: "wooden-crafts",
        categoryName: "Wooden Carvings",
        price: 2899,
        originalPrice: 3999,
        rating: 4.7,
        reviewCount: 22,
        badge: "Royal Rajasthani",
        featured: false,
        trending: true,
        artisan: {
            name: "Bhawani Singh",
            region: "Jodhpur, Rajasthan",
            experience: "Carving palace jali doors for 20+ years"
        },
        shortDesc: "Intricately carved wooden arched window frame inspired by Rajput royal forts and palaces.",
        description: "Handcrafted from seasoned Sheesham (Indian Rosewood) by heritage woodcarvers of Marwar. Features opening shutter doors, delicately latticed jaali work, and a pre-installed looking glass mirror.",
        materials: "Solid Seasoned Sheesham Wood, Brass Hardware, High-clarity Mirror",
        dimensions: "16 x 22 x 2.5 inches",
        weight: "2.8 kg",
        stock: 8,
        images: [
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["wooden", "jharokha", "mirror", "rajasthan", "carving"]
    },
    {
        id: "prod-006",
        name: "Handcrafted Traditional Brass Floating Floral Urli (12 Inch)",
        slug: "handcrafted-brass-floating-urli",
        category: "brass-metalware",
        categoryName: "Brass & Metalware",
        price: 1899,
        originalPrice: 2699,
        rating: 5.0,
        reviewCount: 54,
        badge: "Festive Essential",
        featured: true,
        trending: true,
        artisan: {
            name: "Dinesh Kumar",
            region: "Thanjavur, Tamil Nadu",
            experience: "Temple metal vessel crafter for 19 years"
        },
        shortDesc: "Classic round brass bowl with ornate carved handles for floating flowers, floating diyas, and pooja.",
        description: "A hallmark of Indian festive elegance. Float fresh marigolds, rose petals, and tea lights to welcome guests with positive vibes and sacred serenity during Diwali, housewarmings, or daily entryways.",
        materials: "High-grade Heavy Brass with golden lustre",
        dimensions: "Diameter: 12 inches | Depth: 3.5 inches",
        weight: "1.75 kg",
        stock: 20,
        images: [
            "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["urli", "brass", "pooja", "diwali", "festive"]
    },
    {
        id: "prod-007",
        name: "Dual-Tone Handcrafted Rajasthani Lac Bangles (Set of 4)",
        slug: "dual-tone-rajasthani-lac-bangles",
        category: "pooja-festive",
        categoryName: "Festive & Pooja Decor",
        price: 899,
        originalPrice: 1299,
        rating: 4.8,
        reviewCount: 67,
        badge: "Handmade Lac",
        featured: false,
        trending: true,
        artisan: {
            name: "Mohd. Rafiq & Shagufta",
            region: "Maniharon ka Rasta, Jaipur",
            experience: "Heritage lac artisans for 4 generations"
        },
        shortDesc: "Natural lac bangles heated over coal stoves and embellished with semi-precious stones and micro-crystals.",
        description: "Known for their cultural significance and organic origins, these traditional Rajasthani Lac bangles are handmade with pure lac resin, molded over wooden rods, and adorned with sparkling mirror-work crystals.",
        materials: "Natural Lacquer Resin, Glass crystals, Brass foil",
        dimensions: "Available in standard bangle sizes: 2.4, 2.6, 2.8",
        weight: "180 grams",
        stock: 30,
        images: [
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["lac", "bangles", "jewellery", "rajasthan", "traditional"]
    },
    {
        id: "prod-008",
        name: "Handwoven Kashmiri Pashmina Shawl with Sozni Hand Needlework",
        slug: "kashmiri-pashmina-sozni-shawl",
        category: "textiles-handloom",
        categoryName: "Handloom & Textiles",
        price: 6499,
        originalPrice: 8999,
        rating: 4.9,
        reviewCount: 15,
        badge: "Pure Luxury",
        featured: true,
        trending: false,
        artisan: {
            name: "Bashir Ahmad Wani",
            region: "Pattan, Baramulla, Kashmir",
            experience: "Hand-spinning & needle embroidery master"
        },
        shortDesc: "Ultra-soft genuine Himalayan wool hand-embroidered with micro Sozni needlework across the borders.",
        description: "Known worldwide as the pinnacle of handloom luxury. This shawl takes over 3 weeks of continuous delicate needle stitching by veteran Kashmiri craftsmen using fine silk thread upon ethereal soft wool.",
        materials: "100% Fine Himalayan Wool, Silk Embroidery Threads",
        dimensions: "Length: 2 meters (80 inches) | Width: 40 inches",
        weight: "220 grams",
        stock: 6,
        images: [
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["shawl", "pashmina", "kashmir", "handloom", "textiles"]
    },
    {
        id: "prod-009",
        name: "Sacred Pichwai Cow Under Kadamba Tree Silk Wall Hanging",
        slug: "pichwai-cow-kadamba-tree-wall-hanging",
        category: "paintings-art",
        categoryName: "Folk Paintings & Art",
        price: 2650,
        originalPrice: 3500,
        rating: 4.9,
        reviewCount: 31,
        badge: "Nathdwara Art",
        featured: false,
        trending: true,
        artisan: {
            name: "Govind Sharma",
            region: "Nathdwara, Udaipur, Rajasthan",
            experience: "Devotional temple painter of 22 years"
        },
        shortDesc: "Vibrant temple tapestry depicting the sacred holy Kamdhenu cows amidst lotus blooms andKadamba blossoms.",
        description: "Pichwai is a 400-year-old style of devotional art originating from Nathdwara, Rajasthan. Each canvas is treated with natural sizing and painted with real gold-toned outlines, lush emerald greens, and soft pastels.",
        materials: "Treated Silk Cotton Blend Canvas, Natural Gouache",
        dimensions: "24 x 36 inches",
        weight: "450 grams",
        stock: 10,
        images: [
            "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["pichwai", "art", "rajasthan", "canvas", "devotional"]
    },
    {
        id: "prod-010",
        name: "Hand-carved Elephant Stool in Solid Wood with Brass Inlay",
        slug: "hand-carved-wooden-elephant-stool",
        category: "wooden-crafts",
        categoryName: "Wooden Carvings",
        price: 3450,
        originalPrice: 4800,
        rating: 4.8,
        reviewCount: 19,
        badge: "Heritage Furniture",
        featured: true,
        trending: false,
        artisan: {
            name: "Radhe Shyam Suthar",
            region: "Saharanpur, Uttar Pradesh",
            experience: "Wood sculptor with 30 years experience"
        },
        shortDesc: "Sturdy accent stool hand-chiseled from a single block of wood in the shape of a royal regal elephant.",
        description: "A testament to Saharanpur's world-renowned woodcraft heritage. Embellished with brass Tarkashi inlay on the saddle and finished with warm natural wax polish that reveals the natural grain of seasoned mango wood.",
        materials: "Kiln-dried Solid Mango Wood, Brass wire inlays",
        dimensions: "12 x 10 x 10 inches",
        weight: "3.2 kg",
        stock: 9,
        images: [
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["wooden", "elephant", "furniture", "stool", "carving"]
    },
    {
        id: "prod-011",
        name: "Complete Handcrafted Diwali & Housewarming Pooja Hamper",
        slug: "complete-handcrafted-pooja-hamper",
        category: "pooja-festive",
        categoryName: "Festive & Pooja Decor",
        price: 2199,
        originalPrice: 2999,
        rating: 5.0,
        reviewCount: 78,
        badge: "Gift Box",
        featured: true,
        trending: true,
        artisan: {
            name: "Anjora Artisan Cooperative",
            region: "Varanasi & Jaipur",
            experience: "Craft cluster of 15 women artisans"
        },
        shortDesc: "Deluxe gift box with Brass Peacock Diya, Brass Bell, Kumkum Box, and organic temple incense.",
        description: "The ultimate curated festive hamper celebrating authentic Indian craftsmanship. Includes a heavyweight engraved brass peacock diya, sacred bell with Garuda finial, hand-hammered Sindoor box, and temple-flower based natural dhoop sticks.",
        materials: "Solid Brass Items, Reusable Hand-printed Brocade Gift Box",
        dimensions: "Box size: 14 x 10 x 4 inches",
        weight: "1.9 kg",
        stock: 25,
        images: [
            "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["pooja", "hamper", "gift", "brass", "diya"]
    },
    {
        id: "prod-012",
        name: "Sanganeri Hand Block-Printed Pure Cotton King Dohar Quilt",
        slug: "sanganeri-hand-block-print-dohar",
        category: "textiles-handloom",
        categoryName: "Handloom & Textiles",
        price: 1750,
        originalPrice: 2400,
        rating: 4.8,
        reviewCount: 44,
        badge: "100% Organic",
        featured: false,
        trending: true,
        artisan: {
            name: "Ramswaroop Chhipa",
            region: "Sanganer, Jaipur, Rajasthan",
            experience: "Traditional wooden block printer of 26 years"
        },
        shortDesc: "Three-layered ultra-soft summer AC blanket hand-stamped with carved teakwood printing blocks.",
        description: "Crafted from 100% fine mulmul cotton with a soft flannel core layer. Stamped entirely by hand using carved teak blocks and non-toxic dyes, providing heavenly breathable comfort for Indian summers and air-conditioned rooms.",
        materials: "100% Mulmul Cotton Muslin, Flannel Inner Sheet",
        dimensions: "90 x 108 inches (Standard Double / King)",
        weight: "920 grams",
        stock: 14,
        images: [
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=900&q=80"
        ],
        tags: ["bedding", "dohar", "cotton", "block-print", "handloom"]
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
