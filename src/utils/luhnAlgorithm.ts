
/**
 * Luhn Algorithm implementation for credit card validation
 * This is the standard algorithm used by most card networks
 */
export function luhnCheck(cardNumber: string): boolean {
  // Remove spaces and hyphens
  const digits = cardNumber.replace(/[\s-]/g, '');
  
  // Must contain only digits
  if (!/^\d+$/.test(digits)) {
    return false;
  }
  
  // Must be between 13 and 19 digits (standard card lengths)
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  let sum = 0;
  let isEven = false;
  
  // Process digits from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

/**
 * Detect card type based on card number
 */
export function detectCardType(cardNumber: string): string {
  const digits = cardNumber.replace(/[\s-]/g, '');
  
  const patterns: { [key: string]: RegExp } = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  };
  
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(digits)) {
      return type.charAt(0).toUpperCase() + type.slice(1);
    }
  }
  
  return 'Unknown';
}