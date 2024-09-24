const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.isLoggedIn = (req, res, next)=>{
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken && !refreshToken) {
        return res.status(401).json({ message: 'No token provided' });
    }
    else if (!accessToken && refreshToken){
        return res.redirect('/auth/refresh-token');
    }
    try {
        const decoded = jwt.verify(accessToken, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.redirect('/auth/refresh-token');
        // return res.status(403).json({ message: 'Invalid token.' });
    }
}