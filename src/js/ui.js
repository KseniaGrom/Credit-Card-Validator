import { detectCardSystem } from './cardDetector.js';

export class UI {
    constructor() {
        this.cardIcons = document.querySelectorAll('.card-icon');
        this.resultDiv = document.getElementById('result');
        this.cardInput = document.getElementById('cardNumber');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        if (this.cardInput) {
            this.cardInput.addEventListener('input', (e) => {
                this.formatCardNumber(e.target);
                this.highlightCardSystem(e.target.value);
            });
        }
    }
    
    formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = value.match(/.{1,4}/g).join(' ');
        }
        
        input.value = value;
    }
    
    highlightCardSystem(cardNumber) {
        const system = detectCardSystem(cardNumber);
        
        this.cardIcons.forEach(icon => {
            icon.classList.remove('active');
            if (system && icon.dataset.card === system) {
                icon.classList.add('active');
            }
        });
    }
    
    showResult(isValid, system = null) {
        this.resultDiv.className = 'result';
        this.resultDiv.style.display = 'block';
        
        if (isValid) {
            this.resultDiv.classList.add('valid');
            const systemText = system ? ` (${this.getSystemDisplayName(system)})` : '';
            this.resultDiv.textContent = `✅ Карта действительна${systemText}`;
        } else {
            this.resultDiv.classList.add('invalid');
            this.resultDiv.textContent = '❌ Неверный номер карты';
        }
        
        setTimeout(() => {
            this.resultDiv.style.display = 'none';
        }, 3000);
    }
    
    getSystemDisplayName(system) {
        const names = {
            visa: 'Visa',
            mastercard: 'Mastercard',
            amex: 'American Express',
            discover: 'Discover',
            jcb: 'JCB',
            diners: 'Diners Club',
            mir: 'Мир'
        };
        return names[system] || system;
    }
    
    clearResult() {
        this.resultDiv.style.display = 'none';
        this.resultDiv.classList.remove('valid', 'invalid');
    }
}