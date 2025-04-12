require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const PORT = 5002;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})