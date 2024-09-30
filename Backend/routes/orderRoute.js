const express = require('express');
const { isLoggedIn } = require('../middleware/authMiddleware');
const { getOrder, getOrders } = require('../controllers/orderController');
const router = express.Router();

router.get('/getOrders', isLoggedIn, getOrders);
router.get('/getOrder/:orderId', isLoggedIn, getOrder);

module.exports = router;