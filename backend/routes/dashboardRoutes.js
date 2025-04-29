const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const { createShoe } = require('../controllers/dashboardController'); // Import the createShoe function 
const authenticateToken = require('../middleware/authMiddleware'); // Import the authentication middleware


router.get("/dashboard", authenticateToken, getDashboardData); 

router.post("/shoes/create", authenticateToken, createShoe); // Add authentication middleware to the create shoe route
module.exports = router;