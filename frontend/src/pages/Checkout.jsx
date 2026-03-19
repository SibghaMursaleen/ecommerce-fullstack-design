import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const Checkout = () => {
    const { cartItems, clearCart, addOrder } = useCart();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const safeCartItems = Array.isArray(cartItems) ? cartItems.filter(Boolean) : [];
    const subtotal = safeCartItems.reduce((acc, item) => acc + (Number(item?.price || 0) * (item?.qty || 1)), 0);
    const discount = safeCartItems.length > 0 ? 60.00 : 0;
    const tax = safeCartItems.length > 0 ? 14.00 : 0;
    const total = Math.max(0, subtotal - discount + tax);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Construct the order object for the backend
            const orderData = {
                items: safeCartItems.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    qty: item.qty,
                    image: item.image
                })),
                shippingAddress: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    zipCode: formData.zipCode
                },
                paymentMethod: paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery',
                totalAmount: total
            };

            await addOrder(orderData);
            alert('Order placed successfully!');
            clearCart();
            navigate('/orders');
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (safeCartItems.length === 0) {
        return (
            <div className="bg-[#F7FAFC] min-h-screen py-10">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <div className="bg-white border border-[#DEE2E7] rounded-lg p-16">
                        <span className="material-icons text-[#8B96A5] text-6xl mb-4">remove_shopping_cart</span>
                        <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2">Checkout is unavailable</h3>
                        <p className="text-[#8B96A5] mb-6 max-w-md mx-auto">You have no items in your cart to checkout. Please add some items first.</p>
                        <Link to="/products" className="bg-[#0D6EFD] text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors inline-block">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F7FAFC] min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-[1100px]">
                <h1 className="text-[24px] font-semibold text-[#1C1C1C] mb-6">Checkout</h1>

                <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-6">
                    {/* Left Side: Billing Details */}
                    <div className="flex-1 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-[#1C1C1C] mb-4">Shipping Address</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-[#1C1C1C]">First Name *</label>
                                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]" placeholder="Enter first name" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-[#1C1C1C]">Last Name *</label>
                                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]" placeholder="Enter last name" />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-medium text-[#1C1C1C]">Email Address *</label>
                                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]" placeholder="Enter email" />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-sm font-medium text-[#1C1C1C]">Street Address *</label>
                                    <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]" placeholder="House number and street name" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-[#1C1C1C]">City *</label>
                                    <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]" placeholder="City" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-[#1C1C1C]">ZIP Code *</label>
                                    <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} type="text" className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]" placeholder="Postal code" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-[#1C1C1C] mb-4">Payment Method</h2>
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 p-3 border border-[#0D6EFD] bg-blue-50 rounded-[6px] cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="w-4 h-4 text-primary"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                    />
                                    <span className="font-medium text-[#1C1C1C]">Credit or Debit Card</span>
                                    <div className="ml-auto flex gap-1">
                                        <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-5" />
                                        <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-5" />
                                    </div>
                                </label>

                                {/* Card Inputs Placeholder */}
                                <div className={`pl-6 space-y-4 ${paymentMethod !== 'card' ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-[#1C1C1C]">Card Number *</label>
                                        <input required={paymentMethod === 'card'} type="text" className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-[#1C1C1C]">Expiry Date *</label>
                                            <input required={paymentMethod === 'card'} type="text" className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]" placeholder="MM/YY" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-[#1C1C1C]">CVC *</label>
                                            <input required={paymentMethod === 'card'} type="text" className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]" placeholder="123" />
                                        </div>
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 p-3 border border-[#DEE2E7] rounded-[6px] cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="w-4 h-4 text-primary"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={() => setPaymentMethod('paypal')}
                                    />
                                    <span className="font-medium text-[#1C1C1C]">PayPal</span>
                                    <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-5 ml-auto" />
                                </label>

                                <label className="flex items-center gap-3 p-3 border border-[#DEE2E7] rounded-[6px] cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="w-4 h-4 text-primary"
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => setPaymentMethod('cod')}
                                    />
                                    <span className="font-medium text-[#1C1C1C]">Cash on Delivery (COD)</span>
                                    <span className="material-icons text-[#8B96A5] ml-auto text-xl">local_shipping</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="w-full lg:w-[380px] flex-shrink-0">
                        <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-6 shadow-sm sticky top-6">
                            <h2 className="text-lg font-semibold text-[#1C1C1C] mb-4">Order Summary</h2>

                            {/* Items List */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                                {safeCartItems.map((item, index) => (
                                    <div key={item?.id || index} className="flex gap-3">
                                        <div className="w-16 h-16 border border-[#DEE2E7] rounded-[6px] p-1 flex items-center justify-center flex-shrink-0">
                                            <img src={item?.image} alt={item?.title} className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[14px] text-[#1C1C1C] font-medium leading-tight line-clamp-2">{item?.title}</h4>
                                            <p className="text-[13px] text-[#8B96A5] mt-1">Qty: {item?.qty || 1}</p>
                                        </div>
                                        <div className="font-semibold text-[#1C1C1C] text-[15px]">
                                            {formatPrice(Number(item?.price || 0) * (item?.qty || 1))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 mb-4 border-t border-[#DEE2E7] pt-4">
                                <div className="flex justify-between text-[#505050]">
                                    <span>Subtotal:</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-[#FF3838]">
                                    <span>Discount:</span>
                                    <span>- {formatPrice(discount)}</span>
                                </div>
                                <div className="flex justify-between text-[#00B517]">
                                    <span>Tax:</span>
                                    <span>+ {formatPrice(tax)}</span>
                                </div>
                                <div className="flex justify-between text-[#505050]">
                                    <span>Shipping:</span>
                                    <span className="text-[#00B517]">Free</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[#DEE2E7] mb-6">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[#1C1C1C] text-[18px] font-semibold">Total:</span>
                                    <span className="text-[#1C1C1C] text-[24px] font-bold">{formatPrice(total)}</span>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-[#00B517] text-white py-3 rounded-[6px] font-bold text-[18px] hover:bg-[#009e14] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-icons animate-spin text-xl">sync</span>
                                        Processing...
                                    </>
                                ) : 'Place Order'}
                            </button>
                            <p className="text-center text-[#8B96A5] text-[12px] mt-3">
                                By clicking Place Order, you agree to our terms and conditions.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
