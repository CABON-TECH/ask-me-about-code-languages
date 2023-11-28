const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const connectDB = require('./src/config/config');
const colors = require('colors');
const dotenv = require('dotenv').config();

connectDB();

app.use(express.json());



app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
