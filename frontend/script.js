// Global variables
let allListings = [];
let shortlistedProperties = [];
let currentUser = null;

// DOM elements - will be initialized after DOM loads
let listingsContainer;
let shortlistContainer;
let searchInput;
let searchButton;
let priceFilter;
let bedroomsFilter;
let sortFilter;
let loginForm;
let signupForm;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');

    // Initialize DOM elements
    listingsContainer = document.getElementById('listings-container');
    shortlistContainer = document.getElementById('shortlist-container');
    searchInput = document.getElementById('search-input');
    searchButton = document.getElementById('search-button');
    priceFilter = document.getElementById('price-filter');
    bedroomsFilter = document.getElementById('bedrooms-filter');
    sortFilter = document.getElementById('sort-filter');
    loginForm = document.getElementById('login-form');
    signupForm = document.getElementById('signup-form');

    console.log('DOM elements initialized');
    console.log('Listings container:', listingsContainer ? 'found' : 'not found');

    // Check if user is logged in
    checkLoginStatus();

    // Load shortlisted properties from localStorage
    loadShortlist();

    // Check if we're on a page with listings
    if (listingsContainer) {
        console.log('Listings container found, loading properties...');

        // Determine if we're on the homepage or listings page
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
        console.log('Is homepage:', isHomePage, 'Path:', window.location.pathname);

        if (isHomePage) {
            // Load featured listings for homepage (first 3 properties)
            console.log('Loading featured listings for homepage...');
            fetchFeaturedListings();
        } else {
            // Load all listings for listings page
            console.log('Loading all listings for listings page...');
            fetchListings();
        }

        // Add event listeners for search and filters if elements exist
        if (searchButton && searchInput) {
            searchButton.addEventListener('click', filterListings);
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    filterListings();
                }
            });
        }

        if (priceFilter) priceFilter.addEventListener('change', filterListings);
        if (bedroomsFilter) bedroomsFilter.addEventListener('change', filterListings);
        if (sortFilter) sortFilter.addEventListener('change', filterListings);
    } else {
        console.log('No listings container found on this page');
    }

    // Add event listeners for authentication forms
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Animate stats counters on home page
    animateStatCounters();
});

// Animate stats counters
function animateStatCounters() {
    const propertyCount = document.getElementById('property-count');
    const cityCount = document.getElementById('city-count');
    const agentCount = document.getElementById('agent-count');

    if (propertyCount && cityCount && agentCount) {
        // Set target values - will be updated with real data when listings are loaded
        const targetValues = {
            properties: allListings.length || 6, // Use actual count or fallback
            cities: 4, // Based on the sample data locations
            agents: 12
        };

        // Animate counters
        animateCounter(propertyCount, 0, targetValues.properties, 2000);
        animateCounter(cityCount, 0, targetValues.cities, 2000);
        animateCounter(agentCount, 0, targetValues.agents, 2000);
    }
}

// Animate counter from start to end value
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Update stats with real data after listings are loaded
function updateStatsWithRealData() {
    const propertyCount = document.getElementById('property-count');
    const cityCount = document.getElementById('city-count');
    const agentCount = document.getElementById('agent-count');

    if (propertyCount && cityCount && agentCount && allListings.length > 0) {
        // Calculate unique cities from listings
        const uniqueCities = [...new Set(allListings.map(listing =>
            listing.location.split(',').pop().trim()
        ))].length;

        // Update the counters with real data
        animateCounter(propertyCount, 0, allListings.length, 2000);
        animateCounter(cityCount, 0, uniqueCities, 2000);
        animateCounter(agentCount, 0, 12, 2000); // Keep agents as static for now
    }
}

// Fetch featured listings for homepage (first 3 properties)
async function fetchFeaturedListings() {
    console.log('fetchFeaturedListings called');
    console.log('APP_CONFIG:', window.APP_CONFIG);

    try {
        // Show loading state
        listingsContainer.innerHTML = '<div class="loading">Loading featured properties...</div>';

        // Use the proper API URL from config with fallback
        let apiUrl;
        if (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) {
            apiUrl = `${window.APP_CONFIG.API_BASE_URL}/api/listings`;
        } else if (window.EMPTYCUP_CONFIG && window.EMPTYCUP_CONFIG.apiBaseUrl) {
            apiUrl = `${window.EMPTYCUP_CONFIG.apiBaseUrl}/api/listings`;
        } else {
            // Fallback to production URL if config fails to load
            apiUrl = 'https://emptycup-backend-17wz.onrender.com/api/listings';
        }

        console.log('Making API call to:', apiUrl);
        console.log('Environment:', window.location.hostname);
        console.log('Config status:', {
            APP_CONFIG: !!window.APP_CONFIG,
            EMPTYCUP_CONFIG: !!window.EMPTYCUP_CONFIG
        });

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Response received:', response.status, response.ok, response.statusText);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log('Data parsed:', data.length, 'properties');

        // Store all listings
        allListings = data;

        // Show only first 3 properties as featured
        const featuredListings = data.slice(0, 3);
        console.log('Featured listings:', featuredListings.length);

        // Display the featured listings
        displayFeaturedListings(featuredListings);

        // Update stats with real data
        updateStatsWithRealData();
    } catch (error) {
        console.error('Error fetching featured listings:', error);
        listingsContainer.innerHTML = `<div class="loading">Error loading properties. Please try again later.</div>`;
    }
}

// Fetch listings from the backend API
async function fetchListings() {
    try {
        // Show loading state
        listingsContainer.innerHTML = '<div class="loading">Loading properties...</div>';

        // Fetch data from the backend with fallback
        let apiUrl;
        if (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) {
            apiUrl = `${window.APP_CONFIG.API_BASE_URL}/api/listings`;
        } else if (window.EMPTYCUP_CONFIG && window.EMPTYCUP_CONFIG.apiBaseUrl) {
            apiUrl = `${window.EMPTYCUP_CONFIG.apiBaseUrl}/api/listings`;
        } else {
            // Fallback to production URL if config fails to load
            apiUrl = 'https://emptycup-backend-17wz.onrender.com/api/listings';
        }

        console.log('fetchListings - Making API call to:', apiUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Store the listings
        allListings = data;

        // Display the listings
        displayListings(allListings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        listingsContainer.innerHTML = `<div class="loading">Error loading properties. Please try again later.</div>`;
    }
}

// Display featured listings on homepage with "View All" button
function displayFeaturedListings(listings) {
    // Clear the container
    listingsContainer.innerHTML = '';

    if (listings.length === 0) {
        listingsContainer.innerHTML = '<div class="loading">No properties available at the moment.</div>';
        return;
    }

    // Create and append listing cards
    listings.forEach(listing => {
        const isShortlisted = shortlistedProperties.some(prop => prop.id === listing.id);
        const card = createPropertyCard(listing, isShortlisted);
        listingsContainer.appendChild(card);
    });

    // Add "View All Properties" button
    const viewAllButton = document.createElement('div');
    viewAllButton.className = 'view-all-container';
    viewAllButton.innerHTML = `
        <a href="listings.html" class="btn-view-all">
            <i class="fas fa-arrow-right"></i> View All Properties (${allListings.length})
        </a>
    `;
    listingsContainer.appendChild(viewAllButton);
}

// Display listings in the listings container
function displayListings(listings) {
    // Clear the container
    listingsContainer.innerHTML = '';

    if (listings.length === 0) {
        listingsContainer.innerHTML = '<div class="loading">No properties found matching your criteria.</div>';
        return;
    }

    // Create and append listing cards
    listings.forEach(listing => {
        const isShortlisted = shortlistedProperties.some(prop => prop.id === listing.id);
        const card = createPropertyCard(listing, isShortlisted);
        listingsContainer.appendChild(card);
    });
}

// Create a property card element
function createPropertyCard(property, isShortlisted = false) {
    const card = document.createElement('div');
    card.className = 'property-card';

    // Format price with commas
    const formattedPrice = property.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    // Determine bedroom text (studio vs bedrooms)
    const bedroomText = property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} bed${property.bedrooms > 1 ? 's' : ''}`;

    // Check if property is liked
    const isLiked = localStorage.getItem(`liked_${property.id}`) === 'true';

    card.innerHTML = `
        <div class="property-image" style="background-image: url('${property.image}')">
            <div class="property-price">${formattedPrice}</div>
            <button class="shortlist-btn ${isShortlisted ? 'active' : ''}" data-id="${property.id}">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="property-details">
            <h3 class="property-title">${property.title}</h3>
            <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
            <div class="property-features">
                <div class="feature">
                    <span>${bedroomText}</span>
                    <small>Bedrooms</small>
                </div>
                <div class="feature">
                    <span>${property.bathrooms}</span>
                    <small>Bathrooms</small>
                </div>
                <div class="feature">
                    <span>${property.area}</span>
                    <small>Sq Ft</small>
                </div>
            </div>
            <div class="property-actions">
                <button class="btn-like ${isLiked ? 'active' : ''}" data-id="${property.id}">
                    <i class="fas fa-thumbs-up"></i> Like
                </button>
                <button class="btn-book" data-id="${property.id}">
                    <i class="fas fa-calendar-check"></i> Book Viewing
                </button>
            </div>
        </div>
    `;

    // Add event listener to shortlist button
    const shortlistBtn = card.querySelector('.shortlist-btn');
    shortlistBtn.addEventListener('click', () => toggleShortlist(property));

    // Add event listener to like button
    const likeBtn = card.querySelector('.btn-like');
    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('active');
        const isNowLiked = likeBtn.classList.contains('active');
        localStorage.setItem(`liked_${property.id}`, isNowLiked);
    });

    // Add event listener to book button
    const bookBtn = card.querySelector('.btn-book');
    bookBtn.addEventListener('click', () => {
        if (!currentUser) {
            alert('Please login to book a viewing');
            window.location.href = 'login.html';
            return;
        }

        alert(`Booking request sent for ${property.title}. We'll contact you soon to confirm the viewing.`);
    });

    return card;
}

// Toggle property in shortlist
function toggleShortlist(property) {
    const index = shortlistedProperties.findIndex(prop => prop.id === property.id);

    if (index === -1) {
        // Add to shortlist
        shortlistedProperties.push(property);
    } else {
        // Remove from shortlist
        shortlistedProperties.splice(index, 1);
    }

    // Save to localStorage
    saveShortlist();

    // Update UI
    updateShortlistUI();

    // Update shortlist button in listings
    const shortlistBtn = document.querySelector(`.shortlist-btn[data-id="${property.id}"]`);
    if (shortlistBtn) {
        shortlistBtn.classList.toggle('active');
    }
}

// Save shortlist to localStorage
function saveShortlist() {
    localStorage.setItem('shortlistedProperties', JSON.stringify(shortlistedProperties));
}

// Load shortlist from localStorage
function loadShortlist() {
    const saved = localStorage.getItem('shortlistedProperties');
    if (saved) {
        shortlistedProperties = JSON.parse(saved);
        updateShortlistUI();
    }
}

// Update the shortlist UI
function updateShortlistUI() {
    // Check if shortlist container exists on this page
    if (!shortlistContainer) return;

    // Clear the container
    shortlistContainer.innerHTML = '';

    if (shortlistedProperties.length === 0) {
        shortlistContainer.innerHTML = '<p class="empty-shortlist">No properties shortlisted yet. Click the heart icon on any property to add it to your shortlist.</p>';
        return;
    }

    // Create and append shortlisted property cards
    shortlistedProperties.forEach(property => {
        const card = createPropertyCard(property, true);
        shortlistContainer.appendChild(card);
    });
}

// Filter and sort listings based on user input
function filterListings() {
    const searchTerm = searchInput.value.toLowerCase();
    const priceRange = priceFilter.value;
    const bedroomsValue = bedroomsFilter.value;
    const sortBy = sortFilter.value;

    // Filter by search term
    let filtered = allListings.filter(listing => {
        return listing.title.toLowerCase().includes(searchTerm) ||
               listing.location.toLowerCase().includes(searchTerm) ||
               listing.description.toLowerCase().includes(searchTerm);
    });

    // Filter by price range
    if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(val => parseInt(val, 10));
        filtered = filtered.filter(listing => {
            if (max) {
                return listing.price >= min && listing.price <= max;
            } else {
                return listing.price >= min;
            }
        });
    }

    // Filter by bedrooms
    if (bedroomsValue !== 'all') {
        if (bedroomsValue === '0') {
            // For Studio (0 bedrooms), show only properties with 0 bedrooms
            filtered = filtered.filter(listing => listing.bedrooms === 0);
        } else {
            // For other values, show properties with at least that many bedrooms
            const minBedrooms = parseInt(bedroomsValue, 10);
            filtered = filtered.filter(listing => listing.bedrooms >= minBedrooms);
        }
    }

    // Sort listings
    switch (sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'bedrooms':
            filtered.sort((a, b) => b.bedrooms - a.bedrooms);
            break;
        case 'area':
            filtered.sort((a, b) => b.area - a.area);
            break;
    }

    // Display filtered listings
    displayListings(filtered);
}

// Authentication Functions

// Check if user is logged in
function checkLoginStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        updateAuthUI(true);
    } else {
        updateAuthUI(false);
    }
}

// Update UI based on authentication status
function updateAuthUI(isLoggedIn) {
    // This function would update UI elements based on login status
    // For example, showing/hiding certain elements or changing text
    console.log('User logged in:', isLoggedIn);

    // Update navigation menu
    const loginLink = document.querySelector('nav ul li a[href="login.html"]');
    const signupLink = document.querySelector('nav ul li a[href="signup.html"]');

    if (isLoggedIn && loginLink && signupLink) {
        // Replace login link with user profile
        loginLink.textContent = currentUser.name || 'My Account';
        loginLink.href = '#';

        // Replace signup link with logout
        signupLink.textContent = 'Logout';
        signupLink.href = '#';
        signupLink.onclick = function(e) {
            e.preventDefault();
            logout();
        };
    }
}

// Handle social login
function socialLogin(provider) {
    // In a real application, this would redirect to OAuth provider
    // For this demo, we'll simulate a successful login

    let userData = {};

    switch(provider) {
        case 'google':
            userData = {
                name: 'Google User',
                email: 'user@gmail.com',
                provider: 'google'
            };
            break;
        case 'facebook':
            userData = {
                name: 'Facebook User',
                email: 'user@facebook.com',
                provider: 'facebook'
            };
            break;
        case 'apple':
            userData = {
                name: 'Apple User',
                email: 'user@icloud.com',
                provider: 'apple'
            };
            break;
    }

    // Store user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));
    currentUser = userData;

    // Show success message
    const formResponse = document.getElementById('form-response');
    if (formResponse) {
        showFormMessage(formResponse, `Successfully logged in with ${provider}! Redirecting...`, 'success');
    }

    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;

    // Redirect to home page
    window.location.href = 'index.html';
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const formResponse = document.getElementById('form-response');

    // In a real application, you would validate credentials against a backend
    // For this demo, we'll simulate a successful login

    // Simple validation
    if (!email || !password) {
        showFormMessage(formResponse, 'Please fill in all fields', 'error');
        return;
    }

    // Simulate successful login
    const user = {
        email: email,
        name: email.split('@')[0] // Just use part of email as name for demo
    };

    // Store user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUser = user;

    // Show success message
    showFormMessage(formResponse, 'Login successful! Redirecting...', 'success');

    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Handle signup form submission
function handleSignup(e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const formResponse = document.getElementById('form-response');

    // Simple validation
    if (!fullname || !email || !password || !confirmPassword) {
        showFormMessage(formResponse, 'Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showFormMessage(formResponse, 'Passwords do not match', 'error');
        return;
    }

    // Simulate successful signup
    const user = {
        name: fullname,
        email: email
    };

    // Store user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUser = user;

    // Show success message
    showFormMessage(formResponse, 'Account created successfully! Redirecting...', 'success');

    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Helper function to show form messages
function showFormMessage(element, message, type) {
    element.textContent = message;
    element.classList.remove('hidden', 'success', 'error');
    element.classList.add(type);
}