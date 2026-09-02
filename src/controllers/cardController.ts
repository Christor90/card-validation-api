
import { Request, Response } from 'express';
import { CardValidator } from '../validators/cardValidator';
import { CardValidationRequest, CardValidationResponse } from '../types/index';

export class CardController {
  static validateCard(req: Request, res: Response): void {
    try {
      const requestBody = req.body as CardValidationRequest;
      
      // Validate input
      const { isValid, cardType } = CardValidator.validateCardNumber(requestBody);
      
      // Mask card number for security (show last 4 digits only)
      const maskedCardNumber = this.maskCardNumber(requestBody.cardNumber.trim());
      
      // Build response
      const response: CardValidationResponse = {
        isValid,
        cardNumber: maskedCardNumber,
        cardType: isValid ? cardType : undefined,
        message: isValid 
          ? `Valid ${cardType} card` 
          : 'Invalid card number',
      };
      
      // Return appropriate status code
      const statusCode = isValid ? 200 : 400;
      res.status(statusCode).json(response);
    } catch (error: any) {
      const statusCode = error.status || 500;
      const message = error.message || 'Internal server error';
      
      res.status(statusCode).json({
        isValid: false,
        cardNumber: '****',
        message,
      });
    }
  }
  
  private static maskCardNumber(cardNumber: string): string {
    const digits = cardNumber.replace(/[\s-]/g, '');
    const lastFour = digits.slice(-4);
    return `****-****-****-${lastFour}`;
  }
}