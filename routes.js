const express = require('express');

const router = express.Router();

// Example route for home
router.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

// Example route for login
router.get('/login', (req, res) => {
    res.send('Login page');
});

// Example route for signup
router.get('/signup', (req, res) => {
    res.send('Signup page');
});

// Example route for profile
router.get('/profile', (req, res) => {
    res.send('Profile page');
});

module.exports = router;