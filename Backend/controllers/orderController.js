const orderModel = require('../models/order');

exports.getOrders = async (req, res) =>{
    const { userId } = req.user;
    try {
        const orders = await orderModel.find({user: userId}).populate('orderItems.product').sort({createdAt: -1});
        res.status(200).json({message: 'order fetched success', orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'server error'});
    }
}

exports.getOrder = async (req, res) =>{
    const { orderId } = req.params;
    try {
        const order = await orderModel.findById(orderId).populate('orderItems.product');
        res.status(200).json({message: 'order fetched success', order});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'server error'});
    }
}