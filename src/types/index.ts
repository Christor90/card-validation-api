
export interface CardValidationRequest {
  cardNumber: string;
}

export interface CardValidationResponse {
  isValid: boolean;
  cardNumber: string;
  cardType?: string;
  message: string;
}

export interface ValidationError {
  status: number;
  message: string;
}