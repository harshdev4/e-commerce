const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kian.bechtelar3@ethereal.email',
        pass: 'BQVu5eyfqcu9TaxhVb'
    }
});

module.exports = transporter;
