
# Card Number Validation API

A simple, production-ready Express API for validating credit card numbers using the Luhn algorithm.

## Features

-  Validates card numbers using the Luhn algorithm
-  Detects card type (Visa, Mastercard, Amex, Discover)
-  Handles edge cases and malformed input
-  Comprehensive error handling
-  Unit and integration tests
-  TypeScript with strict mode enabled
-  Clean, maintainable code structure

## Setup & Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repo-url>
cd card-validation-api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run tests
npm test

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## API Usage

### Endpoint: `POST /api/validate-card`

**Request:**
```json
{
  "cardNumber": "4532015112830366"
}
```

**Success Response (200):**
```json
{
  "isValid": true,
  "cardNumber": "****-****-****-0366",
  "cardType": "Visa",
  "message": "Valid Visa card"
}
```

**Error Response (400):**
```json
{
  "isValid": false,
  "cardNumber": "****",
  "message": "Invalid card number"
}
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Implementation Details

### Luhn Algorithm
The Luhn algorithm is the standard for credit card validation. It works by:
1. Doubling every second digit from right to left
2. If any doubled digit exceeds 9, subtract 9
3. Summing all digits
4. Valid if sum is divisible by 10

### Card Type Detection
Card types are detected using regex patterns on the first 4-6 digits:
- **Visa**: Starts with 4
- **Mastercard**: Starts with 51-55
- **American Express**: Starts with 34 or 37
- **Discover**: Starts with 6011 or 65

### Error Handling
- Missing or empty card number → 400 Bad Request
- Malformed input → 400 Bad Request
- Invalid card number → 400 Bad Request
- Server error → 500 Internal Server Error

### Security Considerations
- Card numbers are masked in responses (show only last 4 digits)
- No card data is stored
- Uses environment variables for configuration
- CORS enabled for controlled access

## Project Structure
src/
├── controllers/ # Request handlers
├── middleware/ # Express middleware
├── routes/ # API routes
├── types/ # TypeScript interfaces
├── utils/ # Utility functions
├── validators/ # Business logic validators
└── index.ts # Main application

tests/
├── cardValidator.test.ts # Unit tests
└── luhnAlgorithm.test.ts # Algorithm tests



