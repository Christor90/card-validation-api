
export interface CardValidationRequest {
  cardNumber: string;
}

export interface ValidationResult {
  isValid: boolean;
  cardType: string;
}

export interface CardValidationResponse {
  isValid: boolean;
  cardNumber: string;
  cardType?: string;
  message: string;
}

export interface ValidationError extends Error {
  status: number;
}