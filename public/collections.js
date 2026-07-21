/**
 * Ayurdhara Divya Shakti - Collections JS
 * Handles filtering, sorting, view toggles, and interactions for the collections page.
 */

function initCollections() {
    // --- 1. Intersection Observer for Reveals ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    // --- State & DOM Elements ---
    const products = Array.from(document.querySelectorAll('.col-product-card'));
    const grid = document.querySelector('.product-grid-collection');
    const emptyState = document.querySelector('.collection-empty');
    
    const categoryPills = document.querySelectorAll('.category-pill');
    const searchInput = document.getElementById('toolbar-search');
    const sortSelect = document.getElementById('toolbar-sort');
    
    const filterCheckboxes = document.querySelectorAll('.filter-sidebar input[type="checkbox"]');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    
    const productCountDisplay = document.getElementById('product-count-display');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadMoreItems = document.querySelectorAll('.load-more-item');

    let currentCategory = 'all';
    let isLoadMoreClicked = false;

    // --- Helper: Debounce ---
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    // --- Helper: Update Product Count ---
    function updateProductCount() {
        if (!productCountDisplay) return;
        const visibleProducts = products.filter(p => !p.classList.contains('hidden'));
        productCountDisplay.textContent = visibleProducts.length;
    }

    // --- Helper: Show/Hide Empty State ---
    function showEmptyState(show) {
        if (!emptyState) return;
        if (show) {
            emptyState.classList.add('visible');
            if (grid) grid.style.display = 'none';
        } else {
            emptyState.classList.remove('visible');
            if (grid) grid.style.display = '';
        }
    }

    // --- 2. Master Filter Function ---
    function applyAllFilters() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const minPrice = priceMin && priceMin.value ? parseFloat(priceMin.value) : 0;
        const maxPrice = priceMax && priceMax.value ? parseFloat(priceMax.value) : Infinity;
        
        // Gather checked goals
        const checkedGoals = Array.from(filterCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        let visibleCount = 0;

        products.forEach(product => {
            const category = product.getAttribute('data-category') || '';
            const name = product.getAttribute('data-name') ? product.getAttribute('data-name').toLowerCase() : '';
            const price = parseFloat(product.getAttribute('data-price') || 0);
            const goals = (product.getAttribute('data-goals') || '').split(' ');
            
            // Category check
            const categoryMatch = currentCategory === 'all' || category === currentCategory;
            
            // Search check
            const searchMatch = !searchTerm || name.includes(searchTerm);
            
            // Price check
            const priceMatch = price >= minPrice && price <= maxPrice;
            
            // Goals check (match ANY checked goal, or if none checked, it's a match)
            const goalsMatch = checkedGoals.length === 0 || checkedGoals.some(goal => goals.includes(goal));
            
            // Load more check
            const loadMoreMatch = isLoadMoreClicked || !product.classList.contains('load-more-item');

            if (categoryMatch && searchMatch && priceMatch && goalsMatch && loadMoreMatch) {
                product.classList.remove('hidden');
                product.style.display = '';
                visibleCount++;
            } else {
                product.classList.add('hidden');
                product.style.display = 'none';
            }
        });

        // Apply sort to currently visible items
        applySort();
        
        showEmptyState(visibleCount === 0);
        updateProductCount();

        // Update load more text or hide it
        const loadMoreContainer = document.querySelector('.collection-load-more');
        const loadMoreCount = document.querySelector('.load-more-count');
        if (loadMoreContainer) {
            if (isLoadMoreClicked || visibleCount === 0) {
                loadMoreContainer.style.display = 'none';
            } else {
                loadMoreContainer.style.display = '';
                if (loadMoreCount) {
                    loadMoreCount.textContent = `Showing ${visibleCount} of ${products.length} products`;
                }
            }
        }
    }

    // --- 3. Sorting ---
    function applySort() {
        if (!sortSelect || !grid) return;
        
        const sortValue = sortSelect.value;
        const visibleProducts = products.filter(p => !p.classList.contains('hidden'));
        
        visibleProducts.sort((a, b) => {
            if (sortValue === 'price-low') {
                return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
            } else if (sortValue === 'price-high') {
                return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
            } else if (sortValue === 'rating') {
                return parseFloat(b.getAttribute('data-rating') || 0) - parseFloat(a.getAttribute('data-rating') || 0);
            } else if (sortValue === 'newest') {
                const aNew = parseInt(a.getAttribute('data-newest') || 0);
                const bNew = parseInt(b.getAttribute('data-newest') || 0);
                return bNew - aNew; 
            } else {
                // Default / featured: rely on original index
                return products.indexOf(a) - products.indexOf(b);
            }
        });
        
        // Re-append sorted elements
        visibleProducts.forEach(product => grid.appendChild(product));
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', applySort);
    }

    // --- 4. Event Listeners for Filters ---
    
    // Category Pills
    categoryPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            categoryPills.forEach(p => p.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            currentCategory = e.currentTarget.getAttribute('data-category') || 'all';
            
            if (grid) {
                grid.classList.add('fade-transition');
                setTimeout(() => grid.classList.remove('fade-transition'), 300);
            }
            
            applyAllFilters();
        });
    });

    // Search
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            applyAllFilters();
        }, 300));
    }

    // Checkboxes
    filterCheckboxes.forEach(cb => {
        cb.addEventListener('change', applyAllFilters);
    });

    // Price
    if (priceMin) priceMin.addEventListener('change', applyAllFilters);
    if (priceMax) priceMax.addEventListener('change', applyAllFilters);


    // --- 5. Filter Sidebar Toggle ---
    const filterHeaders = document.querySelectorAll('.filter-group-header');
    filterHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const group = header.closest('.filter-group');
            if (group) {
                group.classList.toggle('collapsed');
            }
        });
    });


    // --- 6. Mobile Filter Drawer ---
    const filterBtn = document.querySelector('.toolbar-filter-btn');
    const filterDrawer = document.getElementById('filter-drawer-overlay');
    const filterClose = document.getElementById('filter-drawer-close');
    const filterApply = document.getElementById('filter-drawer-apply');
    const filterReset = document.getElementById('filter-drawer-reset');

    function openFilterDrawer() {
        if (filterDrawer) {
            filterDrawer.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFilterDrawer() {
        if (filterDrawer) {
            filterDrawer.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (filterBtn) filterBtn.addEventListener('click', openFilterDrawer);
    if (filterClose) filterClose.addEventListener('click', closeFilterDrawer);
    if (filterDrawer) {
        filterDrawer.addEventListener('click', (e) => {
            if (e.target === filterDrawer) {
                closeFilterDrawer();
            }
        });
    }

    if (filterApply) {
        filterApply.addEventListener('click', () => {
            applyAllFilters();
            closeFilterDrawer();
        });
    }

    if (filterReset) {
        filterReset.addEventListener('click', () => {
            clearAllFilters();
            closeFilterDrawer();
        });
    }


    // --- 7. View Toggle ---
    const viewBtns = document.querySelectorAll('.toolbar-view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            viewBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            const viewType = e.currentTarget.getAttribute('data-view');
            if (grid) {
                if (viewType === 'compact') {
                    grid.classList.add('view-compact');
                } else {
                    grid.classList.remove('view-compact');
                }
            }
        });
    });


    // --- 8. Load More ---
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            isLoadMoreClicked = true;
            applyAllFilters();
        });
    }


    // --- 9. Variant Selection ---
    const variantPills = document.querySelectorAll('.variant-pill');
    variantPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove active from siblings
            const parent = e.currentTarget.closest('.col-card-variants');
            if (parent) {
                parent.querySelectorAll('.variant-pill').forEach(p => p.classList.remove('active'));
            }
            e.currentTarget.classList.add('active');
            
            // Get data
            const price = e.currentTarget.getAttribute('data-price');
            const mrp = e.currentTarget.getAttribute('data-mrp');
            const imgSrc = e.currentTarget.getAttribute('data-img');
            
            // Update Card
            const card = e.currentTarget.closest('.col-product-card');
            if (card) {
                // Update sorting data attribute
                card.setAttribute('data-price', price);
                
                // Update DOM elements
                const priceEl = card.querySelector('.col-card-price');
                const mrpEl = card.querySelector('.col-card-original-price');
                const discountEl = card.querySelector('.col-card-discount');
                const imgEl = card.querySelector('.product-main-img');
                
                if (priceEl) priceEl.textContent = '₹' + price;
                if (mrpEl) mrpEl.textContent = '₹' + mrp;
                
                if (discountEl && mrp && price) {
                    const discount = Math.round(((parseInt(mrp) - parseInt(price)) / parseInt(mrp)) * 100);
                    discountEl.textContent = `Save ${discount}%`;
                }
                
                if (imgEl && imgSrc) {
                    imgEl.src = imgSrc;
                }
            }
        });
    });

    // --- 10. Wishlist Toggle ---
    const wishlistBtns = document.querySelectorAll('.col-card-wishlist');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.classList.toggle('active');
        });
    });


    // --- 10. Sticky Toolbar Shadow ---
    const toolbar = document.querySelector('.collection-toolbar');
    if (toolbar) {
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 300) {
                toolbar.classList.add('scrolled');
            } else {
                toolbar.classList.remove('scrolled');
            }
        }, 50));
    }


    // --- 11. Mobile Nav ---
    const navToggle = document.getElementById('nav-toggle');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const navClose = document.getElementById('nav-close');

    if (navToggle && mobileNavOverlay) {
        navToggle.addEventListener('click', () => {
            mobileNavOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (navClose && mobileNavOverlay) {
        navClose.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }


    // --- 12. Clear All Filters ---
    const clearFilterBtns = document.querySelectorAll('.filter-clear-btn, .collection-empty-reset');
    
    function clearAllFilters() {
        categoryPills.forEach(p => p.classList.remove('active'));
        const allPill = Array.from(categoryPills).find(p => p.getAttribute('data-category') === 'all');
        if (allPill) allPill.classList.add('active');
        currentCategory = 'all';

        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'featured';

        filterCheckboxes.forEach(cb => cb.checked = false);

        if (priceMin) priceMin.value = '';
        if (priceMax) priceMax.value = '';

        applyAllFilters();
    }

    clearFilterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            clearAllFilters();
        });
    });

    // Initialize
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    const categoryParam = urlParams.get('category');
    
    let needsFilter = false;

    if (q && searchInput) {
        searchInput.value = q;
        needsFilter = true;
    }
    
    if (categoryParam) {
        categoryPills.forEach(p => p.classList.remove('active'));
        const activePill = Array.from(categoryPills).find(p => p.getAttribute('data-category') === categoryParam);
        if (activePill) {
            activePill.classList.add('active');
        }
        currentCategory = categoryParam;
        needsFilter = true;
    }

    if (needsFilter) {
        applyAllFilters();
    } else {
        updateProductCount();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollections);
} else {
    initCollections();
}
