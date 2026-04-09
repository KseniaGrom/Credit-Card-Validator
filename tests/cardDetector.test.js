import { detectCardSystem, getSystemName, paymentSystems } from '../src/js/cardDetector.js';
describe('Card System Detection', () => {
    // VISA тесты
    test('Detects Visa - 16 digits', () => {
        expect(detectCardSystem('4111111111111111')).toBe('visa');
        expect(detectCardSystem('4012888888881881')).toBe('visa');
    });
    
    test('Detects Visa - 13 digits', () => {
        expect(detectCardSystem('4111111111111')).toBe('visa');
    });
    
    test('Detects Visa - 19 digits (long number)', () => {
        expect(detectCardSystem('4485793877969034264')).toBe('visa');
    });
    
    // Mastercard тесты
    test('Detects Mastercard - 51-55 series', () => {
        expect(detectCardSystem('5555555555554444')).toBe('mastercard');
        expect(detectCardSystem('5105105105105100')).toBe('mastercard');
    });
    
    test('Detects Mastercard - 2221-2720 series (not Mir)', () => {
        expect(detectCardSystem('2221007386808483')).toBe('mastercard');
        expect(detectCardSystem('2720991143456114')).toBe('mastercard');
    });
    
    // American Express тесты
    test('Detects American Express', () => {
        expect(detectCardSystem('378282246310005')).toBe('amex');
        expect(detectCardSystem('371449635398431')).toBe('amex');
    });
    
    // Discover тесты
    test('Detects Discover - 16 digits', () => {
        expect(detectCardSystem('6011111111111117')).toBe('discover');
        expect(detectCardSystem('6011000990139424')).toBe('discover');
        expect(detectCardSystem('6011587232627078')).toBe('discover');
    });
    
    test('Detects Discover - 19 digits (long number)', () => {
        expect(detectCardSystem('6011587232627078455')).toBe('discover');
    });
    
    // JCB тесты
    test('Detects JCB - 16 digits', () => {
        expect(detectCardSystem('3530111333300000')).toBe('jcb');
        expect(detectCardSystem('3566002020360505')).toBe('jcb');
        expect(detectCardSystem('3539570022326708')).toBe('jcb');
    });

    test('Detects JCB - 19 digits (long number)', () => {
        expect(detectCardSystem('3539570022326708342')).toBe('jcb');
    });
    
    // Diners Club тесты
    test('Detects Diners Club', () => {
        expect(detectCardSystem('30569309025904')).toBe('diners');
        expect(detectCardSystem('38520000023237')).toBe('diners');
    });
    
    // МИР тесты
    test('Detects Mir', () => {
        expect(detectCardSystem('2200000000000000')).toBe('mir');
        expect(detectCardSystem('2201382000000013')).toBe('mir');
    });
    
    // Неизвестная карта
    test('Unknown card returns null', () => {
        expect(detectCardSystem('1234567890123456')).toBe(null);
    });
    
    // Обработка пробелов и дефисов
    test('Handles spaces and dashes', () => {
        expect(detectCardSystem('4111 1111 1111 1111')).toBe('visa');
        expect(detectCardSystem('4111-1111-1111-1111')).toBe('visa');
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

describe('Payment Systems List', () => {
    test('Has all 7 systems', () => {
        expect(paymentSystems).toHaveLength(7);
    });
});