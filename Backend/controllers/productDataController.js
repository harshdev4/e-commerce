const path = require('path');
const productModel = require('../models/product');
const userModel = require('../models/User');
const orderModel = require('../models/order');
const fs = require('fs');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const deleteFiles = (files, origin) => {
    if (origin === 'addProduct') {
        files.forEach(file => {
            fs.unlink(file.path, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error deleting file' });
                }
            });
        });
    } 

    else if(origin === 'deleteProduct'){
        console.log(files);

        files.forEach((file) => {
            fs.unlink(`uploads/${file}`, (err)=>{
                if (err) {
                    return res.status(500).json({ message: 'Error deleting file' }); 
                }
            })
        })
    }
}

exports.addProduct = async (req, res) => {
    const { name, desc, feature, offerPrice, usualPrice, category, stock } = req.body;
    const files = req.files;

    if (!name || !desc || !feature || !offerPrice || !usualPrice || !category || !stock || files.length == 0) {
        deleteFiles(files, 'addProduct');
        return res.status(500).json({ message: 'All field are required' });
    }
    try {
        const imagePaths = files.map(file => file.filename);
        const product = await productModel.create({ images: imagePaths, name, description: desc, features: feature, offerPrice, usualPrice, category, stock });
        res.status(200).json({ message: 'Product added success', product });
    } catch (error) {
        console.log(error);
        deleteFiles(files, 'addProduct');
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await productModel.find().sort({ createadAt: -1 });
        res.status(200).json({ message: 'product get success', products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getProductsCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await productModel.find({ category }).sort({ createadAt: -1 });

        res.status(200).json({ message: 'product get success', products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await productModel.findByIdAndDelete(productId);
        if (product) {
            deleteFiles(product.images, 'deleteProduct')
            res.status(200).json({ message: 'product get deleted' });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getImage = (req, res) => {
    try {
        const imgName = req.params.imgName;
        const filePath = path.join(__dirname, '..', 'uploads', imgName);
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);   
        } else {
            res.status(404).json({message: 'File not found'});
        }

    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

exports.getNewProducts = async (req, res) => {
    try {
        const products = await productModel.find().limit(10);
        res.status(200).json({message: 'new product get success', products});
    } catch (error) {
        res.status(500).json({message: 'Server'});
    }
}

exports.getProductsByCategory = async (req, res) => { 
    const {category} = req.params;
    try {
        const products = await productModel.find({category: { $regex: category, $options: 'i' }});
        res.status(200).json({message: 'new product get success', products});
    } catch (error) {
        res.status(500).json({message: 'Server'});
    }  
}

exports.getProductById = async (req, res) =>{
    const {productId} = req.params;
     
    try {
        const product = await productModel.findById(productId);
        if (product) {
            res.status(200).json({message: 'Product found', product});
        }
        else{
            res.status(404).json({message: 'Product not found',});
        }
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: 'Server error'});
    }
}

exports.getProductByIds = async (req, res) =>{
    let {productId} = req.params;
    productId = productId.split(',');
     
    try {
        const product = await productModel.find({_id : {$in:productId}});
        if (product) {
            res.status(200).json({message: 'Product found', product});
        }
        else{
            res.status(404).json({message: 'Product not found',});
        }
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: 'Server error'});
    }
}

exports.getCartProduct = async (req, res)=>{
    let {cart} = req.params; 
    cart = cart.split(',');
    try {
        const cartItems = await productModel.find({_id: { $in: cart }});
        if (cartItems.length > 0) {
            res.status(200).json({message: "cart fetch success", cartItems});
        }
        else{
            res.status(404).json({message: "product not found"});
        }
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: "Server error"});
    }
}

exports.search = async (req, res)=>{
    const {value} = req.params;
    try {
        let products = await productModel.find({ $or: [
            { name: { $regex: value, $options: 'i' } },
            { category: { $regex: value, $options: 'i' } }
        ]});

        if (products.length === 0) {
            products = await productModel.find({ $or: [
                { description: { $regex: value, $options: 'i' } },
            ]})
        }

        res.status(200).json({ message: 'search success', products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.payment = async (req, res) => {
    const { products, email } = req.body;
    
    try {
        const line_items = products.map(product => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: product.name,
                },
                unit_amount: product.offerPrice * 100,
            },
            quantity: product.quantity,
        }));

        const productIds = products.map(product => product._id).join(',');

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `http://localhost:3000/api/product/successPayment/?productIds=${productIds}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:5173/payment/cancel',
            metadata: {
                productIds: productIds,
            },
            customer_email: email
        });

        res.status(200).json({ message: 'payment', session });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};

exports.successPayment = async(req, res)=>{
    let {productIds, session_id} = req.query;
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const user = await userModel.findById(req.user.userId).populate('cart.product');
        let products;
        productIds = productIds.split(',');
        products = user.cart.filter(item => productIds.includes(item.product._id.toString()));

        const orderItems = products.map(item => ( {product: item.product._id, name: item.product.name, quantity: item.quantity, price: item.product.offerPrice*item.quantity}))
        const shippingAddress = {
            street: user.address.street,
            city: user.address.city,
            postalCode: user.address.postalCode,
        }
        const paymentMethod = "Card";
        const shippingPrice = 0;
        const totalPrice = session.amount_total;
        const isDelivered = false;
        const deliveredAt = new Date(Date.now() + 4*24*60*60*1000);
        const orders = await orderModel.create({user: user._id, orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice, isDelivered, deliveredAt});
        res.cookie('pS', true);
        res.redirect(`http://localhost:5173/payment/success/${session.metadata.productIds}`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}
 