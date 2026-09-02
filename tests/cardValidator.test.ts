
import { CardValidator } from '../src/validators/cardValidator';

describe('CardValidator', () => {
  describe('validateCardNumber', () => {
    it('should validate a correct card number', () => {
      const result = CardValidator.validateCardNumber({
        cardNumber: '4532015112830366',
      });
      expect(result.isValid).toBe(true);
      expect(result.cardType).toBe('Visa');
    });
    
    it('should reject an invalid card number', () => {
      const result = CardValidator.validateCardNumber({
        cardNumber: '4532015112830367',
      });
      expect(result.isValid).toBe(false);
    });
    
    it('should throw error if cardNumber is missing', () => {
      expect(() => {
        CardValidator.validateCardNumber({ cardNumber: '' });
      }).toThrow();
    });
    
    it('should throw error if cardNumber is null', () => {
      expect(() => {
        CardValidator.validateCardNumber({ cardNumber: null as any });
      }).toThrow();
    });
    
    it('should handle card numbers with spaces', () => {
      const result = CardValidator.validateCardNumber({
        cardNumber: '4532 0151 1283 0366',
      });
      expect(result.isValid).toBe(true);
    });
  });
});