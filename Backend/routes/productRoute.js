const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const productDataController = require('../controllers/productDataController');
const isAdmin = require('../middleware/isAdmin');
const {isLoggedIn} = require('../middleware/Authmiddleware')

router.post('/addProduct', isAdmin, upload.array('images', 10), productDataController.addProduct);
router.get('/getProducts', isAdmin, productDataController.getProducts);
router.get('/getProductsCategory/:category', isAdmin, productDataController.getProductsCategory);
router.get('/getImage/:imgName', productDataController.getImage);
router.get('/deleteProduct/:productId', isAdmin, productDataController.deleteProduct);
router.get('/getNewProducts', productDataController.getNewProducts);
router.get('/getProductsByCategory/:category', productDataController.getProductsByCategory);
router.get('/getProductById/:productId', productDataController.getProductById);
router.get('/getProductByIds/:productId', productDataController.getProductByIds);
router.get('/getCartProduct/:cart', productDataController.getCartProduct);
router.get('/search/:value', productDataController.search);
router.post('/payment', isLoggedIn, productDataController.payment);
router.get('/successPayment', isLoggedIn, productDataController.successPayment);

module.exports = router;