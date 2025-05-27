// Component for rendering stock data
import { StockData } from '../types';
import { isInWatchlist, updateAddButton } from './watchlist';

/**
 * Renders stock data in the DOM
 * @param data Processed stock data to display
 */
export const renderStockData = (data: StockData): void => {
  // Get the container elements
  const mainContainer = document.getElementById('stock-data');
  if (!mainContainer) return;
  
  // Show the container
  mainContainer.style.display = 'block';
  
  // Format numbers for display
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  };
  
  // Format volume with commas
  const formatVolume = (value: number): string => {
    return value.toLocaleString('en-US');
  };
  
  // Format dates
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Determine if price change is positive or negative
  const changeClass = data.change >= 0 ? 'positive' : 'negative';
  const changeIcon = data.change >= 0 ? '▲' : '▼';
  
  // Create HTML content
  const html = `
    <div class="stock-header">
      <div class="stock-identity">
        <h2 class="stock-name">${data.symbol}</h2>
        <span class="stock-symbol">Stock Symbol</span>
      </div>
      <div class="stock-price">
        <div class="current-price">${formatCurrency(data.price)}</div>
        <div class="price-change ${changeClass}">
          <span>${changeIcon}</span>
          <span>${formatCurrency(data.change)}</span>
          <span>(${data.changePercent.toFixed(2)}%)</span>
        </div>
      </div>
    </div>
    <div class="stock-details">
      <div class="detail-group">
        <div class="detail-label">Open</div>
        <div class="detail-value">${formatCurrency(data.open)}</div>
      </div>
      <div class="detail-group">
        <div class="detail-label">Previous Close</div>
        <div class="detail-value">${formatCurrency(data.previousClose)}</div>
      </div>
      <div class="detail-group">
        <div class="detail-label">Day High</div>
        <div class="detail-value">${formatCurrency(data.high)}</div>
      </div>
      <div class="detail-group">
        <div class="detail-label">Day Low</div>
        <div class="detail-value">${formatCurrency(data.low)}</div>
      </div>
      <div class="detail-group">
        <div class="detail-label">Volume</div>
        <div class="detail-value">${formatVolume(data.volume)}</div>
      </div>
      <div class="detail-group">
        <div class="detail-label">Date</div>
        <div class="detail-value">${formatDate(data.latestTradingDay)}</div>
      </div>
    </div>
  `;
  
  // Set the HTML to the info container (not the main container)
  const infoContainer = document.getElementById('stock-info-container');
  if (infoContainer) {
    infoContainer.innerHTML = html;
  }
  
  // Show and update the watchlist button
  const watchlistButton = document.getElementById('add-to-watchlist');
  if (watchlistButton) {
    updateAddButton(data.symbol, isInWatchlist(data.symbol));
  }
};

/**
 * Displays an error message
 * @param message Error message to display
 */
export const showError = (message: string): void => {
  // Hide the stock data container if it's visible
  const stockDataContainer = document.getElementById('stock-data');
  if (stockDataContainer) {
    stockDataContainer.style.display = 'none';
  }
  
  // Hide the watchlist button
  const watchlistButton = document.getElementById('add-to-watchlist');
  if (watchlistButton) {
    watchlistButton.style.display = 'none';
  }
  
  // Show the error message
  const errorContainer = document.getElementById('error-message');
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
  }
};

/**
 * Hides the error message
 */
export const hideError = (): void => {
  const errorContainer = document.getElementById('error-message');
  if (errorContainer) {
    errorContainer.style.display = 'none';
  }
};
