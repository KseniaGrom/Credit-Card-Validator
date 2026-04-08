export function detectCardSystem(cardNumber) {
    const cleanNumber = cardNumber.replace(/[\s-]/g, '');
    
    const patterns = {
        mir: /^2\d{15}$/,
        amex: /^3[47]\d{13}$/,
        diners: /^3(?:0[0-5]|[68]\d)\d{11}$/,
        discover: /^6(?:011|5\d{2})\d{12}$/,
        jcb: /^35\d{14}$/,
        mastercard: /^5[1-5]\d{14}$|^2(?:2[2-9][1-9]|[3-6]\d\d)\d{12}$/,
        visa: /^4\d{15}$|^4\d{12}$/
    };
    
    for (const [system, pattern] of Object.entries(patterns)) {
        if (pattern.test(cleanNumber)) {
            return system;
        }
    }
    
    return null;
}

export function getSystemName(systemCode) {
    const names = {
        visa: 'Visa',
        mastercard: 'Mastercard',
        amex: 'American Express',
        discover: 'Discover',
        jcb: 'JCB',
        diners: 'Diners Club',
        mir: 'Мир'
    };
    return names[systemCode] || 'Unknown';
}