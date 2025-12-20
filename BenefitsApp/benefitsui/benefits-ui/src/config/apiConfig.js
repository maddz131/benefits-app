/**
 * API Configuration
 * Toggle between mock data and real API
 */

// Set to true to use mock data, false to use real API
export const USE_MOCK_DATA = true;

// Simulated network delay for mock data (in milliseconds)
export const MOCK_API_DELAY = 500;

/**
 * Simulate API delay for mock data
 * @returns {Promise} Promise that resolves after delay
 */
export const simulateApiDelay = () => {
    return new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
};

