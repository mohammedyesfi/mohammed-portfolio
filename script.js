// === JAVASCRIPT FUNCTIONS & EVENTS === //

console.log("🚀 JavaScript Functions & Events Loaded!");

// 1. SIMPLE FUNCTION
function sayHello() {
    console.log("Hello from a function!");
}

// Call the function
sayHello();

// 2. FUNCTION WITH PARAMETERS
function greetPerson(name) {
    return "Hello, " + name + "! 👋";
}

// 3. FUNCTION WITH MULTIPLE PARAMETERS
function introduce(name, age, hobby) {
    return `My name is ${name}, I'm ${age} years old, and I love ${hobby}.`;
}

// Test the functions
console.log(greetPerson("Mohammed"));
console.log(introduce("Mohammed", 24, "coding"));

// 4. MINI PROJECT: CLICK EVENT FUNCTION
function showAlert() {
    alert("🎊 You clicked me, Mohammed! Great job with JavaScript! 🎊");
    console.log("Alert button was clicked!");
}

// 5. FUNCTION TO CHANGE TEXT
function changeMessage() {
    // Get the paragraph element
    const messageElement = document.getElementById("message");
    
    // Array of different messages
    const messages = [
        "JavaScript is powerful! 💪",
        "You can create amazing things! 🌟",
        "Web development is fun! 🎉",
        "Hello from JavaScript! 👋",
        "You're learning fast! 🚀"
    ];
    
    // Pick a random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Change the text
    messageElement.textContent = randomMessage;
    
    console.log("Message changed to: " + randomMessage);
}

// 6. FUNCTION TO TOGGLE SECRET MESSAGE
function toggleSecretMessage() {
    const secretMessage = document.getElementById("secret-message");
    
    // Toggle between showing and hiding
    if (secretMessage.style.display === "none") {
        secretMessage.style.display = "block";
        console.log("Secret message revealed!");
    } else {
        secretMessage.style.display = "none";
        console.log("Secret message hidden!");
    }
}

// 7. COUNTER FUNCTION
let clickCount = 0;

function increaseCounter() {
    clickCount++;
    const counterElement = document.getElementById("click-count");
    counterElement.textContent = clickCount;
    
    console.log("Counter increased to: " + clickCount);
    
    // Bonus: Change color based on count
    if (clickCount >= 10) {
        counterElement.style.color = "var(--secondary)";
        counterElement.style.fontWeight = "bold";
    }
}

// 8. SIMPLE CALCULATOR FUNCTION
function simpleCalculator(num1, num2, operation) {
    if (operation === "+") {
        return num1 + num2;
    } else if (operation === "-") {
        return num1 - num2;
    } else if (operation === "*") {
        return num1 * num2;
    } else if (operation === "/") {
        return num1 / num2;
    } else {
        return "Invalid operation";
    }
}

// 9. PERSONALIZED GREETING FUNCTION
function personalizedGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    
    alert(`${greeting}, Mohammed! 🌞\nWelcome to your interactive portfolio!`);
}

// === EVENT LISTENERS - CONNECTING FUNCTIONS TO BUTTONS === //

// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", function() {
    console.log("📄 Page loaded, attaching event listeners...");
    
    // Connect Button 1: Alert
    document.getElementById("alert-button").addEventListener("click", showAlert);
    
    // Connect Button 2: Change Text
    document.getElementById("change-text-button").addEventListener("click", changeMessage);
    
    // Connect Button 3: Toggle Secret Message
    document.getElementById("toggle-button").addEventListener("click", toggleSecretMessage);
    
    // Connect Button 4: Counter
    document.getElementById("counter-button").addEventListener("click", increaseCounter);
    
    // Bonus: Add keyboard shortcut (press 'A' for alert)
    document.addEventListener("keydown", function(event) {
        if (event.key === "a" || event.key === "A") {
            showAlert();
        }
    });
    
    // Show welcome message in console
    console.log("✅ All event listeners attached!");
    console.log("🎯 Try clicking the buttons on the website!");
    console.log("💡 Bonus: Press the 'A' key on your keyboard!");
});

// Test the calculator
console.log("=== CALCULATOR ===");
console.log("15 + 7 = " + simpleCalculator(15, 7, "+"));
console.log("15 - 7 = " + simpleCalculator(15, 7, "-"));
console.log("15 * 7 = " + simpleCalculator(15, 7, "*"));
console.log("15 / 7 = " + simpleCalculator(15, 7, "/"));

// 10. AUTO-RUN PERSONALIZED GREETING (Optional)
// Uncomment the line below if you want a greeting when page loads
// personalizedGreeting();

// === DARK MODE FUNCTIONALITY === //

// 1. DOM SELECTION - Get the toggle button
const darkModeToggle = document.getElementById('dark-mode-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeText = document.querySelector('.theme-text');

// 2. CHECK USER PREFERENCE
function getPreferredTheme() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light'; // Default to light
}

// 3. APPLY THEME FUNCTION
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update toggle button text and icon
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
    }
    
    // Save preference
    localStorage.setItem('theme', theme);
}

// 4. TOGGLE THEME FUNCTION
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    console.log(`Theme changed to: ${newTheme} mode`);
}

// 5. INITIALIZE THEME WHEN PAGE LOADS
function initializeTheme() {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
    console.log(`Initial theme: ${preferredTheme}`);
}

// 6. ADD EVENT LISTENER
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Add click event to toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleTheme);
        console.log('Dark mode toggle button initialized!');
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
});

// 7. DEMO: DOM MANIPULATION EXAMPLES
function demonstrateDOMManipulation() {
    console.log('=== DOM MANIPULATION EXAMPLES ===');
    
    // Example 1: Changing text content
    const demoElement = document.getElementById('message');
    if (demoElement) {
        console.log('Before:', demoElement.textContent);
        // We'll change this when the change message button is clicked
    }
    
    // Example 2: Changing styles with JavaScript
    const header = document.querySelector('header');
    if (header) {
        console.log('Header background color:', getComputedStyle(header).backgroundColor);
    }
    
    // Example 3: Adding/removing classes
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        console.log(`Section ${index + 1} classes:`, section.classList.toString());
    });
}

// Call the demo function
demonstrateDOMManipulation();
