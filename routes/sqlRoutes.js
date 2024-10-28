const express = require('express');
const router = express.Router();
const sqlController = require('../controllers/sqlController');

// ## Automatically redirect root ('/') to /login
router.get('/', (req, res) => res.redirect('/login'));

// ## Route for login (GET renders the login page, POST handles login logic)
router.get('/login', (req, res) => res.render('login'));  // Renders the login.ejs
router.post('/login', sqlController.login);  // Handles login logic via POST request

// ## Route for search (GET renders the search page, POST handles search logic)
router.get('/search', (req, res) => res.render('search', { results: [] }));  // Renders the search page
router.post('/search', sqlController.search);  // Handles search functionality

// ## Route for user profile (fetches and displays user profile based on userId param)
router.get('/profile/:userId', sqlController.getProfile);  // Fetches user profile based on userId

module.exports = router;
