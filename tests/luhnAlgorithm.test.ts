
import { luhnCheck, detectCardType } from '../src/utils/luhnAlgorithm';

describe('Luhn Algorithm', () => {
  describe('luhnCheck', () => {
    it('should validate a correct Visa card number', () => {
      expect(luhnCheck('4532015112830366')).toBe(true);
    });
    
    it('should validate a correct Mastercard number', () => {
      expect(luhnCheck('5555555555554444')).toBe(true);
    });
    
    it('should validate a correct Amex number', () => {
      expect(luhnCheck('378282246310005')).toBe(true);
    });
    
    it('should reject an invalid card number', () => {
      expect(luhnCheck('4532015112830367')).toBe(false);
    });
    
    it('should handle card numbers with spaces', () => {
      expect(luhnCheck('4532 0151 1283 0366')).toBe(true);
    });
    
    it('should handle card numbers with hyphens', () => {
      expect(luhnCheck('4532-0151-1283-0366')).toBe(true);
    });
    
    it('should reject numbers that are too short', () => {
      expect(luhnCheck('123')).toBe(false);
    });
    
    it('should reject non-numeric input', () => {
      expect(luhnCheck('abcd1234567890')).toBe(false);
    });
    
    it('should reject empty string', () => {
      expect(luhnCheck('')).toBe(false);
    });
  });
  
  describe('detectCardType', () => {
    it('should detect Visa card', () => {
      expect(detectCardType('4532015112830366')).toBe('Visa');
    });
    
    it('should detect Mastercard', () => {
      expect(detectCardType('5425233010103442')).toBe('Mastercard');
    });
    
    it('should detect American Express', () => {
      expect(detectCardType('378282246310005')).toBe('Amex');
    });
    
    it('should detect Discover', () => {
      expect(detectCardType('6011111111111117')).toBe('Discover');
    });
    
    it('should return Unknown for unrecognized card', () => {
      expect(detectCardType('9999999999999999')).toBe('Unknown');
    });
  });
});