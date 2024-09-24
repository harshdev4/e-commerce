const path = require('path');
const productModel = require('../models/product');
const fs = require('fs');

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
    console.log(category);
    
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