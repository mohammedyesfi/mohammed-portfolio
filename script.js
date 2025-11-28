// === COMPLETE JAVASCRIPT FOR MOHAMMED'S PORTFOLIO === //

console.log("🚀 Mohammed's Portfolio JavaScript Loaded!");

// === ARRAYS & LOOPS - DYNAMIC HOBBIES === //
const hobbies = [
    {
        title: "Horse Riding",
        description: "There's something magical about connecting with these majestic animals and riding through nature. The bond between rider and horse is truly special.",
        icon: "🐎",
        image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        alt: "A person riding a horse in a field",
        favorite: true
    },
    {
        title: "Drawing & Art",
        description: "Expressing creativity through pencil and paper helps me see the world from different perspectives. I love sketching landscapes and portraits.",
        icon: "🎨",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        alt: "Art supplies and drawings on a table",
        favorite: false
    },
    {
        title: "Coffee Enthusiast",
        description: "Exploring different coffee brewing methods and enjoying the perfect cup is my daily ritual. From pour-over to espresso, each method has its charm.",
        icon: "☕",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        alt: "A cup of coffee with latte art",
        favorite: false
    },
    {
        title: "Web Development",
        description: "Building websites and learning new technologies is both my passion and profession. I love creating interactive and beautiful user experiences.",
        icon: "💻",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        alt: "Code on a computer screen",
        favorite: true
    }
];

function demonstrateLoops() {
    console.log("=== FOR LOOP DEMONSTRATION ===");
    
    console.log("📋 All hobbies:");
    hobbies.forEach((hobby, index) => {
        console.log(`${index + 1}. ${hobby.title} ${hobby.icon}`);
    });
}

function displayHobbies() {
    const container = document.getElementById('hobbies-container');
    container.innerHTML = '';
    
    console.log("🎨 Displaying hobbies dynamically...");
    
    hobbies.forEach((hobby, index) => {
        const hobbyHTML = `
            <div class="hobby-item" data-hobby="${hobby.title.toLowerCase()}">
                <span class="hobby-icon">${hobby.icon}</span>
                <strong class="hobby-title">${hobby.title}</strong>
                <p class="hobby-description">${hobby.description}</p>
                <img src="${hobby.image}" alt="${hobby.alt}" class="hobby-image" width="300">
                ${hobby.favorite ? '<div class="favorite-badge">⭐ Favorite</div>' : ''}
            </div>
        `;
        
        container.innerHTML += hobbyHTML;
        console.log(`✅ Added hobby: ${hobby.title}`);
    });
    
    updateHobbyStats();
}

function updateHobbyStats() {
    const totalHobbies = hobbies.length;
    const favoriteHobbies = hobbies.filter(hobby => hobby.favorite);
    const favoriteHobby = favoriteHobbies.length > 0 ? favoriteHobbies[0].title : hobbies[0].title;
    
    document.getElementById('hobby-count').textContent = totalHobbies;
    document.getElementById('favorite-hobby').textContent = favoriteHobby;
    
    console.log(`📊 Hobby Stats: ${totalHobbies} total, Favorite: ${favoriteHobby}`);
}

// === QUOTE GENERATOR FUNCTIONALITY === //
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "work"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs", 
        category: "leadership"
    },
    {
        text: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs",
        category: "life"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "dreams"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "perseverance"
    }
];

let quoteCount = 0;
let currentQuoteIndex = -1;

function getRandomQuote() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex && quotes.length > 1);
    
    currentQuoteIndex = newIndex;
    return quotes[newIndex];
}

function displayQuote() {
    const quote = getRandomQuote();
    const quoteDisplay = document.getElementById('quote-display');
    
    quoteDisplay.innerHTML = `
        <p class="quote-text">"${quote.text}"</p>
        <p class="quote-author">— ${quote.author}</p>
        <span class="quote-category">#${quote.category}</span>
    `;
    
    quoteCount++;
    document.getElementById('quote-count').textContent = quoteCount;
    
    console.log(`📖 Displayed quote: "${quote.text}" by ${quote.author}`);
}

function initializeQuoteGenerator() {
    displayQuote();
    
    const newQuoteBtn = document.getElementById('new-quote');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', displayQuote);
    }
    
    console.log("💬 Quote generator initialized!");
}

// === CONTACT FORM WITH VALIDATION === //
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.successMessage = document.getElementById('success-message');
        this.submitBtn = document.getElementById('submit-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.sendAnotherBtn = document.getElementById('send-another');
        this.charCounter = document.getElementById('char-counter');
        
        this.init();
    }
    
    init() {
        console.log("📝 Contact form initialized!");
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.resetBtn.addEventListener('click', () => this.resetForm());
        this.sendAnotherBtn.addEventListener('click', () => this.showForm());
        
        this.setupRealTimeValidation();
        this.setupCharacterCounter();
    }
    
    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }
    
    setupCharacterCounter() {
        const messageField = document.getElementById('message');
        
        messageField.addEventListener('input', () => {
            const length = messageField.value.length;
            this.charCounter.textContent = length;
            
            if (length > 400) {
                this.charCounter.parentElement.className = 'char-count warning';
            } else if (length > 500) {
                this.charCounter.parentElement.className = 'char-count error';
            } else {
                this.charCounter.parentElement.className = 'char-count';
            }
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        this.clearFieldError(field);
        
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, errorElement, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, errorElement, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (fieldName === 'message' && value) {
            if (value.length > 500) {
                this.showFieldError(field, errorElement, 'Message must be less than 500 characters');
                return false;
            }
        }
        
        field.parentElement.classList.add('success');
        return true;
    }
    
    showFieldError(field, errorElement, message) {
        field.parentElement.classList.add('error');
        field.parentElement.classList.remove('success');
        errorElement.textContent = message;
    }
    
    clearFieldError(field) {
        field.parentElement.classList.remove('error');
        field.parentElement.classList.remove('success');
        
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        this.clearFormStatus();
    }
    
    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        console.log("📤 Form submission started...");
        
        if (!this.validateForm()) {
            this.showFormStatus('Please fix the errors above', 'error');
            return;
        }
        
        this.setLoadingState(true);
        
        try {
            await this.simulateSubmission();
            this.showSuccess();
            console.log("✅ Form submitted successfully!");
            
        } catch (error) {
            this.showFormStatus('Sorry, there was an error sending your message. Please try again.', 'error');
            console.error("❌ Form submission error:", error);
        } finally {
            this.setLoadingState(false);
        }
    }
    
    async simulateSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.1) {
                    reject(new Error('Simulated server error'));
                } else {
                    resolve();
                }
            }, 2000);
        });
    }
    
    setLoadingState(loading) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (loading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            this.submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }
    
    showSuccess() {
        this.form.style.display = 'none';
        this.successMessage.style.display = 'block';
        
        const formData = this.getFormData();
        console.log('📝 Form data:', formData);
    }
    
    showForm() {
        this.form.style.display = 'block';
        this.successMessage.style.display = 'none';
        this.resetForm();
    }
    
    resetForm() {
        this.form.reset();
        this.charCounter.textContent = '0';
        this.charCounter.parentElement.className = 'char-count';
        
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
        });
        
        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        this.clearFormStatus();
        console.log("🔄 Form reset");
    }
    
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }
    
    showFormStatus(message, type) {
        const statusElement = document.getElementById('form-status');
        statusElement.textContent = message;
        statusElement.className = `form-status ${type}`;
    }
    
    clearFormStatus() {
        const statusElement = document.getElementById('form-status');
        statusElement.textContent = '';
        statusElement.className = 'form-status';
        statusElement.style.display = 'none';
    }
}

function initializeContactForm() {
    new ContactForm();
}

// === DARK MODE FUNCTIONALITY === //
const darkModeToggle = document.getElementById('dark-mode-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeText = document.querySelector('.theme-text');

function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
    }
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    console.log(`Theme changed to: ${newTheme} mode`);
}

function initializeTheme() {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
    console.log(`Initial theme: ${preferredTheme}`);
}

// === JAVASCRIPT DEMO FUNCTIONS === //
function showAlert() {
    alert("🎊 You clicked me, Mohammed! Great job with JavaScript! 🎊");
    console.log("Alert button was clicked!");
}

function changeMessage() {
    const messageElement = document.getElementById('message');
    const messages = [
        "JavaScript is powerful! 💪",
        "You can create amazing things! 🌟",
        "Web development is fun! 🎉",
        "Hello from JavaScript! 👋",
        "You're learning fast! 🚀"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    messageElement.textContent = randomMessage;
    console.log("Message changed to: " + randomMessage);
}

function toggleSecretMessage() {
    const secretMessage = document.getElementById('secret-message');
    if (secretMessage.style.display === "none") {
        secretMessage.style.display = "block";
        console.log("Secret message revealed!");
    } else {
        secretMessage.style.display = "none";
        console.log("Secret message hidden!");
    }
}

let clickCount = 0;
function increaseCounter() {
    clickCount++;
    const counterElement = document.getElementById('click-count');
    counterElement.textContent = clickCount;
    console.log("Counter increased to: " + clickCount);
    if (clickCount >= 10) {
        counterElement.style.color = "var(--secondary)";
        counterElement.style.fontWeight = "bold";
    }
}

// === INITIALIZE EVERYTHING === //
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 Page loaded, initializing everything...");
    
    // Initialize theme
    initializeTheme();
    
    // Initialize dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleTheme);
    }
    
    // Initialize JavaScript demo buttons
    document.getElementById("alert-button")?.addEventListener("click", showAlert);
    document.getElementById("change-text-button")?.addEventListener("click", changeMessage);
    document.getElementById("toggle-button")?.addEventListener("click", toggleSecretMessage);
    document.getElementById("counter-button")?.addEventListener("click", increaseCounter);
    
    // Initialize arrays & loops features
    demonstrateLoops();
    displayHobbies();
    
    // Initialize quote generator
    initializeQuoteGenerator();
    
    // Initialize contact form
    initializeContactForm();
    
    // Keyboard shortcut
    document.addEventListener('keydown', function(event) {
        if (event.key === "a" || event.key === "A") {
            showAlert();
        }
    });
    
    console.log("✅ Everything initialized successfully!");
});

// Utility function
function simpleCalculator(num1, num2, operation) {
    if (operation === "+") return num1 + num2;
    if (operation === "-") return num1 - num2;
    if (operation === "*") return num1 * num2;
    if (operation === "/") return num2 !== 0 ? num1 / num2 : "Cannot divide by zero!";
    return "Invalid operation";
}
