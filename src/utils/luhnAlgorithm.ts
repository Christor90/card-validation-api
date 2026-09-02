
/**
 * Validates a credit card number using the Luhn algorithm
 * @param cardNumber - The card number to validate (can include spaces or hyphens)
 * @returns true if valid, false otherwise
 */
export function luhnCheck(cardNumber: string): boolean {
  // Remove spaces and hyphens
  const digits = cardNumber.replace(/[\s-]/g, '');

  // Must contain only digits
  if (!/^\d+$/.test(digits)) {
    return false;
  }

  // Must be between 13 and 19 digits (standard card lengths)
  // Visa: 13 or 16 digits
  // Mastercard: 16 digits
  // Amex: 15 digits
  // Discover: 16 digits
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  // Process digits from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    // Double every second digit (from the right)
    if (isEven) {
      digit *= 2;
      // If result is greater than 9, subtract 9
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  // Valid if sum is divisible by 10
  return sum % 10 === 0;
}

/**
 * Detect the card type based on the card number
 * Uses regex patterns that match industry standards
 * @param cardNumber - The card number to identify
 * @returns Card type name or 'Unknown'
 */
export function detectCardType(cardNumber: string): string {
  // Remove spaces and hyphens
  const digits = cardNumber.replace(/[\s-]/g, '');

  // Card type detection patterns
  const patterns: { [key: string]: RegExp } = {
    // Visa: Starts with 4, length 13 or 16
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,

    // Mastercard: Starts with 51-55 or 2221-2720, length 16
    mastercard: /^5[1-5][0-9]{14}$|^2(?:22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7(?:[01][0-9]|20))[0-9]{12}$/,

    // American Express: Starts with 34 or 37, length 15
    amex: /^3[47][0-9]{13}$/,

    // Discover: Starts with 6011, 622126-622925, 644, 645, 646, 647, or 648, length 16
    discover: /^6(?:011|5[0-9]{2}|4[4-9][0-9]|22(?:12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[01][0-9]|92[0-5]))[0-9]{12}$/,

    // Diners Club: Starts with 36, 38, or 39, length 14
    diners: /^3(?:6[0-9]|[89][0-9])[0-9]{11}$/,

    // JCB: Starts with 35, length 16
    jcb: /^35(?:2[89]|[3-8][0-9])[0-9]{12}$/,
  };

  // Test each pattern
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(digits)) {
      // Return card type with first letter capitalized
      return type.charAt(0).toUpperCase() + type.slice(1);
    }
  }

  // If no pattern matches
  return 'Unknown';
}

/**
 * Get card network display names with additional info
 */
export const cardNetworks: { [key: string]: string } = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  discover: 'Discover',
  diners: 'Diners Club',
  jcb: 'JCB',
  unknown: 'Unknown',
};