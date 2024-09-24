const express = require('express');
const userDataController = require('../controllers/userDataController');
const { isLoggedIn } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.get('/getUserData/:userId', isLoggedIn, userDataController.getUserData);
router.post('/:userId/editInfo/:editType', isLoggedIn, userDataController.editUserData);
router.get('/:userId/isAdmin', isLoggedIn, userDataController.isAdmin);
router.get('/getUsers', isAdmin, userDataController.getUsers);
router.get('/deleteUser/:userId', isAdmin, userDataController.deleteUser);
router.post('/banUser/', isAdmin, userDataController.banUser);
router.post('/setCartItems/', isLoggedIn, userDataController.setCartItems);
router.get('/getCartProduct/', isLoggedIn, userDataController.getCartItems);
router.post('/deleteCartItems/', isLoggedIn, userDataController.deleteCartItems);

module.exports = router; 