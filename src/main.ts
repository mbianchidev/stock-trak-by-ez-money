// Main application entry point
import { setupEventListeners } from './components/eventHandlers';
import { initWatchlist } from './components/watchlist';
import './styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initWatchlist();
});
