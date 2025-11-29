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

// === ENHANCED PROJECTS PAGE FUNCTIONALITY === //

// Demo modal management
let currentDemo = null;

function openQuoteDemo() {
    currentDemo = 'quote';
    const fullDemos = document.getElementById('full-demos');
    const quoteDemo = document.getElementById('quote-demo-full');
    const playgroundDemo = document.getElementById('playground-demo-full');
    const calculatorDemo = document.getElementById('calculator-demo-full');
    
    if (fullDemos) fullDemos.style.display = 'block';
    if (quoteDemo) quoteDemo.style.display = 'block';
    if (playgroundDemo) playgroundDemo.style.display = 'none';
    if (calculatorDemo) calculatorDemo.style.display = 'none';
    
    initializeQuoteDemo();
}

function openPlaygroundDemo() {
    currentDemo = 'playground';
    const fullDemos = document.getElementById('full-demos');
    const quoteDemo = document.getElementById('quote-demo-full');
    const playgroundDemo = document.getElementById('playground-demo-full');
    const calculatorDemo = document.getElementById('calculator-demo-full');
    
    if (fullDemos) fullDemos.style.display = 'block';
    if (quoteDemo) quoteDemo.style.display = 'none';
    if (playgroundDemo) playgroundDemo.style.display = 'block';
    if (calculatorDemo) calculatorDemo.style.display = 'none';
    
    initializePlaygroundDemo();
}

function openCalculatorDemo() {
    currentDemo = 'calculator';
    const fullDemos = document.getElementById('full-demos');
    const quoteDemo = document.getElementById('quote-demo-full');
    const playgroundDemo = document.getElementById('playground-demo-full');
    const calculatorDemo = document.getElementById('calculator-demo-full');
    
    if (fullDemos) fullDemos.style.display = 'block';
    if (quoteDemo) quoteDemo.style.display = 'none';
    if (playgroundDemo) playgroundDemo.style.display = 'none';
    if (calculatorDemo) calculatorDemo.style.display = 'block';
    
    initializeCalculator();
}

function openTodoDemo() {
    alert("Todo List demo coming soon! This shows progressive enhancement.");
}

// FIXED: Enhanced closeDemos function
function closeDemos() {
    const fullDemos = document.getElementById('full-demos');
    const demos = document.querySelectorAll('.full-demo');
    
    if (fullDemos) {
        fullDemos.style.display = 'none';
    }
    
    // Hide all individual demo modals
    demos.forEach(demo => {
        demo.style.display = 'none';
    });
    
    currentDemo = null;
    console.log("🔒 All demos closed");
}

// FIXED: Enhanced click outside handler
document.addEventListener('click', function(event) {
    const fullDemos = document.getElementById('full-demos');
    
    if (fullDemos && fullDemos.style.display === 'block') {
        // Check if click is on the overlay background (not the modal content)
        if (event.target === fullDemos) {
            closeDemos();
        }
    }
});

// Quote Generator Demo
function initializeQuoteDemo() {
    const fullQuotes = [
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

    // Add event listener
    const newQuoteBtn = document.getElementById('full-new-quote');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', displayFullQuote);
    }

    // Display first quote
    displayFullQuote();
}

// JavaScript Playground Demo
function initializePlaygroundDemo() {
    let fullClickCount = 0;

    // Alert Button
    const fullAlertButton = document.getElementById('full-alert-button');
    if (fullAlertButton) {
        fullAlertButton.addEventListener('click', function() {
            alert("🎊 You clicked me! This is a fully functional demo! 🎊");
        });
    }

    // Change Text Button
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

    // Toggle Button
    const fullToggleButton = document.getElementById('full-toggle-button');
    if (fullToggleButton) {
        fullToggleButton.addEventListener('click', function() {
            const secretMessage = document.getElementById('full-secret-message');
            if (secretMessage) {
                if (secretMessage.style.display === "none") {
                    secretMessage.style.display = "block";
                } else {
                    secretMessage.style.display = "none";
                }
            }
        });
    }

    // Counter Button
    const fullCounterButton = document.getElementById('full-counter-button');
    if (fullCounterButton) {
        fullCounterButton.addEventListener('click', function() {
            fullClickCount++;
            const counterElement = document.getElementById('full-click-count');
            if (counterElement) {
                counterElement.textContent = fullClickCount;
                
                // Change color after 5 clicks
                if (fullClickCount >= 5) {
                    counterElement.style.color = "var(--secondary)";
                }
            }
        });
    }
}

// Calculator Demo
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
        // Replace × with * for evaluation
        const expression = currentDisplay.replace(/×/g, '*');
        currentDisplay = eval(expression).toString();
    } catch (error) {
        currentDisplay = 'Error';
    }
    shouldResetDisplay = true;
    updateCalculatorDisplay();
}

function initializeCalculator() {
    // Reset calculator state
    currentDisplay = '0';
    shouldResetDisplay = false;
    updateCalculatorDisplay();
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

// Initialize projects page
function initializeProjectsPage() {
    console.log("🎯 Projects page initialized with full demos!");
    
    // Ensure all demos start closed
    closeDemos();
    
    // Add keyboard support for demos
    document.addEventListener('keydown', function(event) {
        // Close demo with Escape key
        if (event.key === 'Escape' && currentDemo) {
            closeDemos();
            return;
        }
        
        if (currentDemo === 'calculator') {
            // Calculator keyboard support
            if (event.key >= '0' && event.key <= '9') {
                appendToDisplay(event.key);
            } else if (event.key === '+') {
                appendToDisplay('+');
            } else if (event.key === '-') {
                appendToDisplay('-');
            } else if (event.key === '*') {
                appendToDisplay('×');
            } else if (event.key === '/') {
                appendToDisplay('/');
            } else if (event.key === '.') {
                appendToDisplay('.');
            } else if (event.key === 'Enter' || event.key === '=') {
                calculateResult();
            } else if (event.key === 'Escape') {
                clearCalculator();
            } else if (event.key === 'Backspace') {
                deleteLast();
            }
        }
    });
}

// === INITIALIZE EVERYTHING === //
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 Page loaded, initializing everything...");
    
    // Initialize theme (works on both pages)
    initializeTheme();
    
    // Initialize dark mode toggle (works on both pages)
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleTheme);
    }
    
    // Check which page we're on and initialize accordingly
    const isProjectsPage = window.location.pathname.includes('projects.html') || 
                          document.getElementById('projects-grid');
    
    const isHomePage = window.location.pathname.includes('index.html') || 
                      window.location.pathname === '/' ||
                      document.getElementById('hobbies-container');
    
    // Initialize projects page features
    if (isProjectsPage) {
        initializeProjectsPage();
    }
    
    // Initialize homepage features
    if (isHomePage) {
        demonstrateLoops();
        displayHobbies();
        initializeContactForm();
    }
    
    // Global keyboard shortcut
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

// Add this to your initializeProjectsPage() function or create a new function
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

// Call this when opening any demo
function openQuoteDemo() {
    currentDemo = 'quote';
    const fullDemos = document.getElementById('full-demos');
    const quoteDemo = document.getElementById('quote-demo-full');
    const playgroundDemo = document.getElementById('playground-demo-full');
    const calculatorDemo = document.getElementById('calculator-demo-full');
    
    if (fullDemos) {
        fullDemos.style.display = 'block';
        // Force centering
        setTimeout(() => {
            centerModal();
        }, 10);
    }
    if (quoteDemo) quoteDemo.style.display = 'block';
    if (playgroundDemo) playgroundDemo.style.display = 'none';
    if (calculatorDemo) calculatorDemo.style.display = 'none';
    
    initializeQuoteDemo();
}

// Add this to your script.js for the temperature converter preview
function convertTempPreview(type) {
    if (type === 'c-to-f') {
        alert("25°C = 77°F\n\nIn the full demo, you can convert any temperature!");
    } else if (type === 'f-to-c') {
        alert("77°F = 25°C\n\nIn the full demo, you can convert any temperature!");
    }
}
