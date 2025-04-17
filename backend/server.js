require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5002;
const shoeController = require('./controllers/shoeController');
const userController = require('./controllers/userController');
const { register, login } = require('./controllers/authController');
const dashboardRoutes = require('./routes/dashboardRoutes');


app.use(cors());
app.use(express.json());

app.use('/admin/users', shoeController.getAllShoes);
app.use('/shoes/create', shoeController.createShoe); 
app.use('/register', register); 
app.use('/login', login);
app.use('/dashboard', dashboardRoutes);
app.use('/shoes/update/:id', shoeController.updateShoe);
app.use('/shoes/delete/:id', shoeController.deleteShoe);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})