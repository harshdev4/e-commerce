const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Maya');
  

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  mobileNo: {type: Number, unique: true},
  isBanned: { type: Boolean, default: false },
  address: {
    street: { type: String },
    city: { type: String },
    postalCode: { type: String } 
  },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
    }
  ],
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
