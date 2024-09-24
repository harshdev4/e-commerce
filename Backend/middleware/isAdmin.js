const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAdmin = async (req, res, next)=>{
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(400).json({message: 'No token provided'});
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.userId;
        const user = await userModel.findById(userId);
        if (user && user.isAdmin) {
            next();
        }
        else{
            res.status(401).json({message: 'Unauthorized'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = isAdmin;