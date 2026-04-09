export function detectCardSystem(cardNumber) {
    const cleanNumber = cardNumber.replace(/[\s-]/g, '');

    const firstTwo = cleanNumber.substring(0, 2);
    const firstThree = cleanNumber.substring(0, 3);
    const firstFour = cleanNumber.substring(0, 4);
    const length = cleanNumber.length;

    if ((length === 13 || length === 16 || length === 19) && firstTwo[0] === '4') {
        return 'visa';
    }

    if (length === 15 && (firstTwo === '34' || firstTwo === '37')) {
        return 'amex';
    }
    
    if (length === 14) {
        if ((firstThree >= '300' && firstThree <= '305') || firstTwo === '36' || firstTwo === '38') {
            return 'diners';
        }
    }
    
    if (length === 16) {
        if (firstTwo >= '51' && firstTwo <= '55') {
            return 'mastercard';
        }
        const firstFourNum = parseInt(firstFour);
        if (firstFourNum >= 2221 && firstFourNum <= 2720) {
            return 'mastercard';
        }
    }
    
    if (length >= 16 && length <= 19 && firstTwo[0] === '2') {
        if (length === 16) {
            const firstFourNum = parseInt(firstFour);
            const isMastercard = (firstTwo >= '51' && firstTwo <= '55') || 
                                 (firstFourNum >= 2221 && firstFourNum <= 2720);
            if (!isMastercard) {
                return 'mir';
            }
        } else {
            return 'mir';
        }
    }
    
    if (length >= 16 && length <= 19) {
        if (firstFour === '6011') {
            return 'discover';
        }
        if (firstTwo === '65') {
            return 'discover';
        }
        if (firstThree >= '644' && firstThree <= '649') {
            return 'discover';
        }
        if (length >= 16) {
            const firstSix = parseInt(cleanNumber.substring(0, 6));
            if (firstSix >= 622126 && firstSix <= 622925) {
                return 'discover';
            }
        }
    }
    
    if (length >= 16 && length <= 19) {
        const firstFourNum = parseInt(firstFour);
        if (firstFourNum >= 3528 && firstFourNum <= 3589) {
            return 'jcb';
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

export const paymentSystems = [
    { code: 'visa', name: 'Visa' },
    { code: 'mastercard', name: 'Mastercard' },
    { code: 'amex', name: 'American Express' },
    { code: 'discover', name: 'Discover' },
    { code: 'jcb', name: 'JCB' },
    { code: 'diners', name: 'Diners Club' },
    { code: 'mir', name: 'Мир' }
];