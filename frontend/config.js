
// Configuration for different environments
const config = {
    development: {
        API_BASE_URL: 'http://localhost:12001'
    },
    production: {
        API_BASE_URL: 'https://emptycup-backend-17wz.onrender.com'  // Replace 'xyz' with your actual Render URL
    }
};

// Determine current environment
const environment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'development'
    : 'production';

// Export the current config
window.APP_CONFIG = config[environment];

// Debug logging
console.log('Environment detected:', environment);
console.log('API Config:', window.APP_CONFIG);