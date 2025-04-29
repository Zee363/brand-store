require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5002;
const shoeController = require('./controllers/shoeController');
const { getAllShoes } = require('./controllers/shoeController');
const { register, login } = require('./controllers/authController');
const { getDashboardData } = require('./controllers/dashboardController'); 
const { createShoe } = require('./controllers/dashboardController');
const { editShoe } = require('./controllers/shoeController');
const { updateShoe } = require('./controllers/shoeController');
const { deleteShoe } = require('./controllers/shoeController');
const {  authenticateToken } = require('./middleware/authMiddleware'); // Import the authentication middleware   


app.use(cors());
app.use(express.json());

app.use('/admin/users', authenticateToken, getAllShoes);
app.use('/shoes/edit/:id',  authenticateToken, editShoe);
app.use('/shoes/update/:id', authenticateToken, updateShoe);
app.use('/shoes/create', authenticateToken, createShoe); 
app.use('/register', register); 
app.use('/login', login);
app.use('/api/dashboard', authenticateToken, getDashboardData); 
app.use('/shoes/delete/:id', authenticateToken, shoeController.deleteShoe);



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})