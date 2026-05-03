To update the possible errors while maintaining your existing logic, we need to consolidate duplicate declarations (like `socket`, `crashPoint`, and `updateBalanceUI`) and fix the broken function headers at the end of your script.

Here is the cleaned-up and debugged version of your code:

```javascript
// --- GLOBAL VARIABLES (TOP OF FILE) ---
const socket = io(); // Declare once at the top

// Initialization of UI Elements
const splash = document.getElementById('splash-screen');
const loadingBar = document.getElementById('loading-bar');
const mainApp = document.getElementById('main-app');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const multiplierDisplay = document.getElementById('multiplier-display');
const actionBtn = document.getElementById('main-action-btn');

const planeImg = new Image();
planeImg.src = 'img/aviator_jogo.png'; 

// Data Sequence
const upcomingOdds = [
    { id: 5108, target: 24.92 }, { id: 5109, target: 1.55 },
    { id: 5110, target: 12.30 }, { id: 5111, target: 4.10 },
    { id: 5112, target: 7.83 }, { id: 5113, target: 19.44 },
    { id: 5114, target: 2.67 }, { id: 5115, target: 15.29 },
    { id: 5116, target: 3.98 }, { id: 5117, target: 28.11 },
    { id: 5118, target: 6.75 }, { id: 5119, target: 9.62 },
    { id: 5120, target: 13.47 }, { id: 5121, target: 5.33 },
    { id: 5122, target: 21.08 }, { id: 5123, target: 8.19 },
    { id: 5124, target: 17.56 }, { id: 5125, target: 2.41 },
    { id: 5126, target: 30.72 }, { id: 5127, target: 11.09 },
    { id: 5128, target: 4.66 }, { id: 5129, target: 26.35 },
    { id: 5130, target: 7.14 }, { id: 5131, target: 18.92 },
    { id: 5132, target: 3.27 }, { id: 5133, target: 14.88 },
    { id: 5134, target: 6.01 }, { id: 5135, target: 22.63 },
    { id: 5136, target: 9.45 }, { id: 5137, target: 1.88 },
    { id: 5138, target: 27.50 }, { id: 5139, target: 5.76 },
    { id: 5140, target: 16.22 }, { id: 5141, target: 8.57 },
    { id: 5142, target: 20.31 }, { id: 5143, target: 2.93 },
    { id: 5144, target: 12.74 }, { id: 5145, target: 4.51 },
    { id: 5146, target: 25.89 }, { id: 5147, target: 6.38 },
    { id: 5148, target: 10.97 }, { id: 5149, target: 13.12 },
    { id: 5150, target: 7.69 }, { id: 5151, target: 19.05 },
    { id: 5152, target: 3.44 }, { id: 5153, target: 23.77 },
    { id: 5154, target: 5.08 }, { id: 5155, target: 11.63 },
    { id: 5156, target: 2.16 }, { id: 5157, target: 29.84 },
    { id: 5158, target: 6.92 }, { id: 5159, target: 17.38 },
    { id: 5160, target: 8.04 }, { id: 5161, target: 21.56 },
    { id: 5162, target: 4.23 }, { id: 5163, target: 14.09 },
    { id: 5164, target: 3.75 }, { id: 5165, target: 26.71 },
    { id: 5166, target: 9.88 }, { id: 5167, target: 1.67 },
    { id: 5168, target: 24.13 }, { id: 5169, target: 7.52 },
    { id: 5170, target: 18.44 }, { id: 5171, target: 5.95 },
    { id: 5172, target: 22.01 }, { id: 5173, target: 2.58 },
    { id: 5174, target: 12.99 }, { id: 5175, target: 4.87 },
    { id: 5176, target: 28.36 }, { id: 5177, target: 6.11 },
    { id: 5178, target: 10.42 }, { id: 5179, target: 13.88 },
    { id: 5180, target: 8.73 }, { id: 5181, target: 19.67 },
    { id: 5182, target: 3.12 }, { id: 5183, target: 23.05 },
    { id: 5184, target: 5.61 }, { id: 5185, target: 11.28 },
    { id: 5186, target: 2.74 }, { id: 5187, target: 30.15 },
    { id: 5188, target: 7.36 }, { id: 5189, target: 17.91 },
    { id: 5190, target: 8.26 }, { id: 5191, target: 20.88 },
    { id: 5192, target: 4.95 }, { id: 5193, target: 14.52 },
    { id: 5194, target: 3.59 }, { id: 5195, target: 27.14 },
    { id: 5196, target: 9.03 }, { id: 5197, target: 1.94 },
    { id: 5198, target: 25.48 }, { id: 5199, target: 7.81 },
    { id: 5200, target: 18.07 }, { id: 5201, target: 6.29 },
    { id: 5202, target: 22.47 }, { id: 5203, target: 2.36 },
    { id: 5204, target: 13.21 }, { id: 5205, target: 4.64 },
    { id: 5206, target: 28.92 }, { id: 5207, target: 6.57 }
];

// Game Tracking
let gameHistory = [];
let currentRoundIndex = 0;
let crashPoint = 1.00;
let isFlying = false;
let counter = 1.00;
let progress = 0;
let isLoggedIn = false;
let currentBet = 0;
let isBetPlaced = false;
let hasCashedOut = false;
let balance = 1000.00;

// --- INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    if (loadingBar) loadingBar.style.width = '100%';
    setTimeout(() => {
        if (splash) splash.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        setTimeout(initGame, 100);
    }, 3000);
});

window.addEventListener('resize', initGame);

// Socket listener
socket.on('roundStarted', (data) => {
    console.log("Server signal received");
    startNewRound(); 
});

function initGame() {
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
}

// --- GAME CORE ---
function startNewRound() {
    if (isFlying) return;

    // Pick target from your sequence
    crashPoint = upcomingOdds[currentRoundIndex % upcomingOdds.length].target;
    currentRoundIndex++;

    isFlying = true;
    counter = 1.00;
    progress = 0;
    multiplierDisplay.style.color = "white";

    // Handle UI for active bet
    if (isBetPlaced) {
        updateButtonUI("CASH OUT", "#e61e23");
    }

    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (!isFlying) return;

    counter += 0.005;
    progress = (counter - 1) / (crashPoint - 1);

    if (multiplierDisplay) {
        multiplierDisplay.innerText = counter.toFixed(2) + "x";
    }

    drawGameCanvas();

    if (counter >= crashPoint) {
        finishRound();
    } else {
        requestAnimationFrame(gameLoop);
    }
}

function finishRound() {
    isFlying = false;
    multiplierDisplay.style.color = "#e61e23";
    multiplierDisplay.innerText = "FLEW AWAY!";
    
    // Add to history
    gameHistory.push(crashPoint);
    updateHistoryUI();

    // Reset Betting states
    isBetPlaced = false;
    hasCashedOut = false;
    updateButtonUI("BET", "#28a745");
}

function drawGameCanvas() {
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, w, h);
    const margin = 40;
    const chartW = w - (margin * 2);
    const chartH = h - (margin * 2);

    const visualProgress = Math.min(progress, 0.9);
    const endX = margin + (visualProgress * chartW);
    const endY = (h - margin) - (Math.pow(visualProgress, 1.2) * chartH);

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

    ctx.save();
    ctx.translate(endX, endY);
    ctx.rotate(-0.2 * visualProgress);

    if (planeImg.complete) {
        const pHeight = h * 0.12;
        const pWidth = pHeight * (planeImg.naturalWidth / planeImg.naturalHeight);
        ctx.drawImage(planeImg, -pWidth * 0.7, -pHeight / 2, pWidth, pHeight);
    }
    ctx.restore();
}

// --- BETTING CONTROLS ---
function updateButtonUI(text, color) {
    if (actionBtn) {
        actionBtn.innerText = text;
        actionBtn.style.background = color;
    }
}

function setBet(amount) {
    const betInput = document.getElementById('bet-amount');
    if (betInput) betInput.value = amount.toFixed(2);
}

function adjustBet(change) {
    const betInput = document.getElementById('bet-amount');
    if (betInput) {
        let currentVal = parseFloat(betInput.value) || 0;
        betInput.value = Math.max(0, currentVal + change).toFixed(2);
    }
}

function placeBet() {
    const betInput = document.getElementById('bet-amount');
    const amount = parseFloat(betInput.value);

    if (isFlying) {
        if (isBetPlaced && !hasCashedOut) cashOut();
        return;
    }

    if (isNaN(amount) || amount <= 0) return alert("Enter valid bet");
    if (amount > balance) return alert("Insufficient balance!");

    balance -= amount;
    currentBet = amount;
    isBetPlaced = true;
    hasCashedOut = false;

    updateBalanceUI();
    updateButtonUI("WAITING", "orange");
}

function cashOut() {
    if (!isFlying || hasCashedOut || !isBetPlaced) return;

    hasCashedOut = true;
    const winnings = currentBet * counter;
    balance += winnings;

    updateBalanceUI();
    showWinAnimation(winnings);
    updateButtonUI("BET", "#28a745");
}

// --- UI & NAVIGATION ---
function switchTab(tabName) {
    if ((tabName === 'menu' || tabName === 'wallet') && !isLoggedIn) {
        openModal('login');
        return;
    }

    const views = {
        'game': document.getElementById('dashboard'),
        'wallet': document.getElementById('wallet-view'),
        'menu': document.getElementById('menu-view'),
        'deposit': document.getElementById('deposit-view')
    };

    Object.values(views).forEach(v => { if (v) v.classList.add('hidden'); });
    if (views[tabName]) views[tabName].classList.remove('hidden');

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    const tabMap = { 'game': 0, 'wallet': 2, 'menu': 3 };
    if (navItems[tabMap[tabName]]) navItems[tabMap[tabName]].classList.add('active');
}

function updateBalanceUI() {
    const displays = ['balance-display', 'wallet-balance'];
    displays.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = `${balance.toFixed(2)} <small>KES</small>`;
    });
}

function updateHistoryUI() {
    const bar = document.getElementById('history-bar');
    if (!bar) return;
    bar.innerHTML = '';
    [...gameHistory].reverse().slice(0, 15).forEach(val => {
        const pill = document.createElement('span');
        let color = val < 2 ? '#3498db' : (val < 10 ? '#9b59b6' : '#f1c40f');
        pill.style.cssText = `background: #222; color: ${color}; padding: 4px 12px; border-radius: 12px; font-weight: bold; margin-right: 5px; font-size: 13px;`;
        pill.innerText = val.toFixed(2) + 'x';
        bar.appendChild(pill);
    });
}

// --- MODALS & AUTH ---
function openModal(mode) {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
}

function simulateLogin() {
    isLoggedIn = true;
    closeModal();
    updateBalanceUI();
    document.getElementById('auth-buttons')?.classList.add('hidden');
    document.getElementById('user-actions')?.classList.remove('hidden');
}

function triggerStkPush() {
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    if (amount < 100) return alert("Min 100 KES");
    balance += amount;
    updateBalanceUI();
    alert("Success!");
    switchTab('game');
}

function showWinAnimation(amount) {
    const winMsg = document.createElement('div');
    winMsg.className = 'win-toast';
    winMsg.innerText = `+${amount.toFixed(2)} KES`;
    document.body.appendChild(winMsg);
    setTimeout(() => winMsg.remove(), 2000);
}
```
