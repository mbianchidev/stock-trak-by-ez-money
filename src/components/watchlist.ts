// Watchlist component for managing saved stocks
import { fetchStockData } from '../services/apiService';
import { renderStockData, showError, hideError } from './stockDisplay';

// Type definition for watchlist items
interface WatchlistItem {
  symbol: string;
  addedAt: number; // timestamp
}

/**
 * Initialize the watchlist component
 */
export const initWatchlist = (): void => {
  displayWatchlist();
  setupWatchlistEventListeners();
};

/**
 * Add a stock to the watchlist
 * @param symbol Stock symbol to add
 */
export const addToWatchlist = (symbol: string): void => {
  const watchlist = getWatchlist();
  
  // Check if already in watchlist
  if (watchlist.some(item => item.symbol === symbol)) {
    return;
  }
  
  // Add to watchlist
  watchlist.push({
    symbol,
    addedAt: Date.now()
  });
  
  // Save and update UI
  saveWatchlist(watchlist);
  displayWatchlist();
  updateAddButton(symbol, true);
};

/**
 * Remove a stock from the watchlist
 * @param symbol Stock symbol to remove
 */
export const removeFromWatchlist = (symbol: string): void => {
  const watchlist = getWatchlist().filter(item => item.symbol !== symbol);
  saveWatchlist(watchlist);
  displayWatchlist();
  updateAddButton(symbol, false);
};

/**
 * Check if a stock is in the watchlist
 * @param symbol Stock symbol to check
 */
export const isInWatchlist = (symbol: string): boolean => {
  return getWatchlist().some(item => item.symbol === symbol);
};

/**
 * Get the current watchlist from localStorage
 */
const getWatchlist = (): WatchlistItem[] => {
  const stored = localStorage.getItem('ezmoney-watchlist');
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse watchlist:', e);
    return [];
  }
};

/**
 * Save the watchlist to localStorage
 */
const saveWatchlist = (watchlist: WatchlistItem[]): void => {
  localStorage.setItem('ezmoney-watchlist', JSON.stringify(watchlist));
};

/**
 * Display the watchlist in the UI
 */
const displayWatchlist = (): void => {
  const container = document.getElementById('watchlist-items');
  if (!container) return;
  
  const watchlist = getWatchlist();
  
  if (watchlist.length === 0) {
    container.innerHTML = '<p class="empty-watchlist">Your watchlist is empty. Search for stocks and add them to your watchlist.</p>';
    return;
  }
  
  const itemsHtml = watchlist.map(item => `
    <div class="watchlist-item" data-symbol="${item.symbol}">
      <span class="watchlist-symbol">${item.symbol}</span>
      <button class="remove-btn" data-symbol="${item.symbol}">✕</button>
    </div>
  `).join('');
  
  container.innerHTML = itemsHtml;
};

/**
 * Update the add/remove button state
 */
export const updateAddButton = (symbol: string, isAdded: boolean): void => {
  const addButton = document.getElementById('add-to-watchlist');
  if (!addButton) return;
  
  if (isAdded) {
    addButton.textContent = 'Remove from Watchlist';
    addButton.classList.add('in-watchlist');
  } else {
    addButton.textContent = 'Add to Watchlist';
    addButton.classList.remove('in-watchlist');
  }
  
  // Make sure the button is visible
  addButton.style.display = 'block';
};

/**
 * Setup event listeners for watchlist functionality
 */
const setupWatchlistEventListeners = (): void => {
  // Event delegation for watchlist items
  const container = document.getElementById('watchlist-items');
  if (container) {
    container.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      
      // Handle remove button clicks
      if (target.classList.contains('remove-btn')) {
        const symbol = target.getAttribute('data-symbol');
        if (symbol) {
          removeFromWatchlist(symbol);
          
          // Update the current view if displaying this stock
          const currentSymbolInput = document.getElementById('stock-symbol') as HTMLInputElement;
          if (currentSymbolInput && currentSymbolInput.value === symbol) {
            updateAddButton(symbol, false);
          }
        }
        return;
      }
      
      // Handle clicking on watchlist item to load it
      const item = target.closest('.watchlist-item') as HTMLElement;
      if (item) {
        const symbol = item.getAttribute('data-symbol');
        if (symbol) {
          // Update the input value
          const input = document.getElementById('stock-symbol') as HTMLInputElement;
          if (input) {
            input.value = symbol;
          }
          
          // Load the stock data
          try {
            const searchButton = document.getElementById('search-btn') as HTMLButtonElement;
            const loadingSpinner = searchButton.querySelector('.loading-spinner') as HTMLElement;
            const buttonText = searchButton.querySelector('.btn-text') as HTMLElement;
            
            // Show loading state
            searchButton.disabled = true;
            loadingSpinner.style.display = 'inline-block';
            buttonText.textContent = 'Loading...';
            hideError();
            
            const stockData = await fetchStockData(symbol);
            renderStockData(stockData);
            updateAddButton(symbol, true);
          } catch (error) {
            let errorMessage = 'An error occurred while fetching stock data';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            showError(errorMessage);
          } finally {
            // Reset button state
            const searchButton = document.getElementById('search-btn') as HTMLButtonElement;
            const loadingSpinner = searchButton.querySelector('.loading-spinner') as HTMLElement;
            const buttonText = searchButton.querySelector('.btn-text') as HTMLElement;
            
            searchButton.disabled = false;
            loadingSpinner.style.display = 'none';
            buttonText.textContent = 'Search';
          }
        }
      }
    });
  }
  
  // Add to watchlist button
  const addButton = document.getElementById('add-to-watchlist');
  if (addButton) {
    addButton.addEventListener('click', () => {
      const input = document.getElementById('stock-symbol') as HTMLInputElement;
      const symbol = input.value.trim().toUpperCase();
      
      if (!symbol) return;
      
      if (isInWatchlist(symbol)) {
        removeFromWatchlist(symbol);
      } else {
        addToWatchlist(symbol);
      }
    });
  }
};
