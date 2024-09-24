const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth');
const userApiRouter = require('./routes/userApi');
const productRouter = require('./routes/productRoute');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use routes
app.use('/auth', authRouter);

app.use('/api/user', userApiRouter);

app.use('/api/product', productRouter);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
