import { detectCardSystem, getSystemName } from '../src/js/cardDetector.js';

describe('Card System Detection', () => {
    test('Detects Visa', () => {
        expect(detectCardSystem('4111111111111111')).toBe('visa');
        expect(detectCardSystem('4012888888881881')).toBe('visa');
    });
    
    test('Detects Mastercard', () => {
        expect(detectCardSystem('5555555555554444')).toBe('mastercard');
        expect(detectCardSystem('5105105105105100')).toBe('mastercard');
    });
    
    test('Detects American Express', () => {
        expect(detectCardSystem('378282246310005')).toBe('amex');
        expect(detectCardSystem('371449635398431')).toBe('amex');
    });
    
    test('Detects Discover', () => {
        expect(detectCardSystem('6011111111111117')).toBe('discover');
        expect(detectCardSystem('6011000990139424')).toBe('discover');
    });
    
    test('Detects JCB', () => {
        expect(detectCardSystem('3530111333300000')).toBe('jcb');
        expect(detectCardSystem('3566002020360505')).toBe('jcb');
    });
    
    test('Detects Diners Club', () => {
        expect(detectCardSystem('30569309025904')).toBe('diners');
        expect(detectCardSystem('38520000023237')).toBe('diners');
    });
    
    test('Detects Mir', () => {
        expect(detectCardSystem('2200000000000000')).toBe('mir');
        expect(detectCardSystem('2201382000000013')).toBe('mir');
    });
    
    test('Unknown card returns null', () => {
        expect(detectCardSystem('1234567890123456')).toBe(null);
    });
    
    test('Handles spaces in number', () => {
        expect(detectCardSystem('4111 1111 1111 1111')).toBe('visa');
    });
});

describe('Get System Name', () => {
    test('Returns correct names', () => {
        expect(getSystemName('visa')).toBe('Visa');
        expect(getSystemName('mastercard')).toBe('Mastercard');
        expect(getSystemName('amex')).toBe('American Express');
        expect(getSystemName('discover')).toBe('Discover');
        expect(getSystemName('jcb')).toBe('JCB');
        expect(getSystemName('diners')).toBe('Diners Club');
        expect(getSystemName('mir')).toBe('Мир');
        expect(getSystemName('unknown')).toBe('Unknown');
    });
});