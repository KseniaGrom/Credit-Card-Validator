import '../css/style.css';

import { validateLuhn, isValidLength } from './cardValidator.js';
import { detectCardSystem } from './cardDetector.js';
import { UI } from './ui.js';

class CreditCardValidator {
    constructor() {
        this.ui = new UI();
        this.init();
    }
    
    init() {
        const validateBtn = document.getElementById('validateBtn');
        const cardInput = document.getElementById('cardNumber');
        
        if (validateBtn) {
            validateBtn.addEventListener('click', () => {
                this.validate();
            });
        }
        
        if (cardInput) {
            cardInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.validate();
                }
            });
        }
    }
    
    validate() {
        const cardInput = document.getElementById('cardNumber');
        const cardNumber = cardInput.value;
        
        if (!cardNumber) {
            this.ui.showResult(false);
            return;
        }
        
        const isValidLuhn = validateLuhn(cardNumber);
        const validLength = isValidLength(cardNumber);
        const isValid = isValidLuhn && validLength;
        
        if (isValid) {
            const system = detectCardSystem(cardNumber);
            this.ui.showResult(true, system);
        } else {
            this.ui.showResult(false);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CreditCardValidator();
});