/**
 * Anjora Handicrafts - Shop & Catalog Filtering Script
 */

const Shop = {
    state: {
        category: "all",
        priceRange: "all",
        sortBy: "featured",
        searchQuery: "",
        onlyInStock: false
    },

    init() {
        this.parseURLParams();
        this.renderCategoryFilters();
        this.bindEvents();
        this.filterAndRender();
    },

    parseURLParams() {
        const params = new URLSearchParams(window.location.search);
        if (params.has("category")) {
            this.state.category = params.get("category");
        }
        if (params.has("search") || params.has("q")) {
            this.state.searchQuery = (params.get("search") || params.get("q")).toLowerCase();
            const shopSearchInput = document.getElementById("shopSearchInput");
            if (shopSearchInput) shopSearchInput.value = this.state.searchQuery;
        }
    },

    renderCategoryFilters() {
        const listEl = document.getElementById("categoryFilterList");
        if (!listEl) return;

        const totalAll = PRODUCTS.length;

        let html = `
            <li>
                <label class="filter-label">
                    <input type="radio" name="catFilter" value="all" ${this.state.category === 'all' ? 'checked' : ''}>
                    <span>All Collections (${totalAll})</span>
                </label>
            </li>
        `;

        CATEGORIES.forEach(cat => {
            const count = PRODUCTS.filter(p => p.category === cat.id).length;
            const checked = this.state.category === cat.id ? 'checked' : '';
            html += `
                <li>
                    <label class="filter-label">
                        <input type="radio" name="catFilter" value="${cat.id}" ${checked}>
                        <span>${cat.name} (${count})</span>
                    </label>
                </li>
            `;
        });

        listEl.innerHTML = html;
    },

    bindEvents() {
        // Category radio change
        const catList = document.getElementById("categoryFilterList");
        if (catList) {
            catList.addEventListener("change", (e) => {
                if (e.target.name === "catFilter") {
                    this.state.category = e.target.value;
                    this.filterAndRender();
                }
            });
        }

        // Price range radios
        const priceList = document.getElementById("priceFilterList");
        if (priceList) {
            priceList.addEventListener("change", (e) => {
                if (e.target.name === "priceFilter") {
                    this.state.priceRange = e.target.value;
                    this.filterAndRender();
                }
            });
        }

        // Sort select dropdown
        const sortSelect = document.getElementById("shopSortSelect");
        if (sortSelect) {
            sortSelect.addEventListener("change", (e) => {
                this.state.sortBy = e.target.value;
                this.filterAndRender();
            });
        }

        // Shop search input
        const shopSearch = document.getElementById("shopSearchInput");
        if (shopSearch) {
            shopSearch.addEventListener("input", (e) => {
                this.state.searchQuery = e.target.value.trim().toLowerCase();
                this.filterAndRender();
            });
        }
    },

    filterAndRender() {
        let results = [...PRODUCTS];

        // Category filter
        if (this.state.category !== "all") {
            results = results.filter(p => p.category === this.state.category);
        }

        // Search query
        if (this.state.searchQuery) {
            const q = this.state.searchQuery;
            results = results.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.categoryName.toLowerCase().includes(q) ||
                p.artisan.name.toLowerCase().includes(q) ||
                p.artisan.region.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q))
            );
        }

        // Price range
        if (this.state.priceRange !== "all") {
            if (this.state.priceRange === "under-1000") {
                results = results.filter(p => p.price < 1000);
            } else if (this.state.priceRange === "1000-2500") {
                results = results.filter(p => p.price >= 1000 && p.price <= 2500);
            } else if (this.state.priceRange === "2500-5000") {
                results = results.filter(p => p.price > 2500 && p.price <= 5000);
            } else if (this.state.priceRange === "above-5000") {
                results = results.filter(p => p.price > 5000);
            }
        }

        // Sort
        if (this.state.sortBy === "price-low") {
            results.sort((a, b) => a.price - b.price);
        } else if (this.state.sortBy === "price-high") {
            results.sort((a, b) => b.price - a.price);
        } else if (this.state.sortBy === "rating") {
            results.sort((a, b) => b.rating - a.rating);
        } else if (this.state.sortBy === "bestsellers") {
            results.sort((a, b) => b.reviewCount - a.reviewCount);
        }

        // Render to grid
        const grid = document.getElementById("shopProductsGrid");
        const countDisplay = document.getElementById("shopResultsCount");

        if (countDisplay) {
            countDisplay.textContent = `Showing ${results.length} handcrafted items`;
        }

        if (grid) {
            if (results.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="1.5" style="margin-bottom:1rem;">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <h3 style="font-size: 1.35rem; color: var(--secondary); margin-bottom: 0.5rem;">No products match your criteria</h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">Try adjusting your filters, clearing your search keywords, or browse all categories.</p>
                        <button class="btn btn-outline-gold btn-sm" onclick="Shop.resetFilters()">Clear All Filters</button>
                    </div>
                `;
            } else {
                grid.innerHTML = results.map(p => window.renderProductCard(p)).join("");
            }
        }

        if (window.Wishlist) {
            window.Wishlist.updateUI();
        }
    },

    resetFilters() {
        this.state = {
            category: "all",
            priceRange: "all",
            sortBy: "featured",
            searchQuery: "",
            onlyInStock: false
        };

        const catRadio = document.querySelector('input[name="catFilter"][value="all"]');
        if (catRadio) catRadio.checked = true;

        const priceRadio = document.querySelector('input[name="priceFilter"][value="all"]');
        if (priceRadio) priceRadio.checked = true;

        const searchInput = document.getElementById("shopSearchInput");
        if (searchInput) searchInput.value = "";

        const sortSelect = document.getElementById("shopSortSelect");
        if (sortSelect) sortSelect.value = "featured";

        this.filterAndRender();
    }
};

window.Shop = Shop;
document.addEventListener("DOMContentLoaded", () => {
    Shop.init();
});
