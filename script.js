const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('loginSection');
const calculatorSection = document.getElementById('calculatorSection');
const billSection = document.getElementById('billSection');
const sliderSection = document.getElementById('sliderSection');
const resultInput = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');
const historyList = document.getElementById('historyList');
const billForm = document.getElementById('billForm');
const billResult = document.getElementById('billResult');
const sliderImage = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentExpression = '';
let sliderIndex = 0;

// Slider Images
const sliderImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

// Handle login
// Define default username and password
const defaultUsername = "abc";
const defaultPassword = "123";

// Add event listener to login form
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate credentials
    if (username === defaultUsername && password === defaultPassword) {
        loginSection.classList.add('hidden');
        calculatorSection.classList.remove('hidden');
    } else {
        alert('Wrong username/password');
    }
});

// Calculator Functionality
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value) handleInput(value);
        else if (button.id === 'clear') clearDisplay();
        else if (button.id === 'backspace') backspace();
        else if (button.id === 'equals') calculateResult();
    });
});

function handleInput(value) {
    currentExpression += value;
    updateDisplay();
}

function updateDisplay() {
    resultInput.value = currentExpression || '0';
}

function clearDisplay() {
    currentExpression = '';
    updateDisplay();
}

function backspace() {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    if (currentExpression === '2+2') {
        currentExpression = '';
        calculatorSection.classList.add('hidden');
        billSection.classList.remove('hidden');
        return;
    }

    try {
        const result = eval(currentExpression);
        currentExpression = result.toString();
        updateDisplay();
    } catch {
        resultInput.value = 'Error';
    }
}

// Electricity Bill Calculation
billForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const units = parseFloat(document.getElementById('units').value);

    if (isNaN(units) || units < 0) {
        billResult.textContent = 'Invalid units.';
        return;
    }

    let bill = 0;

    if (units <= 100) bill = units * 1.5;
    else if (units <= 300) bill = 100 * 1.5 + (units - 100) * 3.0;
    else bill = 100 * 1.5 + 200 * 3.0 + (units - 300) * 5.0;

    billResult.textContent = `Your total bill is ₹${bill.toFixed(2)}`;

    if (bill > 10000) {
        billSection.classList.add('hidden');
        sliderSection.classList.remove('hidden');
    }
});

// Slider Functionality
prevBtn.addEventListener('click', () => {
    sliderIndex = (sliderIndex - 1 + sliderImages.length) % sliderImages.length;
    sliderImage.src = sliderImages[sliderIndex];
});

nextBtn.addEventListener('click', () => {
    sliderIndex = (sliderIndex + 1) % sliderImages.length;
    sliderImage.src = sliderImages[sliderIndex];
});
