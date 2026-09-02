
import { Request, Response } from 'express';
import { CardValidator } from '../validators/cardValidator';
import {
  CardValidationRequest,
  CardValidationResponse,
  ErrorResponse,
} from '../types/index';

/**
 * CardController handles all HTTP requests related to card validation
 * Bridges the gap between HTTP layer and business logic layer
 */
export class CardController {
  /**
   * POST /api/validate-card
   * Validates a credit card number
   *
   * @param req - Express request object containing cardNumber in body
   * @param res - Express response object
   *
   * Request body:
   * {
   *   "cardNumber": "4532015112830366"
   * }
   *
   * Success Response (200):
   * {
   *   "isValid": true,
   *   "cardNumber": "****-****-****-0366",
   *   "cardType": "Visa",
   *   "message": "Valid Visa card"
   * }
   *
   * Error Response (400):
   * {
   *   "isValid": false,
   *   "cardNumber": "****",
   *   "message": "Card number is required"
   * }
   */
  static validateCard(req: Request, res: Response): void {
    try {
      // Extract body
      const requestBody = req.body as CardValidationRequest;

      // Log request (for debugging - remove in production if needed)
      console.log('Card validation request received');

      // Validate card number using CardValidator
      const { isValid, cardType } = CardValidator.validateCardNumber(requestBody);

      // Get masked card number for response
      const maskedCardNumber = CardValidator.maskCardNumber(
        requestBody.cardNumber.trim()
      );

      // Build success response
      const response: CardValidationResponse = {
        isValid,
        cardNumber: maskedCardNumber,
        cardType: isValid ? cardType : undefined,
        message: isValid ? `Valid ${cardType} card` : 'Invalid card number - failed Luhn check',
      };

      // Log response
      console.log(
        `Validation result: ${isValid ? 'VALID' : 'INVALID'} - ${cardType}`
      );

      // Return 200 for successful validation (even if invalid card)
      // The "isValid" field indicates whether the card is valid
      // We return 200 because the request itself was valid
      res.status(200).json(response);
    } catch (error: any) {
      // Handle validation errors
      CardController.handleError(error, res);
    }
  }

  /**
   * Handle errors and return appropriate response
   * @param error - The error object
   * @param res - Express response object
   */
  private static handleError(error: any, res: Response): void {
    // Determine HTTP status code
    const statusCode = error.status || 400;
    const message = error.message || 'Invalid card number';

    // Log error
    console.error(`❌ Validation error (${statusCode}): ${message}`);

    // Build error response
    const errorResponse: ErrorResponse = {
      isValid: false,
      cardNumber: '****',
      message,
    };

    // Send error response
    res.status(statusCode).json(errorResponse);
  }

  /**
   * Health check endpoint
   * Verifies the API is running
   */
  static healthCheck(req: Request, res: Response): void {
    res.status(200).json({
      status: 'OK',
      message: 'Card validation API is running',
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Get API information
   * Returns details about the API
   */
  static getApiInfo(req: Request, res: Response): void {
    res.status(200).json({
      name: 'Card Validation API',
      version: '1.0.0',
      description: 'Validates credit card numbers using the Luhn algorithm',
      endpoints: {
        validate: {
          method: 'POST',
          path: '/api/validate-card',
          description: 'Validates a credit card number',
          example: {
            request: {
              cardNumber: '4532015112830366',
            },
            response: {
              isValid: true,
              cardNumber: '****-****-****-0366',
              cardType: 'Visa',
              message: 'Valid Visa card',
            },
          },
        },
        health: {
          method: 'GET',
          path: '/health',
          description: 'Health check endpoint',
        },
        info: {
          method: 'GET',
          path: '/api/info',
          description: 'Get API information',
        },
      },
      supportedCardTypes: [
        'Visa',
        'Mastercard',
        'American Express',
        'Discover',
        'Diners Club',
        'JCB',
      ],
    });
  }
}