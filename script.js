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
    if (!container) return;
    
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
    
    const hobbyCountElement = document.getElementById('hobby-count');
    const favoriteHobbyElement = document.getElementById('favorite-hobby');
    
    if (hobbyCountElement) hobbyCountElement.textContent = totalHobbies;
    if (favoriteHobbyElement) favoriteHobbyElement.textContent = favoriteHobby;
    
    console.log(`📊 Hobby Stats: ${totalHobbies} total, Favorite: ${favoriteHobby}`);
}

// === DARK MODE FUNCTIONALITY === //
const darkModeToggle = document.getElementById('dark-mode-toggle');

function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (themeIcon && themeText) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark Mode';
        }
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

// === CONTACT FORM WITH VALIDATION === //
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.successMessage = document.getElementById('success-message');
        this.submitBtn = document.getElementById('submit-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.sendAnotherBtn = document.getElementById('send-another');
        this.charCounter = document.getElementById('char-counter');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        console.log("📝 Contact form initialized!");
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        if (this.resetBtn) this.resetBtn.addEventListener('click', () => this.resetForm());
        if (this.sendAnotherBtn) this.sendAnotherBtn.addEventListener('click', () => this.showForm());
        
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
        if (!messageField) return;
        
        messageField.addEventListener('input', () => {
            const length = messageField.value.length;
            if (this.charCounter) this.charCounter.textContent = length;
            
            const charCountElement = this.charCounter?.parentElement;
            if (charCountElement) {
                if (length > 400) {
                    charCountElement.className = 'char-count warning';
                } else if (length > 500) {
                    charCountElement.className = 'char-count error';
                } else {
                    charCountElement.className = 'char-count';
                }
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
        if (field.parentElement) {
            field.parentElement.classList.add('error');
            field.parentElement.classList.remove('success');
        }
        if (errorElement) errorElement.textContent = message;
    }
    
    clearFieldError(field) {
        if (field.parentElement) {
            field.parentElement.classList.remove('error');
            field.parentElement.classList.remove('success');
        }
        
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) errorElement.textContent = '';
        
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
        if (!this.submitBtn) return;
        
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (loading) {
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline';
            this.submitBtn.disabled = true;
        } else {
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }
    
    showSuccess() {
        if (this.form) this.form.style.display = 'none';
        if (this.successMessage) this.successMessage.style.display = 'block';
        
        const formData = this.getFormData();
        console.log('📝 Form data:', formData);
    }
    
    showForm() {
        if (this.form) this.form.style.display = 'block';
        if (this.successMessage) this.successMessage.style.display = 'none';
        this.resetForm();
    }
    
    resetForm() {
        if (this.form) this.form.reset();
        if (this.charCounter) {
            this.charCounter.textContent = '0';
            this.charCounter.parentElement.className = 'char-count';
        }
        
        const formGroups = this.form?.querySelectorAll('.form-group');
        if (formGroups) {
            formGroups.forEach(group => {
                group.classList.remove('error', 'success');
            });
        }
        
        const errorMessages = this.form?.querySelectorAll('.error-message');
        if (errorMessages) {
            errorMessages.forEach(error => {
                error.textContent = '';
            });
        }
        
        this.clearFormStatus();
        console.log("🔄 Form reset");
    }
    
    getFormData() {
        if (!this.form) return {};
        
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }
    
    showFormStatus(message, type) {
        const statusElement = document.getElementById('form-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `form-status ${type}`;
            statusElement.style.display = 'block';
        }
    }
    
    clearFormStatus() {
        const statusElement = document.getElementById('form-status');
        if (statusElement) {
            statusElement.textContent = '';
            statusElement.className = 'form-status';
            statusElement.style.display = 'none';
        }
    }
}

function initializeContactForm() {
    new ContactForm();
}

// === PROJECTS DEMO FUNCTIONALITY === //

// Demo modal management
let currentDemo = null;

// Modal centering function
function centerModal() {
    const demos = document.querySelectorAll('.full-demo');
    demos.forEach(demo => {
        demo.style.position = 'fixed';
        demo.style.top = '50%';
        demo.style.left = '50%';
        demo.style.transform = 'translate(-50%, -50%)';
        demo.style.margin = '0';
        demo.style.zIndex = '1001';
    });
}

// Enhanced closeDemos function
function closeDemos() {
    const fullDemos = document.getElementById('full-demos');
    const demos = document.querySelectorAll('.full-demo');
    
    if (fullDemos) {
        fullDemos.style.display = 'none';
    }
    
    demos.forEach(demo => {
        demo.style.display = 'none';
    });
    
    currentDemo = null;
    console.log("🔒 All demos closed");
}

// Enhanced click outside handler
document.addEventListener('click', function(event) {
    const fullDemos = document.getElementById('full-demos');
    
    if (fullDemos && fullDemos.style.display === 'block') {
        if (event.target === fullDemos) {
            closeDemos();
        }
    }
});

// === PROJECT 1: QUOTE GENERATOR === //
function openQuoteDemo() {
    currentDemo = 'quote';
    const fullDemos = document.getElementById('full-demos');
    const quoteDemo = document.getElementById('quote-demo-full');
    const playgroundDemo = document.getElementById('playground-demo-full');
    const calculatorDemo = document.getElementById('calculator-demo-full');
    const tempDemo = document.getElementById('temp-converter-demo-full');
    const employeeDemo = document.getElementById('employee-demo-full');
    const weatherDemo = document.getElementById('weather-demo-full');
    
    if (fullDemos) {
        fullDemos.style.display = 'block';
        setTimeout(() => { centerModal(); }, 10);
    }
    if (quoteDemo) quoteDemo.style.display = 'block';
    if (playgroundDemo) playgroundDemo.style.display = 'none';
    if (calculatorDemo) calculatorDemo.style.display = 'none';
    if (tempDemo) tempDemo.style.display = 'none';
    if (employeeDemo) employeeDemo.style.display = 'none';
    if (weatherDemo) weatherDemo.style.display = 'none';
    
    initializeQuoteDemo();
}

function initializeQuoteDemo() {
    const fullQuotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "work" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "leadership" },
        { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs", category: "life" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "dreams" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "perseverance" }
    ];

    let quoteCount = 0;

    function displayFullQuote() {
        const randomIndex = Math.floor(Math.random() * fullQuotes.length);
        const quote = fullQuotes[randomIndex];
        
        const quoteText = document.getElementById('full-quote-text');
        const quoteAuthor = document.getElementById('full-quote-author');
        const quoteCategory = document.getElementById('full-quote-category');
        const quoteCountElement = document.getElementById('full-quote-count');
        
        if (quoteText) quoteText.textContent = `"${quote.text}"`;
        if (quoteAuthor) quoteAuthor.textContent = `— ${quote.author}`;
        if (quoteCategory) quoteCategory.textContent = `#${quote.category}`;
        
        quoteCount++;
        if (quoteCountElement) quoteCountElement.textContent = quoteCount;
    }

    const newQuoteBtn = document.getElementById('full-new-quote');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', displayFullQuote);
    }

    displayFullQuote();
}

// === PROJECT 2: JAVASCRIPT PLAYGROUND === //
function openPlaygroundDemo() {
    currentDemo = 'playground';
    const fullDemos = document.getElementById('full-demos');
    const quoteDemo = document.getElementById('quote-demo-full');
    const playgroundDemo = document.getElementById('playground-demo-full');
    const calculatorDemo = document.getElementById('calculator-demo-full');
    const tempDemo = document.getElementById('temp-converter-demo-full');
    const employeeDemo = document.getElementById('employee-demo-full');
    const weatherDemo = document.getElementById('weather-demo-full');
    
    if (fullDemos) {
        fullDemos.style.display = 'block';
        setTimeout(() => { centerModal(); }, 10);
    }
    if (quoteDemo) quoteDemo.style.display = 'none';
    if (playgroundDemo) playgroundDemo.style.display = 'block';
    if (calculatorDemo) calculatorDemo.style.display = 'none';
    if (tempDemo) tempDemo.style.display = 'none';
    if (employeeDemo) employeeDemo.style.display = 'none';
    if (weatherDemo) weatherDemo.style.display = 'none';
    
    initializePlaygroundDemo();
}

function initializePlaygroundDemo() {
    let fullClickCount = 0;

    const fullAlertButton = document.getElementById('full-alert-button');
    if (fullAlertButton) {
        fullAlertButton.addEventListener('click', function() {
            alert("🎊 You clicked me! This is a fully functional demo! 🎊");
        });
    }

    const fullChangeButton = document.getElementById('full-change-button');
    if (fullChangeButton) {
        fullChangeButton.addEventListener('click', function() {
            const messages = [
                "JavaScript is powerful! 💪",
                "You can create amazing things! 🌟",
                "Web development is fun! 🎉",
                "Hello from the full demo! 👋",
                "You're learning fast! 🚀"
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            const messageElement = document.getElementById('full-message');
            if (messageElement) messageElement.textContent = randomMessage;
        });
    }

    const fullToggleButton = document.getElementById('full-toggle-button');
    if (fullToggleButton) {
        fullToggleButton.addEventListener('click', function() {
            const secretMessage = document.getElementById('full-secret-message');
            if (secretMessage) {
                secretMessage.style.display = secretMessage.style.display === "none" ? "block" : "none";
            }
        });
    }

    const fullCounterButton = document.getElementById('full-counter-button');
    if (fullCounterButton) {
        fullCounterButton.addEventListener('click', function() {
            fullClickCount++;
            const counterElement = document.getElementById('full-click-count');
            if (counterElement) {
                counterElement.textContent = fullClickCount;
                if (fullClickCount >= 5) {
                    counterElement.style.color = "var(--secondary)";
                }
            }
        });
    }
}

// Mini preview demos for project cards
function showMiniAlert() {
    alert("This is a mini preview! Click 'Live Demo' for the full interactive experience!");
}

function changeMiniText() {
    const messages = ["Great!", "Awesome!", "Cool!"];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const miniMessage = document.getElementById('mini-message');
    if (miniMessage) miniMessage.textContent = randomMessage;
}

// === PROJECT 3: CALCULATOR APP === //
function openCalculatorDemo() {
    currentDemo = 'calculator';
    const fullDemos = document.getElementById('full-demos');
    const quoteDemo = document.getElementById('quote-demo-full');
    const playgroundDemo = document.getElementById('playground-demo-full');
    const calculatorDemo = document.getElementById('calculator-demo-full');
    const tempDemo = document.getElementById('temp-converter-demo-full');
    const employeeDemo = document.getElementById('employee-demo-full');
    const weatherDemo = document.getElementById('weather-demo-full');
    
    if (fullDemos) {
        fullDemos.style.display = 'block';
        setTimeout(() => { centerModal(); }, 10);
    }
    if (quoteDemo) quoteDemo.style.display = 'none';
    if (playgroundDemo) playgroundDemo.style.display = 'none';
    if (calculatorDemo) calculatorDemo.style.display = 'block';
    if (tempDemo) tempDemo.style.display = 'none';
    if (employeeDemo) employeeDemo.style.display = 'none';
    if (weatherDemo) weatherDemo.style.display = 'none';
    
    initializeCalculator();
}

let currentDisplay = '0';
let shouldResetDisplay = false;

function updateCalculatorDisplay() {
    const display = document.getElementById('calc-display');
    if (display) display.textContent = currentDisplay;
}

function appendToDisplay(value) {
    if (currentDisplay === '0' || shouldResetDisplay) {
        currentDisplay = value;
        shouldResetDisplay = false;
    } else {
        currentDisplay += value;
    }
    updateCalculatorDisplay();
}

function clearCalculator() {
    currentDisplay = '0';
    updateCalculatorDisplay();
}

function deleteLast() {
    if (currentDisplay.length > 1) {
        currentDisplay = currentDisplay.slice(0, -1);
    } else {
        currentDisplay = '0';
    }
    updateCalculatorDisplay();
}

function calculateResult() {
    try {
        const expression = currentDisplay.replace(/×/g, '*');
        currentDisplay = eval(expression).toString();
    } catch (error) {
        currentDisplay = 'Error';
    }
    shouldResetDisplay = true;
    updateCalculatorDisplay();
}

function initializeCalculator() {
    currentDisplay = '0';
    shouldResetDisplay = false;
    updateCalculatorDisplay();
}

// === PROJECT 4: TODO LIST APP === //
function openTodoDemo() {
    alert("Todo List demo coming soon! This shows progressive enhancement.");
}

// === PROJECT 5: TEMPERATURE CONVERTER (DAY 1) === //
function openTempConverterDemo() {
    currentDemo = 'temp-converter';
    const fullDemos = document.getElementById('full-demos');
    const quoteDemo = document.getElementById('quote-demo-full');
    const playgroundDemo = document.getElementById('playground-demo-full');
    const calculatorDemo = document.getElementById('calculator-demo-full');
    const tempDemo = document.getElementById('temp-converter-demo-full');
    const employeeDemo = document.getElementById('employee-demo-full');
    const weatherDemo = document.getElementById('weather-demo-full');
    
    if (fullDemos) {
        fullDemos.style.display = 'block';
        setTimeout(() => { centerModal(); }, 10);
    }
    if (quoteDemo) quoteDemo.style.display = 'none';
    if (playgroundDemo) playgroundDemo.style.display = 'none';
    if (calculatorDemo) calculatorDemo.style.display = 'none';
    if (tempDemo) tempDemo.style.display = 'block';
    if (employeeDemo) employeeDemo.style.display = 'none';
    if (weatherDemo) weatherDemo.style.display = 'none';
    
    initializeTempConverterDemo();
}

function initializeTempConverterDemo() {
    const tempInput = document.getElementById('tempInputModal');
    const resultDiv = document.getElementById('resultModal');
    const convertButtons = document.querySelectorAll('#temp-converter-demo-full .convert-btn');

    if (tempInput) tempInput.value = '';
    if (resultDiv) resultDiv.innerHTML = '';

    const convertTemperature = (value, fromUnit, toUnit) => {
        try {
            if (value === '' || isNaN(value)) {
                throw new Error('Please enter a valid number');
            }

            const numericValue = parseFloat(value);
            let result, formula;

            if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
                result = (numericValue * 9/5) + 32;
                formula = `(${numericValue} × 9/5) + 32`;
            } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
                result = (numericValue - 32) * 5/9;
                formula = `(${numericValue} - 32) × 5/9`;
            } else {
                throw new Error('Invalid conversion type');
            }

            return {
                value: Math.round(result * 100) / 100,
                formula: formula
            };
        } catch (error) {
            throw error;
        }
    };

    const displayResult = (originalValue, fromUnit, toUnit, convertedValue, formula) => {
        const unitSymbols = { celsius: '°C', fahrenheit: '°F' };
        const message = `
            <div class="success-message">
                <strong>${originalValue}${unitSymbols[fromUnit]} = ${convertedValue}${unitSymbols[toUnit]}</strong>
                <br>
                <small>Formula: ${formula}</small>
            </div>
        `;
        if (resultDiv) resultDiv.innerHTML = message;
    };

    const displayError = (message) => {
        if (resultDiv) resultDiv.innerHTML = `<div class="error-message">❌ ${message}</div>`;
    };

    const handleConversion = (fromUnit, toUnit) => {
        const inputValue = tempInput ? tempInput.value.trim() : '';
        try {
            const conversion = convertTemperature(inputValue, fromUnit, toUnit);
            displayResult(inputValue, fromUnit, toUnit, conversion.value, conversion.formula);
        } catch (error) {
            displayError(error.message);
        }
    };

    if (convertButtons) {
        convertButtons.forEach(button => {
            button.addEventListener('click', () => {
                const fromUnit = button.getAttribute('data-from');
                const toUnit = button.getAttribute('data-to');
                handleConversion(fromUnit, toUnit);
            });
        });
    }

    if (tempInput) {
        tempInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const firstButton = convertButtons[0];
                if (firstButton) {
                    const fromUnit = firstButton.getAttribute('data-from');
                    const toUnit = firstButton.getAttribute('data-to');
                    handleConversion(fromUnit, toUnit);
                }
            }
        });
    }
}

function convertTempPreview(type) {
    if (type === 'c-to-f') {
        alert("25°C = 77°F\n\nIn the full demo, you can convert any temperature!");
    } else if (type === 'f-to-c') {
        alert("77°F = 25°C\n\nIn the full demo, you can convert any temperature!");
    }
}

// === PROJECT 6: EMPLOYEE DIRECTORY (DAY 2) === //
const employees = [
    {
        id: 1, name: "Mohammed Yesfi", role: "Frontend Developer", department: "Engineering",
        experience: 2, email: "mohammed@company.com", skills: ["JavaScript", "HTML", "CSS", "React"],
        isActive: true, joinDate: "2023-01-15"
    },
    {
        id: 2, name: "Sarah Johnson", role: "UI/UX Designer", department: "Design",
        experience: 3, email: "sarah@company.com", skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
        isActive: true, joinDate: "2022-08-20"
    },
    {
        id: 3, name: "Alex Chen", role: "Backend Developer", department: "Engineering",
        experience: 4, email: "alex@company.com", skills: ["Node.js", "Python", "MongoDB", "API Design"],
        isActive: true, joinDate: "2021-03-10"
    },
    {
        id: 4, name: "Emma Davis", role: "Project Manager", department: "Management",
        experience: 5, email: "emma@company.com", skills: ["Agile", "Scrum", "Team Leadership", "Client Communication"],
        isActive: true, joinDate: "2020-11-05"
    },
    {
        id: 5, name: "Mike Wilson", role: "DevOps Engineer", department: "Engineering",
        experience: 3, email: "mike@company.com", skills: ["Docker", "AWS", "CI/CD", "Linux"],
        isActive: false, joinDate: "2022-05-15"
    }
];

function openEmployeeDirectoryDemo() {
    currentDemo = 'employee-directory';
    const fullDemos = document.getElementById('full-demos');
    const quoteDemo = document.getElementById('quote-demo-full');
    const playgroundDemo = document.getElementById('playground-demo-full');
    const calculatorDemo = document.getElementById('calculator-demo-full');
    const tempDemo = document.getElementById('temp-converter-demo-full');
    const employeeDemo = document.getElementById('employee-demo-full');
    const weatherDemo = document.getElementById('weather-demo-full');
    
    if (fullDemos) {
        fullDemos.style.display = 'block';
        setTimeout(() => { centerModal(); }, 10);
    }
    if (quoteDemo) quoteDemo.style.display = 'none';
    if (playgroundDemo) playgroundDemo.style.display = 'none';
    if (calculatorDemo) calculatorDemo.style.display = 'none';
    if (tempDemo) tempDemo.style.display = 'none';
    if (employeeDemo) employeeDemo.style.display = 'block';
    if (weatherDemo) weatherDemo.style.display = 'none';
    
    initializeEmployeeDirectory();
}

function initializeEmployeeDirectory() {
    let currentEmployees = loadEmployeesFromStorage();
    if (!currentEmployees.length) {
        currentEmployees = [...employees];
        saveEmployeesToStorage(currentEmployees);
    }
    
    displayEmployees(currentEmployees);
    setupEmployeeDirectoryEvents();
    updateEmployeeStats(currentEmployees);
}

function loadEmployeesFromStorage() {
    try {
        const stored = localStorage.getItem('portfolioEmployees');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading employees:', error);
        return [];
    }
}

function saveEmployeesToStorage(employeesArray) {
    try {
        localStorage.setItem('portfolioEmployees', JSON.stringify(employeesArray));
    } catch (error) {
        console.error('Error saving employees:', error);
    }
}

function displayEmployees(employeesArray) {
    const container = document.getElementById('employeesContainer');
    if (!container) return;
    
    const employeesHTML = employeesArray.map(employee => `
        <div class="employee-card" data-id="${employee.id}">
            <div class="employee-header">
                <h4>${employee.name}</h4>
                <span class="employee-status ${employee.isActive ? 'active' : 'inactive'}">
                    ${employee.isActive ? '🟢 Active' : '🔴 Inactive'}
                </span>
            </div>
            <div class="employee-details">
                <p><strong>Role:</strong> ${employee.role}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>Experience:</strong> ${employee.experience} years</p>
                <p><strong>Email:</strong> ${employee.email}</p>
            </div>
            <div class="employee-skills">
                <strong>Skills:</strong>
                ${employee.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="employee-actions">
                <button class="action-btn edit-btn" onclick="editEmployee(${employee.id})">✏️ Edit</button>
                <button class="action-btn delete-btn" onclick="deleteEmployee(${employee.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = employeesHTML;
}

function updateEmployeeStats(employeesArray) {
    const statsContainer = document.getElementById('employeeStats');
    if (!statsContainer) return;
    
    const totalEmployees = employeesArray.length;
    const activeEmployees = employeesArray.filter(emp => emp.isActive).length;
    const totalExperience = employeesArray.reduce((sum, emp) => sum + emp.experience, 0);
    const avgExperience = totalExperience / totalEmployees;
    
    statsContainer.innerHTML = `
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-number">${totalEmployees}</span>
                <span class="stat-label">Total Employees</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${activeEmployees}</span>
                <span class="stat-label">Active</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${Math.round(avgExperience * 10) / 10}</span>
                <span class="stat-label">Avg. Experience (years)</span>
            </div>
        </div>
    `;
}

function setupEmployeeDirectoryEvents() {
    const searchInput = document.getElementById('employeeSearch');
    const sortSelect = document.getElementById('sortSelect');
    const addButton = document.getElementById('addEmployeeBtn');
    
    if (searchInput) searchInput.addEventListener('input', handleEmployeeSearch);
    if (sortSelect) sortSelect.addEventListener('change', handleEmployeeSort);
    if (addButton) addButton.addEventListener('click', addNewEmployee);
}

function handleEmployeeSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const currentEmployees = loadEmployeesFromStorage();
    
    const filteredEmployees = currentEmployees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.role.toLowerCase().includes(searchTerm) ||
        employee.department.toLowerCase().includes(searchTerm) ||
        employee.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
    
    displayEmployees(filteredEmployees);
    updateEmployeeStats(filteredEmployees);
}

function handleEmployeeSort(event) {
    const sortBy = event.target.value;
    const currentEmployees = loadEmployeesFromStorage();
    
    const sortedEmployees = [...currentEmployees].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'role') return a.role.localeCompare(b.role);
        if (sortBy === 'experience') return b.experience - a.experience;
        return 0;
    });
    
    displayEmployees(sortedEmployees);
}

function addNewEmployee() {
    const newEmployee = {
        id: Date.now(),
        name: "New Employee",
        role: "New Role",
        department: "New Department",
        experience: 1,
        email: "new@company.com",
        skills: ["New Skill"],
        isActive: true,
        joinDate: new Date().toISOString().split('T')[0]
    };
    
    const currentEmployees = loadEmployeesFromStorage();
    currentEmployees.push(newEmployee);
    saveEmployeesToStorage(currentEmployees);
    displayEmployees(currentEmployees);
    updateEmployeeStats(currentEmployees);
    
    alert("New employee added! In a real app, you'd use a form to input details.");
}

function editEmployee(employeeId) {
    alert(`Edit employee ${employeeId} - This would open an edit form in a real application.`);
}

function deleteEmployee(employeeId) {
    if (confirm('Are you sure you want to delete this employee?')) {
        const currentEmployees = loadEmployeesFromStorage();
        const updatedEmployees = currentEmployees.filter(emp => emp.id !== employeeId);
        saveEmployeesToStorage(updatedEmployees);
        displayEmployees(updatedEmployees);
        updateEmployeeStats(updatedEmployees);
    }
}

function showEmployeePreview() {
    alert("👥 Employee Directory Preview!\n\nThis demonstrates:\n• Object arrays\n• JSON handling\n• Dynamic filtering\n• Local storage");
}

// === PROJECT 7: WEATHER APP (DAY 3-7) === //
function openWeatherAppDemo() {
    currentDemo = 'weather-app';
    const fullDemos = document.getElementById('full-demos');
    const quoteDemo = document.getElementById('quote-demo-full');
    const playgroundDemo = document.getElementById('playground-demo-full');
    const calculatorDemo = document.getElementById('calculator-demo-full');
    const tempDemo = document.getElementById('temp-converter-demo-full');
    const employeeDemo = document.getElementById('employee-demo-full');
    const weatherDemo = document.getElementById('weather-demo-full');
    
    if (fullDemos) {
        fullDemos.style.display = 'block';
        setTimeout(() => { centerModal(); }, 10);
    }
    if (quoteDemo) quoteDemo.style.display = 'none';
    if (playgroundDemo) playgroundDemo.style.display = 'none';
    if (calculatorDemo) calculatorDemo.style.display = 'none';
    if (tempDemo) tempDemo.style.display = 'none';
    if (employeeDemo) employeeDemo.style.display = 'none';
    if (weatherDemo) weatherDemo.style.display = 'block';
    
    initializeWeatherApp();
}

let isCelsius = true;

async function initializeWeatherApp() {
    const searchInput = document.getElementById('weatherSearch');
    const searchBtn = document.getElementById('searchWeatherBtn');
    const locationBtn = document.getElementById('useLocationBtn');
    const toggleUnits = document.getElementById('toggleUnits');

    if (searchBtn) {
        searchBtn.addEventListener('click', handleWeatherSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleWeatherSearch();
        });
    }

    if (locationBtn) {
        locationBtn.addEventListener('click', handleLocationWeather);
    }

    if (toggleUnits) {
        toggleUnits.addEventListener('click', toggleTemperatureUnits);
    }

    // Load default city weather
    fetchWeatherData('London');
}

async function handleWeatherSearch() {
    const searchInput = document.getElementById('weatherSearch');
    const city = searchInput.value.trim();
    
    if (city) {
        await fetchWeatherData(city);
    } else {
        showWeatherError('Please enter a city name');
    }
}

async function handleLocationWeather() {
    if (!navigator.geolocation) {
        showWeatherError('Geolocation is not supported by your browser');
        return;
    }

    showWeatherLoading();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
            showWeatherError('Unable to retrieve your location');
            console.error('Geolocation error:', error);
        }
    );
}

async function fetchWeatherData(city) {
    showWeatherLoading();
    
    try {
        // Using OpenWeatherMap API (you'll need to replace with your API key)
        const API_KEY = 'demo_key'; // Replace with actual API key
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeatherData(data);
        
    } catch (error) {
        console.error('Weather API error:', error);
        showWeatherError('City not found. Please try again.');
    }
}

async function fetchWeatherByCoords(lat, lon) {
    try {
        const API_KEY = 'demo_key'; // Replace with actual API key
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        displayWeatherData(data);
        
    } catch (error) {
        console.error('Weather API error:', error);
        showWeatherError('Unable to fetch weather data for your location');
    }
}

function displayWeatherData(data) {
    const cityElement = document.getElementById('weatherCity');
    const tempElement = document.getElementById('weatherTemperature');
    const descElement = document.getElementById('weatherDescription');
    const windElement = document.getElementById('weatherWind');
    const humidityElement = document.getElementById('weatherHumidity');
    const pressureElement = document.getElementById('weatherPressure');
    const emojiElement = document.getElementById('weatherEmoji');

    if (cityElement) cityElement.textContent = `${data.name}, ${data.sys.country}`;
    
    let temperature = Math.round(data.main.temp);
    if (!isCelsius) {
        temperature = Math.round((temperature * 9/5) + 32);
    }
    
    if (tempElement) tempElement.textContent = `${temperature}°${isCelsius ? 'C' : 'F'}`;
    if (descElement) descElement.textContent = data.weather[0].description;
    if (windElement) windElement.textContent = `${data.wind.speed} m/s`;
    if (humidityElement) humidityElement.textContent = `${data.main.humidity}%`;
    if (pressureElement) pressureElement.textContent = `${data.main.pressure} hPa`;
    
    // Set weather emoji
    const weatherMain = data.weather[0].main.toLowerCase();
    const emoji = getWeatherEmoji(weatherMain);
    if (emojiElement) emojiElement.textContent = emoji;

    showWeatherContent();
}

function getWeatherEmoji(weather) {
    const emojiMap = {
        'clear': '☀️',
        'clouds': '☁️',
        'rain': '🌧️',
        'drizzle': '🌦️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️',
        'smoke': '💨',
        'haze': '🌫️',
        'dust': '💨',
        'fog': '🌫️',
        'sand': '💨',
        'ash': '💨',
        'squall': '💨',
        'tornado': '🌪️'
    };
    
    return emojiMap[weather] || '🌤️';
}

function toggleTemperatureUnits() {
    isCelsius = !isCelsius;
    const toggleBtn = document.getElementById('toggleUnits');
    const tempElement = document.getElementById('weatherTemperature');
    
    if (toggleBtn) {
        toggleBtn.textContent = isCelsius ? '°C / °F' : '°F / °C';
    }
    
    // Re-fetch data with new units
    const cityElement = document.getElementById('weatherCity');
    if (cityElement && cityElement.textContent !== '--') {
        const city = cityElement.textContent.split(',')[0];
        fetchWeatherData(city);
    }
}

function showWeatherLoading() {
    const loading = document.getElementById('weatherLoading');
    const content = document.getElementById('weatherContent');
    const error = document.getElementById('weatherError');
    
    if (loading) loading.style.display = 'block';
    if (content) content.style.display = 'none';
    if (error) error.style.display = 'none';
}

function showWeatherContent() {
    const loading = document.getElementById('weatherLoading');
    const content = document.getElementById('weatherContent');
    const error = document.getElementById('weatherError');
    
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'block';
    if (error) error.style.display = 'none';
}

function showWeatherError(message) {
    const loading = document.getElementById('weatherLoading');
    const content = document.getElementById('weatherContent');
    const error = document.getElementById('weatherError');
    
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'none';
    if (error) {
        error.style.display = 'block';
        error.innerHTML = `<p>❌ ${message}</p>`;
    }
}

function showWeatherPreview() {
    alert("🌤️ Weather App Preview!\n\nThis demonstrates:\n• API integration\n• Async/await\n• Geolocation\n• Error handling");
}

// === INITIALIZE EVERYTHING === //
function initializeProjectsPage() {
    console.log("🎯 Projects page initialized with full demos!");
    closeDemos();
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && currentDemo) {
            closeDemos();
            return;
        }
        
        if (currentDemo === 'calculator') {
            if (event.key >= '0' && event.key <= '9') appendToDisplay(event.key);
            else if (event.key === '+') appendToDisplay('+');
            else if (event.key === '-') appendToDisplay('-');
            else if (event.key === '*') appendToDisplay('×');
            else if (event.key === '/') appendToDisplay('/');
            else if (event.key === '.') appendToDisplay('.');
            else if (event.key === 'Enter' || event.key === '=') calculateResult();
            else if (event.key === 'Escape') clearCalculator();
            else if (event.key === 'Backspace') deleteLast();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 Page loaded, initializing everything...");
    
    initializeTheme();
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleTheme);
    }
    
    const isProjectsPage = window.location.pathname.includes('projects.html') || document.getElementById('projects-grid');
    const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/' || document.getElementById('hobbies-container');
    
    if (isProjectsPage) initializeProjectsPage();
    if (isHomePage) {
        demonstrateLoops();
        displayHobbies();
        initializeContactForm();
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.key === "a" || event.key === "A") {
            alert("🎊 Keyboard shortcuts working! Great job! 🎊");
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
