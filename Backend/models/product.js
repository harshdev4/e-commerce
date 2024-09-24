const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Maya');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: String, required: true },
  offerPrice: { type: Number, required: true },
  usualPrice: { type: Number, required: true },
  brand: { type: String },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  images: [{ type: String }], 
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, required: true },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
