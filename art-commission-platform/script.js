// script.js - Core Logic

// Data structures handling the site interactions
const categories = [
    { id: 'digital', name: 'Digital Art', icon: '💻' },
    { id: 'oil', name: 'Oil Painting', icon: '🎨' },
    { id: 'sketch', name: 'Pencil Sketches', icon: '✏️' },
    { id: 'watercolor', name: 'Watercolor', icon: '💧' },
    { id: 'anime', name: 'Anime/Manga', icon: '🎌' },
    { id: '3d', name: '3D Models', icon: '🧊' }
];

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    renderCategories();
});

// Subtle header background on scroll
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Render dynamic art categories
function renderCategories() {
    const grid = document.getElementById('categoryGrid');
    if (!grid) return;

    grid.innerHTML = categories.map(cat => `
        <div class="category-card" onclick="selectCategory('${cat.id}')">
            <div class="icon">${cat.icon}</div>
            <h3>${cat.name}</h3>
        </div>
    `).join('');
}

// Handle category selection and redirect
function selectCategory(categoryId) {
    // Save to local storage to filter artists on the next page
    localStorage.setItem('selectedCategory', categoryId);
    window.location.href = 'artists.html';
}

// Mock Artist Data
const artists = [
    { id: 1, name: 'Elena R.', category: 'digital', rating: 5, reviews: 124, avatar: 'https://i.pravatar.cc/150?u=1', banner: 'gradient-1', desc: 'Specializing in hyper-realistic cyberpunk cityscapes.' },
    { id: 2, name: 'Kenji M.', category: 'anime', rating: 4.9, reviews: 89, avatar: 'https://i.pravatar.cc/150?u=2', banner: 'gradient-2', desc: 'Manga and anime style character design.' },
    { id: 3, name: 'Sarah J.', category: 'oil', rating: 4.8, reviews: 45, avatar: 'https://i.pravatar.cc/150?u=3', banner: 'gradient-3', desc: 'Classic oil landscapes and portraits.' },
    { id: 4, name: 'Marcus D.', category: '3d', rating: 5, reviews: 201, avatar: 'https://i.pravatar.cc/150?u=4', banner: 'gradient-4', desc: 'High-poly 3D models for games and printing.' },
    { id: 5, name: 'Lisa W.', category: 'watercolor', rating: 4.7, reviews: 32, avatar: 'https://i.pravatar.cc/150?u=5', banner: 'gradient-5', desc: 'Soft and whimsical watercolor illustrations.' },
    { id: 6, name: 'Tom B.', category: 'sketch', rating: 4.9, reviews: 112, avatar: 'https://i.pravatar.cc/150?u=6', banner: 'gradient-6', desc: 'Detailed graphite pencil sketches.' }
];

// Initialize Artists Page
function initArtistsPage() {
    const filterSelect = document.getElementById('categoryFilter');
    if (!filterSelect) return;

    // Populate filter options
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        filterSelect.appendChild(option);
    });

    // Handle filter change
    filterSelect.addEventListener('change', (e) => {
        renderArtists(e.target.value);
    });

    // Check if coming from home page category click
    const preSelected = localStorage.getItem('selectedCategory');
    if (preSelected) {
        filterSelect.value = preSelected;
        renderArtists(preSelected);
        localStorage.removeItem('selectedCategory'); // Clear it
    } else {
        renderArtists('all');
    }
}

// Render the grid of artists
function renderArtists(categoryId) {
    const grid = document.getElementById('artistGrid');
    const subtitle = document.getElementById('categorySubtitle');
    if (!grid) return;

    let filtered = artists;
    if (categoryId !== 'all') {
        filtered = artists.filter(a => a.category === categoryId);
        const catName = categories.find(c => c.id === categoryId)?.name;
        subtitle.textContent = `Showing top creators for ${catName}`;
    } else {
        subtitle.textContent = `Showing top artists across all categories.`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No artists found for this category.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(artist => `
        <div class="artist-card">
            <div class="artist-banner" style="${getBannerGradient(artist.banner)}"></div>
            <div class="artist-info">
                <img src="${artist.avatar}" alt="${artist.name}" class="artist-avatar">
                <h3 class="artist-name">${artist.name}</h3>
                <div class="artist-badge">${categories.find(c => c.id === artist.category)?.name || 'Artist'}</div>
                
                <div class="artist-rating">
                    ${'★'.repeat(Math.floor(artist.rating))} ${artist.rating} (${artist.reviews})
                </div>
                
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2rem;">
                    ${artist.desc}
                </p>
                
                <a href="profile.html?id=${artist.id}" class="btn btn-primary">View Portfolio & Commission</a>
            </div>
        </div>
    `).join('');
}

function getBannerGradient(id) {
    const gradients = {
        'gradient-1': 'background: linear-gradient(135deg, #6d28d9, #0ea5e9);',
        'gradient-2': 'background: linear-gradient(135deg, #f43f5e, #f97316);',
        'gradient-3': 'background: linear-gradient(135deg, #10b981, #3b82f6);',
        'gradient-4': 'background: linear-gradient(135deg, #8b5cf6, #ec4899);',
        'gradient-5': 'background: linear-gradient(135deg, #06b6d4, #3b82f6);',
        'gradient-6': 'background: linear-gradient(135deg, #64748b, #334155);'
    };
    return gradients[id] || gradients['gradient-1'];
}
