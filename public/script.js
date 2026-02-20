// Utility for showing messages (could be replaced with a toast system)
function showMessage(msg, isError = false) {
    alert(msg);
}

// Celebration Animation (Confetti)
function celebrate() {
    const colors = ['#6366f1', '#a855f7', '#ec4899', '#22c55e', '#eab308'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.opacity = Math.random();
        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Register Form Handler
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                showMessage('Registration successful! Redirecting to login...');
                setTimeout(() => window.location.href = 'login.html', 2000);
            } else {
                showMessage(result.message || 'Registration failed', true);
            }
        } catch (err) {
            showMessage('An error occurred during registration', true);
        }
    });
}

// Login Form Handler
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                window.location.href = 'dashboard.html';
            } else {
                showMessage(result.message || 'Login failed', true);
            }
        } catch (err) {
            showMessage('An error occurred during login', true);
        }
    });
}

// Check Balance Handler
const checkBalanceBtn = document.getElementById('check-balance-btn');
if (checkBalanceBtn) {
    checkBalanceBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/balance');
            const result = await response.json();

            if (response.ok) {
                const display = document.getElementById('balance-display');
                const val = document.getElementById('balance-val');
                val.textContent = `$${parseFloat(result.balance).toLocaleString()}`;
                display.style.display = 'block';
                celebrate();
            } else {
                showMessage(result.message || 'Failed to fetch balance', true);
                if (response.status === 401) {
                    window.location.href = 'login.html';
                }
            }
        } catch (err) {
            showMessage('An error occurred while fetching balance', true);
        }
    });
}
