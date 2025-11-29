// Temperature Converter using Modern JavaScript

// Constants (values that won't change)
const CONVERSION_FORMULAS = {
    celsiusToFahrenheit: (celsius) => (celsius * 9/5) + 32,
    fahrenheitToCelsius: (fahrenheit) => (fahrenheit - 32) * 5/9
};

// DOM Elements
const tempInput = document.getElementById('tempInput');
const resultDiv = document.getElementById('result');
const convertButtons = document.querySelectorAll('.convert-btn');

// Conversion function using arrow function and template strings
const convertTemperature = (value, fromUnit, toUnit) => {
    try {
        // Input validation
        if (value === '' || isNaN(value)) {
            throw new Error('Please enter a valid number');
        }

        const numericValue = parseFloat(value);
        let result;
        let formula;

        // Determine which conversion to perform
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            result = CONVERSION_FORMULAS.celsiusToFahrenheit(numericValue);
            formula = `(${numericValue} × 9/5) + 32`;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            result = CONVERSION_FORMULAS.fahrenheitToCelsius(numericValue);
            formula = `(${numericValue} - 32) × 5/9`;
        } else {
            throw new Error('Invalid conversion type');
        }

        // Round to 2 decimal places
        const roundedResult = Math.round(result * 100) / 100;

        return {
            value: roundedResult,
            formula: formula
        };

    } catch (error) {
        // Error handling
        console.error('Conversion error:', error.message);
        throw error; // Re-throw to handle in the caller
    }
};

// Display result using template strings
const displayResult = (originalValue, fromUnit, toUnit, convertedValue, formula) => {
    const unitSymbols = {
        celsius: '°C',
        fahrenheit: '°F'
    };

    const message = `
        <div class="success-message">
            <strong>${originalValue}${unitSymbols[fromUnit]} = ${convertedValue}${unitSymbols[toUnit]}</strong>
            <br>
            <small>Formula: ${formula}</small>
        </div>
    `;

    resultDiv.innerHTML = message;
};

// Display error
const displayError = (message) => {
    resultDiv.innerHTML = `<div class="error-message">❌ ${message}</div>`;
};

// Event handler using arrow function
const handleConversion = (fromUnit, toUnit) => {
    const inputValue = tempInput.value.trim();

    try {
        const conversion = convertTemperature(inputValue, fromUnit, toUnit);
        displayResult(inputValue, fromUnit, toUnit, conversion.value, conversion.formula);
    } catch (error) {
        displayError(error.message);
    }
};

// Add event listeners
convertButtons.forEach(button => {
    button.addEventListener('click', () => {
        const fromUnit = button.getAttribute('data-from');
        const toUnit = button.getAttribute('data-to');
        handleConversion(fromUnit, toUnit);
    });
});

// Allow Enter key to convert
tempInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        // Convert using the first available button
        const firstButton = convertButtons[0];
        const fromUnit = firstButton.getAttribute('data-from');
        const toUnit = firstButton.getAttribute('data-to');
        handleConversion(fromUnit, toUnit);
    }
});

console.log('🌡️ Temperature Converter Ready!');