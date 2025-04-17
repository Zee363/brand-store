const express = require('express');
const router = express.Router();
const shoeController = require('../controllers/shoeController');
const userController = require('../controllers/userController');

router.get('/admin/users', shoeController.getAllShoes);
router.post('/shoes/create', shoeController.createShoe); 
router.put('/shoes/update/:id', userController.updateShoe);
router.delete('/shoes/delete/:id', userController.deleteShoe);

module.exports = router;