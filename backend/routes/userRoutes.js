const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/admin/users', userController.getAllUsers);
router.delete('/admin/delete/users/:id', userController.deleteUser);

module.exports = router;