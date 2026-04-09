export function validateLuhn(cardNumber) {
    const cleanNumber = cardNumber.replace(/[\s-]/g, '');
    
    if (!/^\d+$/.test(cleanNumber)) {
        return false;
    }
    
    let sum = 0;
    let isEven = false;
    
    // Идём справа налево
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber[i], 10);
        
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

export function isValidLength(cardNumber) {
    const cleanNumber = cardNumber.replace(/[\s-]/g, '');
    const length = cleanNumber.length;
    // Допустимые длины: 13-19 цифр
    return length >= 13 && length <= 19;
}