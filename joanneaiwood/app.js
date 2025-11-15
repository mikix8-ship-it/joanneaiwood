// Main Application JavaScript
(function() {
    'use strict';

    // Embedded Links Data - works offline without CORS issues
    const LINKS_DATA = {
        "profile": {
            "name": "Joanne Aiwood",
            "tagline": "NYC heart, world soul — AI creator & traveler",
            "avatar": "/assets/avatar.jpg",
            "locale": "en",
            "siteUrl": "https://joanneaiwood.com"
        },
        "featured": [
            {
                "label": "Subscribe on Fanvue",
                "url": "http://www.fanvue.com/love_joanna.a",
                "icon": "fanvue",
                "badge": "Exclusive",
                "dataCampaign": "featured",
                "dataContent": "fanvue_primary"
            },
            {
                "label": "VIP Telegram",
                "url": "https://t.me/+hoBUoJANcsdlMWVk",
                "icon": "telegram",
                "badge": "VIP",
                "dataCampaign": "featured",
                "dataContent": "telegram_vip"
            }
        ],
        "links": [
            {
                "label": "Instagram @joanne_aiwood",
                "url": "https://www.instagram.com/joanne_aiwood",
                "icon": "instagram",
                "dataCampaign": "social",
                "dataContent": "instagram_main"
            },
            {
                "label": "Instagram @j_aiwood",
                "url": "https://www.instagram.com/j_aiwood",
                "icon": "instagram",
                "dataCampaign": "social",
                "dataContent": "instagram_alt"
            },
            {
                "label": "Instagram @jo.aiwood",
                "url": "https://www.instagram.com/jo.aiwood",
                "icon": "instagram",
                "dataCampaign": "social",
                "dataContent": "instagram_third"
            },
            {
                "label": "Buy Me a Coffee",
                "url": "https://buymeacoffee.com/love_joanna.a",
                "icon": "buymeacoffee",
                "dataCampaign": "monetization",
                "dataContent": "buymeacoffee"
            }
        ],
        "latest": {
            "title": "New drop tonight — don't miss it.",
            "url": "http://www.fanvue.com/love_joanna.a"
        }
    };

    const GALLERY_DATA = {
        "items": [],
        "pageSize": 12
    };

    // State Management
    const state = {
        profile: null,
        links: [],
        gallery: [],
        currentPage: 1,
        pageSize: 12,
        currentFilter: 'all',
        allTags: new Set(['all']),
        lightboxIndex: 0
    };

    // DOM Elements
    const elements = {
        featuredLinks: document.getElementById('featuredLinks'),
        mainLinks: document.getElementById('mainLinks'),
        latestUpdate: document.getElementById('latestUpdate'),
        latestLink: document.getElementById('latestLink'),
        galleryGrid: document.getElementById('galleryGrid'),
        filterTags: document.getElementById('filterTags'),
        loadMoreBtn: document.getElementById('loadMoreBtn'),
        lightbox: document.getElementById('lightbox'),
        lightboxImage: document.getElementById('lightboxImage'),
        lightboxTitle: document.getElementById('lightboxTitle'),
        lightboxDescription: document.getElementById('lightboxDescription'),
        lightboxLocation: document.getElementById('lightboxLocation'),
        lightboxDate: document.getElementById('lightboxDate'),
        lightboxClose: document.getElementById('lightboxClose'),
        lightboxPrev: document.getElementById('lightboxPrev'),
        lightboxNext: document.getElementById('lightboxNext'),
        themeToggle: document.getElementById('themeToggle'),
        shareBtn: document.getElementById('shareBtn'),
        qrBtn: document.getElementById('qrBtn'),
        qrModal: document.getElementById('qrModal'),
        qrModalClose: document.getElementById('qrModalClose'),
        adminBtn: document.getElementById('adminBtn')
    };

    // Initialize Application
    async function init() {
        loadTheme();
        await loadData();
        renderLinks();
        renderGallery();
        setupEventListeners();
        checkDeepLink();
        observeLazyImages();
    }

    // Load Theme
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Toggle Theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Embedded Links Data - works offline without CORS issues
    const LINKS_DATA = {
        "profile": {
            "name": "Joanne Aiwood",
            "tagline": "NYC heart, world soul — AI creator & traveler",
            "avatar": "/assets/avatar.jpg",
            "locale": "en",
            "siteUrl": "https://joanneaiwood.com"
        },
        "featured": [
            {
                "label": "Subscribe on Fanvue",
                "url": "http://www.fanvue.com/love_joanna.a",
                "icon": "fanvue",
                "badge": "Exclusive",
                "dataCampaign": "featured",
                "dataContent": "fanvue_primary"
            },
            {
                "label": "VIP Telegram",
                "url": "https://t.me/+hoBUoJANcsdlMWVk",
                "icon": "telegram",
                "badge": "VIP",
                "dataCampaign": "featured",
                "dataContent": "telegram_vip"
            }
        ],
        "links": [
            {
                "label": "Instagram @joanne_aiwood",
                "url": "https://www.instagram.com/joanne_aiwood",
                "icon": "instagram",
                "dataCampaign": "social",
                "dataContent": "instagram_main"
            },
            {
                "label": "Instagram @j_aiwood",
                "url": "https://www.instagram.com/j_aiwood",
                "icon": "instagram",
                "dataCampaign": "social",
                "dataContent": "instagram_alt"
            },
            {
                "label": "Instagram @jo.aiwood",
                "url": "https://www.instagram.com/jo.aiwood",
                "icon": "instagram",
                "dataCampaign": "social",
                "dataContent": "instagram_third"
            },
            {
                "label": "Buy Me a Coffee",
                "url": "https://buymeacoffee.com/love_joanna.a",
                "icon": "buymeacoffee",
                "dataCampaign": "monetization",
                "dataContent": "buymeacoffee"
            }
        ],
        "latest": {
            "title": "New drop tonight — don't miss it.",
            "url": "http://www.fanvue.com/love_joanna.a"
        }
    };

    const GALLERY_DATA = {
        "items": [],
        "pageSize": 12
    };

    // Load Data
    async function loadData() {
        try {
            // Use embedded data
            state.profile = LINKS_DATA.profile;
            state.links = LINKS_DATA;
            state.gallery = GALLERY_DATA.items;
            state.pageSize = GALLERY_DATA.pageSize;
            
            // Try to load gallery from JSON file (optional)
            try {
                const galleryResponse = await fetch('gallery.json');
                const galleryData = await galleryResponse.json();
                state.gallery = galleryData.items || [];
                state.pageSize = galleryData.pageSize || 12;
            } catch (e) {
                // If gallery.json fails to load, use default empty gallery
                console.log('Gallery.json not loaded - using empty gallery');
            }
            
            // Extract tags
            state.gallery.forEach(item => {
                if (item.tags) {
                    item.tags.forEach(tag => state.allTags.add(tag.toLowerCase()));
                }
            });
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // Add UTM Parameters
    function addUTMParams(url, dataCampaign, dataContent) {
        if (url.includes('utm_source=')) return url;
        
        const separator = url.includes('?') ? '&' : '?';
        const utmParams = `utm_source=joanneaiwood.com&utm_medium=linkinbio&utm_campaign=${dataCampaign}&utm_content=${dataContent}`;
        return url + separator + utmParams;
    }

    // Create Link Icon
    function createLinkIcon(iconName) {
        const icons = {
            instagram: `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
            </svg>`,
            telegram: `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.56l-1.63 7.69c-.12.56-.44.7-.9.43l-2.48-1.83-1.2 1.15c-.13.13-.25.25-.5.25l.18-2.53 4.6-4.16c.2-.18-.04-.28-.31-.1l-5.68 3.58-2.45-.77c-.53-.17-.54-.53.11-.79l9.57-3.69c.44-.16.83.11.69.77z"/>
            </svg>`,
            fanvue: `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.5 4.5 10 10 10s10-4.5 10-10V7l-10-5zm0 2.2l8 4v8.8c0 4.4-3.6 8-8 8s-8-3.6-8-8V8.2l8-4zm0 4.8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/>
                <circle cx="12" cy="13" r="2" fill="currentColor"/>
            </svg>`,
            buymeacoffee: `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 8h-1V6c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v10c0 2.97 2.16 5.43 5 5.91V22h6v-.09c2.84-.48 5-2.94 5-5.91h1c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm0 4h-1v-2h1v2zm-9 7c0 .55-.45 1-1 1s-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2z"/>
            </svg>`
        };
        return icons[iconName] || '';
    }

    // Render Links
    function renderLinks() {
        // Featured Links
        if (state.links.featured) {
            elements.featuredLinks.innerHTML = state.links.featured.map(link => {
                const url = addUTMParams(link.url, link.dataCampaign || 'featured', link.dataContent || link.label);
                return `
                    <a href="${url}" class="link-item featured" target="_blank" rel="noopener noreferrer">
                        ${createLinkIcon(link.icon)}
                        <span class="link-text">${link.label}</span>
                        ${link.badge ? `<span class="link-badge">${link.badge}</span>` : ''}
                    </a>
                `;
            }).join('');
        }

        // Main Links
        if (state.links.links) {
            elements.mainLinks.innerHTML = state.links.links.map(link => {
                const url = addUTMParams(link.url, link.dataCampaign || 'social', link.dataContent || link.label);
                return `
                    <a href="${url}" class="link-item" target="_blank" rel="noopener noreferrer">
                        ${createLinkIcon(link.icon)}
                        <span class="link-text">${link.label}</span>
                        ${link.badge ? `<span class="link-badge">${link.badge}</span>` : ''}
                    </a>
                `;
            }).join('');
        }

        // Latest Update
        if (state.links.latest) {
            elements.latestUpdate.style.display = 'block';
            const latestUrl = addUTMParams(
                state.links.latest.url, 
                'latest', 
                'latest_teaser'
            );
            elements.latestLink.href = latestUrl;
            elements.latestLink.querySelector('.latest-text').textContent = state.links.latest.title;
        }
    }

    // Render Filter Tags
    function renderFilterTags() {
        const tagsArray = Array.from(state.allTags).sort();
        elements.filterTags.innerHTML = tagsArray.map(tag => `
            <button class="tag-pill ${tag === state.currentFilter ? 'active' : ''}" 
                    data-tag="${tag}">
                ${tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
        `).join('');

        // Add click handlers
        elements.filterTags.querySelectorAll('.tag-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                state.currentFilter = btn.dataset.tag;
                state.currentPage = 1;
                renderGallery();
                
                // Update active state
                elements.filterTags.querySelectorAll('.tag-pill').forEach(b => 
                    b.classList.remove('active')
                );
                btn.classList.add('active');
            });
        });
    }

    // Get Filtered Gallery Items
    function getFilteredItems() {
        if (state.currentFilter === 'all') {
            return state.gallery;
        }
        return state.gallery.filter(item => 
            item.tags && item.tags.some(tag => 
                tag.toLowerCase() === state.currentFilter
            )
        );
    }

    // Render Gallery
    function renderGallery() {
        if (state.allTags.size > 1) {
            renderFilterTags();
        }

        const filteredItems = getFilteredItems();
        const startIndex = 0;
        const endIndex = state.currentPage * state.pageSize;
        const itemsToShow = filteredItems.slice(startIndex, endIndex);

        elements.galleryGrid.innerHTML = itemsToShow.map((item, index) => `
            <figure class="gallery-item" data-index="${index}" data-slug="${item.slug}">
                ${item.blur ? `<div class="gallery-item-placeholder" style="background-image: url('${item.blur}')"></div>` : ''}
                <img 
                    src="${item.blur || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23ddd"/%3E%3C/svg%3E'}"
                    data-src="${item.src || `/assets/gallery/${item.slug}_640.jpg`}"
                    data-srcset="${generateSrcSet(item)}"
                    sizes="(max-width: 640px) 150px, 220px"
                    alt="${item.title || 'Gallery image'}"
                    loading="lazy"
                    width="400"
                    height="400"
                >
                <figcaption class="sr-only">${item.title || 'Gallery image'}</figcaption>
            </figure>
        `).join('');

        // Add click handlers
        elements.galleryGrid.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        // Show/hide load more button
        if (filteredItems.length > endIndex) {
            elements.loadMoreBtn.style.display = 'block';
        } else {
            elements.loadMoreBtn.style.display = 'none';
        }

        // Trigger lazy loading
        observeLazyImages();
    }

    // Generate SrcSet
    function generateSrcSet(item) {
        const slug = item.slug;
        const base = `/assets/gallery/${slug}`;
        const formats = item.formats || ['jpg'];
        
        if (formats.includes('webp')) {
            return `
                ${base}_640.webp 640w,
                ${base}_1024.webp 1024w,
                ${base}_1600.webp 1600w
            `;
        }
        return `
            ${base}_640.jpg 640w,
            ${base}_1024.jpg 1024w,
            ${base}_1600.jpg 1600w
        `;
    }

    // Lazy Loading
    function observeLazyImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }
                        img.onload = () => {
                            // Remove placeholder after load
                            const placeholder = img.parentElement.querySelector('.gallery-item-placeholder');
                            if (placeholder) {
                                setTimeout(() => placeholder.style.opacity = '0', 100);
                            }
                        };
                        delete img.dataset.src;
                        delete img.dataset.srcset;
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        elements.galleryGrid.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Open Lightbox
    function openLightbox(index) {
        const filteredItems = getFilteredItems();
        const item = filteredItems[index];
        state.lightboxIndex = index;

        if (!item) return;

        // Update image
        const fullSrc = item.src || `/assets/gallery/${item.slug}_1600.jpg`;
        elements.lightboxImage.src = fullSrc;
        elements.lightboxImage.alt = item.title || 'Gallery image';

        // Update caption
        elements.lightboxTitle.textContent = item.title || '';
        elements.lightboxDescription.textContent = item.description || '';
        elements.lightboxLocation.textContent = item.location ? `📍 ${item.location}` : '';
        elements.lightboxDate.textContent = item.date ? formatDate(item.date) : '';

        // Show/hide nav buttons
        elements.lightboxPrev.style.display = index > 0 ? 'flex' : 'none';
        elements.lightboxNext.style.display = index < filteredItems.length - 1 ? 'flex' : 'none';

        // Update URL
        window.location.hash = `photo=${item.slug}`;

        // Show lightbox
        elements.lightbox.classList.add('active');
        elements.lightbox.setAttribute('aria-hidden', 'false');
        
        // Focus trap
        elements.lightboxClose.focus();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Close Lightbox
    function closeLightbox() {
        elements.lightbox.classList.remove('active');
        elements.lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        window.location.hash = '';
    }

    // Navigate Lightbox
    function navigateLightbox(direction) {
        const filteredItems = getFilteredItems();
        const newIndex = state.lightboxIndex + direction;
        
        if (newIndex >= 0 && newIndex < filteredItems.length) {
            openLightbox(newIndex);
        }
    }

    // Format Date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // Check Deep Link
    function checkDeepLink() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#photo=')) {
            const slug = hash.replace('#photo=', '');
            const index = state.gallery.findIndex(item => item.slug === slug);
            if (index !== -1) {
                setTimeout(() => openLightbox(index), 500);
            }
        }
    }

    // Generate QR Code
    function generateQRCode() {
        const qrContainer = document.getElementById('qrCode');
        qrContainer.innerHTML = `
            <div style="padding: 20px; background: white; border-radius: 8px;">
                <canvas id="qrCanvas"></canvas>
            </div>
        `;

        // Simple QR code visualization (placeholder)
        const canvas = document.getElementById('qrCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        
        // Draw placeholder QR pattern
        ctx.fillStyle = '#000';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (Math.random() > 0.5) {
                    ctx.fillRect(i * 20, j * 20, 20, 20);
                }
            }
        }
        
        elements.qrModal.classList.add('active');
    }

    // Share Profile
    async function shareProfile() {
        const shareData = {
            title: 'Joanne Aiwood',
            text: 'NYC heart, world soul — AI creator & traveler',
            url: 'https://joanneaiwood.com'
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share cancelled or failed');
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareData.url);
            showToast('Link copied to clipboard!');
        }
    }

    // Show Toast
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 3000;
            animation: slideUp 0.3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Theme toggle
        elements.themeToggle.addEventListener('click', toggleTheme);

        // Share button
        elements.shareBtn.addEventListener('click', shareProfile);

        // QR button
        elements.qrBtn.addEventListener('click', generateQRCode);
        elements.qrModalClose.addEventListener('click', () => {
            elements.qrModal.classList.remove('active');
        });

        // Load more
        elements.loadMoreBtn.addEventListener('click', () => {
            state.currentPage++;
            renderGallery();
        });

        // Lightbox
        elements.lightboxClose.addEventListener('click', closeLightbox);
        elements.lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
        elements.lightboxNext.addEventListener('click', () => navigateLightbox(1));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (elements.lightbox.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        navigateLightbox(-1);
                        break;
                    case 'ArrowRight':
                        navigateLightbox(1);
                        break;
                }
            }
        });

        // Touch gestures for lightbox
        let touchStartX = 0;
        let touchEndX = 0;

        elements.lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        elements.lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) {
                    navigateLightbox(-1); // Swipe right -> previous
                } else {
                    navigateLightbox(1); // Swipe left -> next
                }
            }
        }

        // Click outside to close modals
        elements.lightbox.addEventListener('click', (e) => {
            if (e.target === elements.lightbox) {
                closeLightbox();
            }
        });

        elements.qrModal.addEventListener('click', (e) => {
            if (e.target === elements.qrModal) {
                elements.qrModal.classList.remove('active');
            }
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
