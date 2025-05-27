# EzMoney Stock Price Checker

A simple, user-friendly TypeScript web application for checking real-time stock prices and basic information.

## Features

- **Real-time Stock Data**: Fetches current stock prices and related information
- **Clean UI**: Professional, easy-to-read interface with clear visual indicators
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Watchlist**: Save and track your favorite stocks for quick access
- **Error Handling**: Provides clear feedback when issues occur

## Technologies Used

- TypeScript
- Vite (for building and development)
- CSS3 (custom styling without frameworks)
- Alpha Vantage API (for stock data)

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ecs-check-stock-price-app.git
   cd ecs-check-stock-price-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```
npm run build
```

The built files will be in the `dist` directory.

## API Usage

This application uses the [Alpha Vantage API](https://www.alphavantage.co/) to fetch stock data. The current implementation uses a demo API key with limitations. For production use, you should:

1. Get a free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Replace the `API_KEY` constant in `src/services/apiService.ts`

## Deployment

The application is set up to automatically deploy to GitHub Pages when changes are pushed to the main branch.

## Future Enhancements

- Historical data visualization with charts
- Additional company information and news
- Advanced filtering and sorting options for watchlist
- Portfolio tracking capabilities
- Price alerts and notifications

## License

MIT
