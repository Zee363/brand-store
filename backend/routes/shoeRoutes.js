const express = require('express');
const router = express.Router();
const shoeController = require('../controllers/shoeController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/admin/users', shoeController.getAllShoes);
router.post('/shoes/create', shoeController.createShoe); 
router.put('/shoes/update/:id', authenticateToken, shoeController.updateShoe);
router.put('/shoes/edit/:id', authenticateToken, shoeController.editShoe);
router.get('/shoes/edit/:id', authenticateToken, shoeController.editShoe);
router.delete('/shoes/delete/:id', authenticateToken, shoeController.deleteShoe);
router.get('/brands', shoeController.getAllBrands);

module.exports = router;