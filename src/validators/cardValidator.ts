
import { CardValidationRequest, ValidationResult, ValidationError } from '../types/index';
import { luhnCheck, detectCardType } from '../utils/luhnAlgorithm';

/**
 * CardValidator class handles all card number validation logic
 * Uses Luhn algorithm to determine validity
 * Throws ValidationError for invalid input
 */
export class CardValidator {
  /**
   * Validates a card number from the request
   * @param request - The validation request containing cardNumber
   * @returns ValidationResult with isValid and cardType
   * @throws ValidationError if input is invalid or missing
   */
  static validateCardNumber(request: CardValidationRequest): ValidationResult {
    // Check if request body has cardNumber property
    if (!request || typeof request !== 'object') {
      throw this.createError(400, 'Request body must be a valid JSON object');
    }

    const { cardNumber } = request;

    // Check if cardNumber exists
    if (cardNumber === null || cardNumber === undefined) {
      throw this.createError(400, 'Card number is required');
    }

    // Check if it's a string
    if (typeof cardNumber !== 'string') {
      throw this.createError(
        400,
        'Card number must be a string'
      );
    }

    // Trim whitespace
    const trimmedCardNumber = cardNumber.trim();

    // Check if empty after trimming
    if (trimmedCardNumber.length === 0) {
      throw this.createError(400, 'Card number cannot be empty or contain only spaces');
    }

    // Check for invalid characters (only digits, spaces, and hyphens allowed)
    if (!/^[\d\s-]+$/.test(trimmedCardNumber)) {
      throw this.createError(
        400,
        'Card number can only contain digits, spaces, and hyphens'
      );
    }

    // Remove spaces and hyphens to get raw digits
    const rawDigits = trimmedCardNumber.replace(/[\s-]/g, '');

    // Check if it's too short
    if (rawDigits.length < 13) {
      throw this.createError(
        400,
        'Card number is too short (minimum 13 digits)'
      );
    }

    // Check if it's too long
    if (rawDigits.length > 19) {
      throw this.createError(
        400,
        'Card number is too long (maximum 19 digits)'
      );
    }

    // Validate using Luhn algorithm
    const isValid = luhnCheck(trimmedCardNumber);

    // Detect card type
    const cardType = detectCardType(trimmedCardNumber);

    return {
      isValid,
      cardType,
    };
  }

  /**
   * Create a standardized ValidationError
   * @param status - HTTP status code
   * @param message - Error message
   * @returns ValidationError object
   */
  private static createError(status: number, message: string): ValidationError {
    const error = new Error(message) as ValidationError;
    error.status = status;
    return error;
  }

  /**
   * Mask card number for security (show only last 4 digits)
   * @param cardNumber - The card number to mask
   * @returns Masked card number (e.g., ****-****-****-0366)
   */
  static maskCardNumber(cardNumber: string): string {
    // Remove spaces and hyphens to get raw digits
    const digits = cardNumber.replace(/[\s-]/g, '');

    // If less than 4 digits, just return asterisks
    if (digits.length < 4) {
      return '****';
    }

    // Get last 4 digits
    const lastFour = digits.slice(-4);

    // Format as masked card (e.g., ****-****-****-0366)
    return `****-****-****-${lastFour}`;
  }

  /**
   * Validate card and return masked number
   * Combines validation with security masking
   * @param cardNumber - The card number to validate
   * @returns Object with validation result and masked card number
   */
  static validateAndMask(
    cardNumber: string
  ): { isValid: boolean; cardType: string; maskedNumber: string } {
    // Validate
    const validationResult = this.validateCardNumber({ cardNumber });

    // Mask
    const maskedNumber = this.maskCardNumber(cardNumber);

    return {
      isValid: validationResult.isValid,
      cardType: validationResult.cardType,
      maskedNumber,
    };
  }
}