// Service for fetching stock data
import { GlobalQuote, ErrorResponse, StockData } from '../types';

const API_KEY = 'demo'; // Using demo API key for development
const BASE_URL = 'https://www.alphavantage.co/query';

/**
 * Fetches real-time stock quote from Alpha Vantage API
 * @param symbol Stock symbol to fetch (e.g., AAPL, MSFT)
 * @returns Processed stock data
 * @throws Error if the API call fails or returns invalid data
 */
export const fetchStockData = async (symbol: string): Promise<StockData> => {
  try {
    // Construct API URL
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    
    // Fetch data from API
    const response = await fetch(url);
    
    // Check if response is OK
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data: GlobalQuote | ErrorResponse = await response.json();
    
    // Check for API error messages
    if ('Error Message' in data) {
      throw new Error('API Error: Invalid API call');
    }
    
    if ('Information' in data) {
      throw new Error('API limit reached. Please try again later.');
    }
    
    if ('Note' in data) {
      throw new Error('Using demo API key with limited functionality. Please replace with a valid API key for production use.');
    }
    
    // Check if 'Global Quote' exists and contains data
    if (!('Global Quote' in data) || !data['Global Quote']['01. symbol']) {
      throw new Error(`No data found for symbol: ${symbol}`);
    }
    
    // Process and return the data
    const quote = data['Global Quote'];
    
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      open: parseFloat(quote['02. open']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      volume: parseInt(quote['06. volume'], 10),
      latestTradingDay: quote['07. latest trading day'],
      previousClose: parseFloat(quote['08. previous close']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred while fetching stock data');
  }
};
