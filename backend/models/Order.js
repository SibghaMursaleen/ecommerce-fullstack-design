const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
            image: { type: String }
        }
    ],
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0.0
    },
    status: {
        type: String,
        required: true,
        default: 'Processing'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
