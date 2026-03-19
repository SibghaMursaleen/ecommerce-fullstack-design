const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    rating: { type: Number, default: 0 },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    image: { type: String },
    stock: { type: Number, default: 0 },
    description: { type: String },
    longDescription: { type: String },
    isBestSeller: { type: Boolean, default: false },
    salesCount: { type: String },
    deal: { type: String },
    reviews: { type: Array, default: [] },
    specs: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
