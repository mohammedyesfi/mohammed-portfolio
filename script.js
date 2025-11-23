// === JAVASCRIPT BASICS === //

// 1. VARIABLES - Containers that store data
let myName = "Mohammed";
const birthYear = 2000; // const means constant (can't change)
let currentYear = 2024;

// 2. DATA TYPES
let age = currentYear - birthYear; // Number
let isLearning = true; // Boolean (true/false)
let hobbies = ["coding", "horse riding", "drawing"]; // Array (list)

// 3. CONSOLE.LOG() - Print to developer console
console.log("=== WELCOME TO JAVASCRIPT ===");
console.log("Hello " + myName + " 👋, Welcome to JavaScript!");
console.log("You are " + age + " years old");
console.log("Are you learning? " + isLearning);
console.log("Your hobbies: " + hobbies);

// 4. MATH OPERATIONS
let a = 15;
let b = 7;

console.log("=== MATH OPERATIONS ===");
console.log(a + " + " + b + " = " + (a + b)); // Addition
console.log(a + " - " + b + " = " + (a - b)); // Subtraction  
console.log(a + " * " + b + " = " + (a * b)); // Multiplication
console.log(a + " / " + b + " = " + (a / b)); // Division
console.log(a + " % " + b + " = " + (a % b)); // Remainder

// 5. STRING OPERATIONS
let firstName = "Mohammed";
let lastName = "Yesfi Daimoussi";
let fullName = firstName + " " + lastName;

console.log("=== STRING OPERATIONS ===");
console.log("First name: " + firstName);
console.log("Last name: " + lastName);
console.log("Full name: " + fullName);
console.log("Name length: " + fullName.length + " characters");

// 6. MINI PROJECT: WELCOME MESSAGE
console.log("=== MINI PROJECT ===");
console.log("🌟 " + myName + "'s Portfolio Console 🌟");
console.log("📍 Age: " + age + " years old");
console.log("📍 Learning: Web Development");
console.log("📍 Hobbies: " + hobbies.join(", "));
console.log("📍 Message: Keep coding and never stop learning! 🚀");

// 7. INTERACTIVE ELEMENTS (Bonus!)
// This will show an alert when the page loads
// You can comment this out if you don't want the popup
// alert("Welcome to Mohammed's Portfolio! Check the console for more info.");

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

// Test the calculator
console.log("=== CALCULATOR TEST ===");
console.log("15 + 7 = " + simpleCalculator(15, 7, "+"));
console.log("15 - 7 = " + simpleCalculator(15, 7, "-"));
console.log("15 * 7 = " + simpleCalculator(15, 7, "*"));
console.log("15 / 7 = " + simpleCalculator(15, 7, "/"));