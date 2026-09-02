
/**
 * Request body for card validation endpoint
 */
export interface CardValidationRequest {
  cardNumber: string;
}

/**
 * Successful validation response
 */
export interface CardValidationResponse {
  isValid: boolean;
  cardNumber: string;
  cardType?: string;
  message: string;
}

/**
 * Error response
 */
export interface ErrorResponse {
  isValid: false;
  cardNumber: string;
  message: string;
}

/**
 * Generic error object for internal use
 */
export interface ValidationError extends Error {
  status: number;
  message: string;
}

/**
 * Validation result from validator
 */
export interface ValidationResult {
  isValid: boolean;
  cardType: string;
}