import { validateLuhn, isValidLength } from '../src/js/cardValidator.js';

describe('Luhn Algorithm Tests', () => {
    test('Valid Visa card', () => {
        expect(validateLuhn('4111111111111111')).toBe(true);
    });
    
    test('Valid Mastercard', () => {
        expect(validateLuhn('5555555555554444')).toBe(true);
    });
    
    test('Valid Amex', () => {
        expect(validateLuhn('378282246310005')).toBe(true);
    });
    
    test('Invalid card number', () => {
        expect(validateLuhn('1234567890123456')).toBe(false);
    });
    
    test('Card with spaces', () => {
        expect(validateLuhn('4111 1111 1111 1111')).toBe(true);
    });
    
    test('Card with dashes', () => {
        expect(validateLuhn('4111-1111-1111-1111')).toBe(true);
    });
    
    test('Empty string', () => {
        expect(validateLuhn('')).toBe(false);
    });
    
    test('Contains letters', () => {
        expect(validateLuhn('4111abcd11111111')).toBe(false);
    });
});

describe('Length Validation', () => {
    test('Valid length 16 digits', () => {
        expect(isValidLength('4111111111111111')).toBe(true);
    });
    
    test('Valid length 15 digits (Amex)', () => {
        expect(isValidLength('378282246310005')).toBe(true);
    });
    
    test('Too short', () => {
        expect(isValidLength('123456789012')).toBe(false);
    });
    
    test('Too long', () => {
        expect(isValidLength('12345678901234567890')).toBe(false);
    });
    
    test('With spaces - valid', () => {
        expect(isValidLength('4111 1111 1111 1111')).toBe(true);
    });
});