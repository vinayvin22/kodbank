const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('./db');
const { generateToken, verifyToken } = require('./auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Root Route Redirect
app.get('/', (req, res) => {
    res.redirect('/register.html');
});

// Registration Route
app.post('/api/register', async (req, res) => {
    const { uuid, username, password, email, phone, role } = req.body;

    if (role !== 'customer') {
        return res.status(400).json({ message: 'Only customer role is allowed for registration.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO KodUser (uuid, username, email, password, phone, role, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [uuid, username, email, hashedPassword, phone, role, 100000]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM KodUser WHERE username = ?', [username]);
        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user);
        const expiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Store token in UserToken table
        await db.execute(
            'INSERT INTO UserToken (token, uid, expiry) VALUES (?, ?, ?)',
            [token, user.uuid, expiry]
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            maxAge: 3600000
        });

        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Check Balance Route
app.get('/api/balance', verifyToken, async (req, res) => {
    try {
        const username = req.user.sub;
        const [rows] = await db.execute('SELECT balance FROM KodUser WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ balance: rows[0].balance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
