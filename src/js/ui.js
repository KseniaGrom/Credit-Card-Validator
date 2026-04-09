import { paymentSystems, detectCardSystem } from './cardDetector.js';

export class UI {
    constructor() {
        this.cardIcons = [];
        this.resultDiv = document.getElementById('result');
        this.cardInput = document.getElementById('cardNumber');
        
        this.renderCardsIcons();
        this.initEventListeners();
    }

    renderCardsIcons() {
        const cardsContainer = document.getElementById('cardsIcons');
        if (!cardsContainer) return;
        
        cardsContainer.innerHTML = '';
        
        paymentSystems.forEach(system => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card-icon';
            cardDiv.dataset.card = system.code;
            
            const img = document.createElement('img');
            img.src = `images/${system.code}.png`;
            img.alt = system.name;
            
            cardDiv.appendChild(img);
            cardsContainer.appendChild(cardDiv);
            
            this.cardIcons.push(cardDiv);
        });
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
    
    getSystemDisplayName(systemCode) {
        const system = paymentSystems.find(s => s.code === systemCode);
        return system ? system.name : systemCode;
    }
    
    clearResult() {
        this.resultDiv.style.display = 'none';
        this.resultDiv.classList.remove('valid', 'invalid');
    }
}