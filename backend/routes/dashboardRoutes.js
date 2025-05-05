const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const { createShoe } = require('../controllers/dashboardController');  
const authenticateToken = require('../middleware/authMiddleware'); 

router.get("/dashboard", authenticateToken, getDashboardData); 

router.post("/shoes/create", authenticateToken, createShoe); 