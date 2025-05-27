// Event handlers for the application
import { fetchStockData } from '../services/apiService';
import { renderStockData, showError, hideError } from './stockDisplay';

/**
 * Sets up event listeners for the application
 */
export const setupEventListeners = (): void => {
  // Form submission event
  const form = document.getElementById('stock-form') as HTMLFormElement;
  const searchButton = document.getElementById('search-btn') as HTMLButtonElement;
  const loadingSpinner = searchButton.querySelector('.loading-spinner') as HTMLElement;
  const buttonText = searchButton.querySelector('.btn-text') as HTMLElement;
  
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Get the stock symbol from the input
    const symbolInput = document.getElementById('stock-symbol') as HTMLInputElement;
    const symbol = symbolInput.value.trim().toUpperCase();
    
    if (!symbol) {
      showError('Please enter a stock symbol');
      return;
    }
    
    try {
      // Show loading state
      searchButton.disabled = true;
      loadingSpinner.style.display = 'inline-block';
      buttonText.textContent = 'Loading...';
      hideError();
      
      // Fetch the stock data
      const stockData = await fetchStockData(symbol);
      
      // Render the stock data
      renderStockData(stockData);
    } catch (error) {
      let errorMessage = 'An error occurred while fetching stock data';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      showError(errorMessage);
    } finally {
      // Reset the button state
      searchButton.disabled = false;
      loadingSpinner.style.display = 'none';
      buttonText.textContent = 'Search';
    }
  });
};
