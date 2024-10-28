const express = require('express');
const router = express.Router();
const sqlController = require('../controllers/sqlController');

// ## Automatically redirect root ('/') to /login
router.get('/', (req, res) => res.redirect('/login'));

// ## Route for login
router.get('/login', (req, res) => res.render('login'));
router.post('/login', sqlController.login);

// ## Route for search
router.get('/search', (req, res) => res.render('search', { results: [] }));
router.post('/search', sqlController.search);

// ## Route for user profile
router.get('/profile/:userId', sqlController.getProfile);

module.exports = router;
