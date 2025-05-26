
// Configuration for different environments
const config = {
    development: {
        API_BASE_URL: 'http://localhost:12001'
    },
    production: {
        API_BASE_URL: 'https://emptycup-backend-17wz.onrender.com'
    }
};

// Determine current environment
const environment = (window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1' ||
                    window.location.hostname.includes('localhost'))
    ? 'development'
    : 'production';

// Export the current config
window.APP_CONFIG = config[environment];

// Ensure config is available globally
if (typeof window !== 'undefined') {
    window.EMPTYCUP_CONFIG = {
        environment: environment,
        apiBaseUrl: config[environment].API_BASE_URL,
        config: config[environment]
    };
}

// Debug logging
console.log('🔧 Config.js loaded');
console.log('Environment detected:', environment);
console.log('API Config:', window.APP_CONFIG);
console.log('Global Config:', window.EMPTYCUP_CONFIG);