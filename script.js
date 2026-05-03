// At the top of your script.js, create the history storage
// --- GLOBAL VARIABLES (TOP OF FILE) ---
// Initial fake data
// Initialization
const splashScreen = document.getElementById('splash-screen');
const loadingBar = document.getElementById('loading-bar');
const mainApp = document.getElementById('main-app');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const multiplierDisplay = document.getElementById('multiplier-display');
const actionBtn = document.getElementById('main-action-btn');

const planeImg = new Image();
planeImg.src = 'img/aviator_jogo.png'; // Using your local file

// Ensure these are at the very top
const upcomingOdds =[
        { id: 5108, target: 24.92 },
        { id: 5109, target: 1.55 },
        { id: 5110, target: 12.30 },
        { id: 5111, target: 4.10 },
        { id: 5112, target: 7.83 },
        { id: 5113, target: 19.44 },
        { id: 5114, target: 2.67 },
        { id: 5115, target: 15.29 },
        { id: 5116, target: 3.98 },
        { id: 5117, target: 28.11 },
        { id: 5118, target: 6.75 },
        { id: 5119, target: 9.62 },
        { id: 5120, target: 13.47 },
        { id: 5121, target: 5.33 },
        { id: 5122, target: 21.08 },
        { id: 5123, target: 8.19 },
        { id: 5124, target: 17.56 },
        { id: 5125, target: 2.41 },
        { id: 5126, target: 30.72 },
        { id: 5127, target: 11.09 },
        { id: 5128, target: 4.66 },
        { id: 5129, target: 26.35 },
        { id: 5130, target: 7.14 },
        { id: 5131, target: 18.92 },
        { id: 5132, target: 3.27 },
        { id: 5133, target: 14.88 },
        { id: 5134, target: 6.01 },
        { id: 5135, target: 22.63 },
        { id: 5136, target: 9.45 },
        { id: 5137, target: 1.88 },
        { id: 5138, target: 27.50 },
        { id: 5139, target: 5.76 },
        { id: 5140, target: 16.22 },
        { id: 5141, target: 8.57 },
        { id: 5142, target: 20.31 },
        { id: 5143, target: 2.93 },
        { id: 5144, target: 12.74 },
        { id: 5145, target: 4.51 },
        { id: 5146, target: 25.89 },
        { id: 5147, target: 6.38 },
        { id: 5148, target: 10.97 },
        { id: 5149, target: 13.12 },
        { id: 5150, target: 7.69 },
        { id: 5151, target: 19.05 },
        { id: 5152, target: 3.44 },
        { id: 5153, target: 23.77 },
        { id: 5154, target: 5.08 },
        { id: 5155, target: 11.63 },
        { id: 5156, target: 2.16 },
        { id: 5157, target: 29.84 },
        { id: 5158, target: 6.92 },
        { id: 5159, target: 17.38 },
        { id: 5160, target: 8.04 },
        { id: 5161, target: 21.56 },
        { id: 5162, target: 4.23 },
        { id: 5163, target: 14.09 },
        { id: 5164, target: 3.75 },
        { id: 5165, target: 26.71 },
        { id: 5166, target: 9.88 },
        { id: 5167, target: 1.67 },
        { id: 5168, target: 24.13 },
        { id: 5169, target: 7.52 },
        { id: 5170, target: 18.44 },
        { id: 5171, target: 5.95 },
        { id: 5172, target: 22.01 },
        { id: 5173, target: 2.58 },
        { id: 5174, target: 12.99 },
        { id: 5175, target: 4.87 },
        { id: 5176, target: 28.36 },
        { id: 5177, target: 6.11 },
        { id: 5178, target: 10.42 },
        { id: 5179, target: 13.88 },
        { id: 5180, target: 8.73 },
        { id: 5181, target: 19.67 },
        { id: 5182, target: 3.12 },
        { id: 5183, target: 23.05 },
        { id: 5184, target: 5.61 },
        { id: 5185, target: 11.28 },
        { id: 5186, target: 2.74 },
        { id: 5187, target: 30.15 },
        { id: 5188, target: 7.36 },
        { id: 5189, target: 17.91 },
        { id: 5190, target: 8.26 },
        { id: 5191, target: 20.88 },
        { id: 5192, target: 4.95 },
        { id: 5193, target: 14.52 },
        { id: 5194, target: 3.59 },
        { id: 5195, target: 27.14 },
        { id: 5196, target: 9.03 },
        { id: 5197, target: 1.94 },
        { id: 5198, target: 25.48 },
        { id: 5199, target: 7.81 },
        { id: 5200, target: 18.07 },
        { id: 5201, target: 6.29 },
        { id: 5202, target: 22.47 },
        { id: 5203, target: 2.36 },
        { id: 5204, target: 13.21 },
        { id: 5205, target: 4.64 },
        { id: 5206, target: 28.92 },
        { id: 5207, target: 6.57 };
    
let gameHistory = [];
let currentRoundIndex = 0;
let crashPoint = 0;

// Global State
let isFlying = false;
let counter = 1.00;
let progress = 0;
// let crashPoint = 0;
let isLoggedIn = false;
let currentBet = 0;
let isBetPlaced = false;
let hasCashedOut = false;
let balance = 1000.00;

// 1. Splash & Resize Logic
window.addEventListener('DOMContentLoaded', () => {
    // 1. Start the loading bar animation immediately
    setTimeout(() => {
        loadingBar.style.width = '100%';
    }, 100);

    // 2. Hide the splash screen after 3 seconds
    setTimeout(() => {
        splashScreen.classList.add('hidden'); 
        
        // Safety check: ensure the game view is visible
        document.getElementById('game-view').classList.remove('hidden');
        
        // Start the game loop
        if (typeof startNewRound === "function") {
            startNewRound();
        }
    }, 3000); 
});
// Fix squishing on window resize or orientation change
window.addEventListener('resize', initGame);

const socket = io();

// Listen for the server to start a round
socket.on('roundStarted', (data) => {
getPrediction(); // This will refresh the text every time a new round starts
    startNewRound();  
     
});

function initGame() {
    if (!canvas) return;

    // Get actual display size
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set internal resolution to match physical pixels (fixes blur/squish)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale context back so math uses CSS pixels
    ctx.scale(dpr, dpr);

    // Set CSS size
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    if (!isFlying) startNewRound();
}

function gameLoop() {
    if (!isFlying) return;

    // Increment
    counter += 0.005;
    progress = (counter - 1) / (crashPoint - 1);

    // Update UI
    if (multiplierDisplay) {
        multiplierDisplay.innerText = counter.toFixed(2) + "x";
    }

    drawGameCanvas();

    // CRITICAL FIX: The stop condition
    if (counter >= crashPoint) {
        console.log("CRASH REACHED!");
        finishRound();
    } else {
        requestAnimationFrame(gameLoop);
    }
}

function drawGameCanvas() {
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, w, h);

    // 1. Set boundaries (Margins)
    const margin = 40;
    const chartW = w - (margin * 2);
    const chartH = h - (margin * 2);

    // 2. Normalize Progress
    // We cap visual progress at 0.9 (90%) so the plane never touches the very edge
    const visualProgress = Math.min(progress, 0.9);

    // 3. Calculate Plane Position
    const endX = margin + (visualProgress * chartW);
    // The Y calculation uses a curve, but we cap it so it stays below the top
    const endY = (h - margin) - (Math.pow(visualProgress, 1.2) * chartH);

    // 4. Draw Trajectory Line
    ctx.beginPath();
    ctx.strokeStyle = '#e61e23';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.moveTo(margin, h - margin);

    for (let i = 0; i <= visualProgress; i += 0.01) {
        let tx = margin + (i * chartW);
        let ty = (h - margin) - (Math.pow(i, 1.2) * chartH);
        ctx.lineTo(tx, ty);
    }
    ctx.stroke();

    // 5. Draw Plane
    ctx.save();
    ctx.translate(endX, endY);

    // Slight upward tilt based on progress
    const angle = -0.2 * visualProgress;
    ctx.rotate(angle);

    if (planeImg.complete) {
        const pHeight = h * 0.12;
        const pWidth = pHeight * (planeImg.naturalWidth / planeImg.naturalHeight);
        ctx.drawImage(planeImg, -pWidth * 0.7, -pHeight / 2, pWidth, pHeight);
    }
    ctx.restore();
}

/**
 * Sets the bet to a specific predefined amount (e.g., from the 10, 20, 50, 100 buttons)
 * @param {number} amount - The value to set the bet to
 */
function setBet(amount) {
    const betInput = document.getElementById('bet-amount');
    if (betInput) {
        // Update the input value
        betInput.value = amount.toFixed(2);
        console.log("Bet set to:", amount);
    }
}

/**
 * Adjusts the current bet by a specific increment or decrement
 * @param {number} change - The amount to add or subtract (e.g., 1 or -1)
 */
function adjustBet(change) {
    const betInput = document.getElementById('bet-amount');
    if (betInput) {
        let currentVal = parseFloat(betInput.value) || 0;
        // Calculate new value, ensuring it doesn't go below 0
        let newVal = Math.max(0, currentVal + change);
        betInput.value = newVal.toFixed(2);
    }
}

/**
 * Swaps between the Game, Wallet, and Menu views
 * @param {string} tabName - 'game', 'wallet', or 'menu'
 */
function switchTab(tabName) {
    // Gatekeeper: Prevent access to Wallet or Menu if not logged in
    if ((tabName === 'menu' || tabName === 'wallet') && !isLoggedIn) {
        openModal('login');
        return;
    }

    const views = {
        'game': document.getElementById('dashboard'),
        'wallet': document.getElementById('wallet-view'),
        'menu': document.getElementById('menu-view')
    };

    Object.values(views).forEach(view => {
        if (view) view.classList.add('hidden');
    });


    // 2. Show the selected view
    if (views[tabName]) {
        views[tabName].classList.remove('hidden');
    }

    // 3. Update Bottom Nav UI (Active State)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Map tab names to nav-item indices
    const tabMap = { 'game': 0, 'wallet': 2, 'menu': 3 };
    if (navItems[tabMap[tabName]]) {
        navItems[tabMap[tabName]].classList.add('active');
    }
}

/**
 * Updates the Top Nav UI based on login status
 */
function toggleHeaderState() {
    const authButtons = document.getElementById('auth-buttons'); // Login/Register buttons
    const userActions = document.getElementById('user-actions'); // Balance/Avatar

    if (isLoggedIn) {
        if (authButtons) authButtons.classList.add('hidden');
        if (userActions) userActions.classList.remove('hidden');
    } else {
        if (authButtons) authButtons.classList.remove('hidden');
        if (userActions) userActions.classList.add('hidden');
    }
}

/**
 * Opens Login or Signup Modals
 */
function openModal(mode) {
    const modal = document.getElementById('auth-modal');
    const title = document.getElementById('modal-title');
    const container = document.getElementById('auth-form-container');

    if (!modal) return;

    modal.classList.remove('hidden');

    if (mode === 'login') {
        title.innerText = "Login to CashPoa";
        container.innerHTML = `
            <input type="text" class="auth-input" placeholder="Phone Number">
            <input type="password" class="auth-input" placeholder="Password">
            <div style="display: flex; align-items: center; gap: 8px; width: 70%">
    <input type="checkbox" class="auth-input" style = "width: 10%">
    <p style="margin: 0; width: 100%">By clicking, you agree to Terms of Use</p>
</div>
            <button class="btn-auth" onclick="simulateLogin()">Login</button>
        `;
    } else {
        title.innerText = "Join CashPoa";
        container.innerHTML = `
            <input type="text" class="auth-input" placeholder="Username">
            <input type="text" class="auth-input" placeholder="Phone Number">
            <input type="password" class="auth-input" placeholder="Password">
            <button class="btn-auth" onclick="simulateLogin()">Sign Up</button>
        `;
    }
}

function closeModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
}

function simulateLogin() {
    isLoggedIn = true;
    closeModal();
    toggleHeaderState();

    // Update balance display
    const balDisplay = document.getElementById('balance-display');
    if (balDisplay) balDisplay.innerHTML = `0.00 <small>KES</small>`;

    switchTab('game');
    console.log("User logged in");
}

function logout() {
    isLoggedIn = false;
    toggleHeaderState();
    switchTab('game');
    console.log("User logged out");
}

// --- Deposit Logic ---

function showDepositForm() {
    // Hide all other views
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('wallet-view').classList.add('hidden');
    document.getElementById('menu-view').classList.add('hidden');

    // Show deposit form
    document.getElementById('deposit-view').classList.remove('hidden');
}

function setDepositAmount(amount) {
    document.getElementById('deposit-amount').value = amount;
}

/**
 * Simulates an M-Pesa STK Push
 */
function triggerStkPush() {
    const phone = document.getElementById('deposit-phone').value;
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    const btn = document.getElementById('stk-push-btn');

    if (!phone || amount < 100) {
        alert("Please enter a valid phone and amount (min 100 KES)");
        return;
    }

    // UI Feedback
    btn.disabled = true;
    btn.innerText = "Processing STK...";
    btn.style.background = "#888";

    console.log(`Triggering STK Push to ${phone} for ${amount} KES`);

    // Simulate Network Latency (The time user takes to enter PIN)
    setTimeout(() => {
        // Update Global Balance
        balance += amount;

        // Update UI everywhere
        updateBalanceUI();

        alert(`Success! ${amount} KES has been added to your wallet.`);

        // Reset Button & Redirect
        btn.disabled = false;
        btn.innerText = "Send STK Push →";
        btn.style.background = "#e61e23";

        switchTab('game');
    }, 4000);
}

// A simple version of a Provably Fair multiplier generator
function generateMultiplier(serverSeed, clientSeed) {
    const hash = crypto.createHmac('sha256', serverSeed).update(clientSeed).digest('hex');

    // We take a portion of the hash to create a random number
    const value = parseInt(hash.substring(0, 8), 16);
    const max = Math.pow(2, 32); // Max value for 8 hex chars

    // Most crash games use a formula that favors lower numbers 
    // to maintain a "house edge" (e.g., the plane crashes at 1.00x)
    if (value % 33 === 0) return 1.00; // Instant crash (3% chance)

    return Math.floor((100 * max - value) / (max - value)) / 100;
}

let currentPrediction = 1.50;

function updateButtonUI(text, color) {
    if (actionBtn) {
        actionBtn.innerText = text;
        actionBtn.style.backgroundColor = color;
    }
}

function placeBet() {
    const betInput = document.getElementById('bet-amount');
    const amount = parseFloat(betInput.value);

    if (isFlying) {
        // If the game is already running, we handle Cash Out
        if (isBetPlaced && !hasCashedOut) {
            cashOut();
        }
        return;
    }

    // Validation
    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid bet amount");
        return;
    }
    if (amount > balance) {
        alert("Insufficient balance!");
        return;
    }

    // Deduct Balance
    balance -= amount;
    currentBet = amount;
    isBetPlaced = true;
    hasCashedOut = false;

    updateBalanceUI();
    updateButtonUI("WAITING", "yellow");

    // Start the game if it's not already scheduled
    // (In a real app, the server starts this automatically)
    if (!isFlying) startNewRound();
}

function cashOut() {
    if (!isFlying || hasCashedOut || !isBetPlaced) return;

    hasCashedOut = true;
    const winnings = currentBet * counter;
    balance += winnings;

    updateBalanceUI();
    showWinAnimation(winnings);
    updateButtonUI("BET", "#28a745"); // Reset button look

    console.log(`Cashed out at ${counter.toFixed(2)}x. Won: ${winnings.toFixed(2)}`);
}

function startNewRound() {
    if (isFlying) return;

    // Get target from the sequence
    const roundData = upcomingOdds[currentRoundIndex % upcomingOdds.length];
    crashPoint = roundData.target;
    currentRoundIndex++;

    isFlying = true;
    counter = 1.00;
    progress = 0;
    
    // Reset UI color
    if (multiplierDisplay) multiplierDisplay.style.color = "white";

if (isBetPlaced) {
        updateButtonUI("CASH OUT", "#ffc107"); // Turn orange/yellow for cashout
    }
    // ----------------------

    if (multiplierDisplay) multiplierDisplay.style.color = "white";
    requestAnimationFrame(gameLoop);
}    

// 3. Update the finishRound function
function finishRound() {
    isFlying = false;
    multiplierDisplay.style.color = "#e61e23";
    multiplierDisplay.innerText = "FLEW AWAY!";

isBetPlaced = false; 
    hasCashedOut = false;
    updateButtonUI("BET", "#28a745"); // Reset button to Green
    // ----------------------------

    gameHistory.push(crashPoint); 
    updateHistoryUI();
    
 function getPastMultipliers() {
    return gameHistory.length > 0 ? gameHistory : [1.50]; // Default to 1.5 if empty
}

// --- 3. THE UI UPDATE FUNCTION ---
function updateHistoryUI() {
    const bar = document.getElementById('history-bar');
    if (!bar) return;

    bar.innerHTML = ''; // Clear current pills

    // Reverse so latest is on the left, show last 15
    [...gameHistory].reverse().slice(0, 15).forEach(val => {
        const pill = document.createElement('span');

        // Define colors based on the multiplier value
        let color = '#3498db'; // Low (Blue)
        if (val >= 2) color = '#9b59b6'; // Medium (Purple)
        if (val >= 10) color = '#f1c40f'; // High (Gold)

        pill.style.cssText = `
            background: #222;
            color: ${color};
            padding: 4px 12px;
            border-radius: 12px;
            font-weight: bold;
            font-size: 13px;
            border: 1px solid #333;
            white-space: nowrap;
        `;
        pill.innerText = parseFloat(val).toFixed(2) + 'x';
        bar.appendChild(pill);
    });
}


function updateBalanceUI() {
    const displays = ['balance-display', 'wallet-balance'];
    displays.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = `${balance.toFixed(2)} <small>KES</small>`;
    });
}

function showWinAnimation(amount) {
    const winMsg = document.createElement('div');
    winMsg.className = 'win-toast';
    winMsg.innerText = `+${amount.toFixed(2)} KES`;
    document.body.appendChild(winMsg);

    setTimeout(() => winMsg.remove(), 2000);
}

// --- 4. Prediction/Stats Logic ---

function getPrediction() {
    // Basic logic: Higher chance of a low crash if previous was high
    const randomFactor = Math.random();
    let prediction;

    if (randomFactor > 0.7) prediction = "1.20x - 1.50x (Safe)";
    else if (randomFactor > 0.3) prediction = "2.00x - 4.00x (Medium)";
    else prediction = "8.00x+ (High Risk)";

    const predEl = document.getElementById('prediction-display');
    if (predEl) predEl.innerText = prediction;
}
