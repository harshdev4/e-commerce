const userModel = require('../models/User');
const validator = require('validator');

exports.getUserData = async (req, res)=>{
    const userId = req.params.userId; 
    
    try {
        const user = await userModel.findOne({_id: userId});
        user.password = "";
        res.status(200).json({message: "User data fetched successfully", user: user})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error occurs", error});
    }
}

exports.editUserData = async (req, res)=>{
    const userId = req.params.userId;
    const editType = req.params.editType;
    try {
        const user = await userModel.findOne({_id: userId});
        // handling name update
        if (editType == 'name') {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({message: 'Name field cannot be empty'});
            }
            user['name'] = name.trim();
        }
        // handling email update
        else if (editType == 'email'){
            const { email } = req.body;
            if (!email || !validator.isEmail(email)) {
                return res.status(400).json({message: 'Enter a valid email'});
            }
            user['email'] = email.trim();
        }
        // handling address update
        else if (editType == 'address'){
            const objKey = Object.keys(req.body);
            for (let index = 0; index < objKey.length; index++) {
                if (!(req.body[objKey[index]])) {
                    return res.status(400).json({message: 'Address fields cannot be empty'});
                }
                user.address[objKey[index]] = (req.body[objKey[index]]).trim(); 
            }
        }
        await user.save();
        res.status(200).json({message: "User info updated successfully"});
    } catch (error) {
        res.status(500).json({message: "Error occured on server"});
    }
}

exports.isAdmin = async (req, res)=>{
    const userId = req.params.userId;
    try {
        const user = await userModel.findById(userId);
        
        if (user && user.isAdmin)  {
            res.status(200).json({message: 'User is Admin'});
        }
        else{
            res.status(401).json({message: 'Unauthorized action'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

exports.getUsers = async (req, res)=>{
    
    try {
        const users = await userModel.find({isAdmin: {$ne: true}}).sort({createdAt: -1});
        return res.status(200).json({message: 'User fetched success', users});
    } catch (error) {
        return res.status(500).json({message: 'Server error',});
    }
}

exports.deleteUser = async(req, res)=>{
    const userId = req.params.userId;
    try {
        const user = await userModel.findByIdAndDelete(userId);
        if (user) {
            res.status(200).json({message: 'User deleted'});
        }
        else{
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

exports.banUser = async(req, res)=>{
    const { userId, banAction } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (user) {
            if (banAction === 'ban') {
                user.isBanned = true;
            }
            else if (banAction === 'unban'){
                user.isBanned = false;
            }
            else{
                return res.status(401).json({message: 'Ban action is not valid'});
            }
            await user.save();
            res.status(200).json({message: 'User banned'});
        }
        else{
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

exports.setCartItems = async(req, res)=>{
    const cartItem = req.body;
    const {userId} = req.user;
    try {
        const user = await userModel.findById(userId);
        if (user) {
            const found = user.cart.find((i)=> i.product == cartItem.product);
            if (found) {
                if (found.quantity == cartItem.quantity) {
                    return res.status(400).json({message: 'item already exists'});
                }
                else{
                    user.cart.map((i)=> i.product == cartItem.product ? i.quantity = cartItem.quantity : i.quantity);
                    await user.save();
                    return res.status(200).json({message: 'cart item set success'});
                } 
            }
            user.cart.push(cartItem);
            await user.save();
            res.status(200).json({message: 'cart item set success'});
        }
        else{
            res.status(404).json({message: 'user not found'});
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'server error'});
    }
}

exports.getCartItems = async(req, res)=>{
    const {userId} = req.user;
    try {
        const user = await userModel.findById(userId).populate('cart.product');
        if (user) {
            // const cartProducts = user.cart.map((element)=> element.product);
            res.status(200).json({message: 'cart item get success', cartItems: user.cart});
        }
        else{
            res.status(404).json({message: 'user not found'});
        }
    } catch (error) {
        console.log(error); 
        
        res.status(500).json({message: 'server error'});
    }
}

exports.deleteCartItems = async(req, res)=>{
    const {userId} = req.user;
    const {productId} = req.body;
    try {
        const user = await userModel.findById(userId);
        if (user) {
            user.cart = user.cart.filter((item)=> item.product != productId);
            await user.save();
            res.status(200).json({message: 'cart item delete success'});
        }
        else{
            res.status(404).json({message: 'user not found'});
        }
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: 'server error'});
    }
}