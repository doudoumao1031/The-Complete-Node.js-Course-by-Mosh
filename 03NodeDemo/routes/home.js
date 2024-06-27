const express = require('express');
const router = express.Router();

// Define a route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home', message: 'Hello, World!' });
});

module.exports = router;