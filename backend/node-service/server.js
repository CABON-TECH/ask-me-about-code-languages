const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const connectDB = require('./src/config/config');
const colors = require('colors');
const dotenv = require('dotenv').config();
const userRoute = require('./src/routes/userRoute');
const errorHandler = require('./src/middleware/errorHandler');
const questionRoutes = require('./src/routes/questionRoute');
const bodyParser = require('body-parser');


connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(errorHandler);

app.use('/api/users', userRoute);
app.use('/api/questions', questionRoutes);




app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
