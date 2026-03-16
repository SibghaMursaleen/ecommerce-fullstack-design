import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import iphone from '../assets/iphone.png';
import gopro from '../assets/Gopro_Cameras.png';
import smartWatch from '../assets/Smart_Watches.png';
import laptop from '../assets/Laptops.png';
import xiaomi from '../assets/xiaomi.jpg';
import iphoneBlue from '../assets/deal_smartphone.png';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart, clearCart } = useCart();
    const { formatPrice } = useCurrency();

    const [savedItems] = useState([
        { id: 'save-1', title: "Xiaomi Redmi Note 9 Pro, 128GB, Interstellar Black", price: 99.50, image: xiaomi },
        { id: 'save-2', title: "Apple iPhone 11, 128GB, Product Red - Fully Unlocked", price: 998.00, image: iphone },
        { id: 'save-3', title: "Amazfit GTR 3 Smart Watch with GPS & Health Tracking", price: 179.99, image: smartWatch },
        { id: 'save-4', title: "HP Spectre x360 14-inch 14\" 2-in-1 Touchscreen Laptop", price: 1399.99, image: laptop },
    ]);

    const safeCartItems = Array.isArray(cartItems) ? cartItems.filter(Boolean) : [];

    const updateQty = (id, newQty) => {
        const product = safeCartItems.find(item => item?.id === id);
        if (product) {
            addToCart({ ...product, qty: parseInt(newQty) - (product?.qty || 1) });
        }
    };

    const subtotal = safeCartItems.reduce((acc, item) => acc + (Number(item?.price || 0) * (item?.qty || 1)), 0);
    const discount = safeCartItems.length > 0 ? 60.00 : 0;
    const tax = safeCartItems.length > 0 ? 14.00 : 0;
    const total = Math.max(0, subtotal - discount + tax);

    return (
        <div className="bg-[#F7FAFC] min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-[24px] font-semibold text-[#1C1C1C] mb-6">My cart ({safeCartItems.length})</h1>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Side: Cart Items */}
                    <div className="flex-1">
                        <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-5">
                            {safeCartItems.length > 0 ? (
                                <div className="divide-y divide-[#DEE2E7]">
                                    {safeCartItems.map((item, index) => (
                                        <div key={item?.id || index} className="py-5 first:pt-0 last:pb-0">
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                {/* Image */}
                                                <div className="w-[100px] h-[100px] sm:w-[80px] sm:h-[80px] border border-[#DEE2E7] rounded-[6px] p-2 flex-shrink-0 flex items-center justify-center mx-auto sm:mx-0">
                                                    <img src={item?.image} alt={item?.title || item?.name || 'Product'} className="max-w-full max-h-full object-contain" />
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1">
                                                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                                                        <div className="flex-1 pr-4">
                                                            <h3 className="text-[#1C1C1C] font-medium leading-tight mb-1 text-[15px] sm:text-[16px]">{item?.title || item?.name || 'Product Item'}</h3>
                                                            <p className="text-[#8B96A5] text-[13px] sm:text-[14px]">
                                                                Size: {item?.size || 'N/A'}, Color: {item?.color || 'N/A'}, Material: {item?.material || 'N/A'}
                                                            </p>
                                                            <p className="text-[#8B96A5] text-[13px] sm:text-[14px]">Seller: {item?.seller || 'Store'}</p>
                                                        </div>
                                                        <p className="text-[#1C1C1C] font-semibold text-[16px]">{formatPrice(item?.price || 0)}</p>
                                                    </div>

                                                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => removeFromCart(item?.id)}
                                                                className="px-2.5 py-1.5 border border-[#DEE2E7] rounded-[6px] text-[#FF3838] text-[12px] sm:text-[13px] font-medium hover:bg-red-50 transition-colors"
                                                            >
                                                                Remove
                                                            </button>
                                                            <button className="px-2.5 py-1.5 border border-[#DEE2E7] rounded-[6px] text-[#0D6EFD] text-[12px] sm:text-[13px] font-medium hover:bg-blue-50 transition-colors">
                                                                Save for later
                                                            </button>
                                                        </div>

                                                        <div className="relative">
                                                            <select
                                                                value={item?.qty || 1}
                                                                onChange={(e) => updateQty(item?.id, e.target.value)}
                                                                className="appearance-none bg-white border border-[#DEE2E7] rounded-[6px] px-3 sm:px-4 py-2 pr-10 text-[13px] sm:text-[14px] font-medium focus:outline-none focus:border-primary cursor-pointer w-[110px] sm:w-[120px]"
                                                            >
                                                                {[1, 2, 3, 4, 5].map(n => (
                                                                    <option key={n} value={n}>Qty: {n}</option>
                                                                ))}
                                                            </select>
                                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                                <span className="material-icons text-[#8B96A5] text-[20px]">expand_more</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-[#8B96A5] mb-4">Your cart is empty</p>
                                    <Link to="/" className="text-[#0D6EFD] font-medium hover:underline">Continue shopping</Link>
                                </div>
                            )}

                            {/* Bottom Actions */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-5 border-t border-[#DEE2E7]">
                                <Link
                                    to="/"
                                    className="w-full sm:w-auto bg-[#0D6EFD] text-white px-6 py-2.5 rounded-[6px] font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    <span className="material-icons text-[20px]">arrow_back</span>
                                    Back to shop
                                </Link>
                                {safeCartItems.length > 0 && (
                                    <button
                                        onClick={() => clearCart()}
                                        className="w-full sm:w-auto border border-[#DEE2E7] text-[#0D6EFD] px-6 py-2.5 rounded-[6px] font-medium text-[15px] hover:bg-gray-50 transition-colors"
                                    >
                                        Remove all
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Additional Info / Banners could go here as in the layout */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                { icon: 'lock', title: 'Secure Payment', desc: 'Your data is protected' },
                                { icon: 'support_agent', title: 'Customer Support', desc: 'Available 24/7' },
                                { icon: 'local_shipping', title: 'Free Delivery', desc: `On orders over ${formatPrice(50)}` },
                            ].map((info, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#EFF2F4] rounded-full flex items-center justify-center shrink-0">
                                        <span className="material-icons text-[#8B96A5]">{info.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-[#1C1C1C] text-[14px] font-medium">{info.title}</p>
                                        <p className="text-[#8B96A5] text-[12px]">{info.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Sidebar */}
                    <div className="w-full lg:w-[320px] flex-shrink-0 space-y-4">
                        {/* Coupon Box */}
                        <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-5">
                            <p className="text-[#505050] text-[14px] mb-3">Have a coupon?</p>
                            <div className="flex border border-[#DEE2E7] rounded-[6px] overflow-hidden">
                                <input
                                    type="text"
                                    placeholder="Add coupon"
                                    className="flex-1 px-4 py-2.5 text-[14px] focus:outline-none min-w-0"
                                />
                                <button className="px-5 py-2.5 text-[#0D6EFD] font-semibold text-[14px] border-l border-[#DEE2E7] hover:bg-gray-50 transition-colors whitespace-nowrap">
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-5 shadow-sm">
                            <div className="space-y-3 mb-4">
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
                            </div>
                            <div className="pt-4 border-t border-[#DEE2E7] mb-6">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-[#1C1C1C] text-[18px] font-semibold">Total:</span>
                                    <span className="text-[#1C1C1C] text-[22px] font-bold">{formatPrice(total)}</span>
                                </div>
                            </div>
                            <Link to="/checkout" className="block text-center w-full bg-[#00B517] text-white py-3 rounded-[6px] font-bold text-[18px] hover:bg-[#009e14] transition-colors shadow-sm mb-4">
                                Checkout
                            </Link>

                            {/* Payment Methods */}
                            <div className="flex justify-center items-center gap-3">
                                <div className="flex gap-2 grayscale opacity-60">
                                    <img src="https://img.icons8.com/color/48/visa.png" className="h-6 object-contain" alt="Visa" />
                                    <img src="https://img.icons8.com/color/48/mastercard.png" className="h-6 object-contain" alt="Mastercard" />
                                    <img src="https://img.icons8.com/color/48/paypal.png" className="h-6 object-contain" alt="Paypal" />
                                    <img src="https://img.icons8.com/color/48/apple-pay.png" className="h-6 object-contain" alt="Apple Pay" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Saved for later section */}
                <div className="mt-8 bg-white border border-[#DEE2E7] rounded-[6px] p-6">
                    <h2 className="text-[20px] font-semibold text-[#1C1C1C] mb-5">Saved for later</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                        {savedItems.map((item) => (
                            <div key={item.id} className="group">
                                <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 flex items-center justify-center mb-3 h-[200px]">
                                    <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                                </div>
                                <p className="text-[#1C1C1C] font-semibold text-[18px] mb-1">{formatPrice(item.price || 0)}</p>
                                <p className="text-[#8B96A5] text-[14px] leading-tight mb-3 line-clamp-2">
                                    {item.title}
                                </p>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="flex items-center gap-2 px-3 py-2 border border-[#DEE2E7] rounded-[6px] text-[#0D6EFD] text-[14px] font-medium hover:bg-blue-50 transition-colors"
                                >
                                    <span className="material-icons text-[18px]">shopping_cart</span>
                                    Move to cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Super Discount Banner */}
                <div className="mt-6 w-full bg-[#0D6EFD] rounded-[6px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between relative overflow-hidden mb-10">
                    <div
                        className="absolute right-0 top-0 h-full w-[40%] bg-white opacity-10"
                        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
                    />
                    <div className="relative z-10 text-center sm:text-left mb-4 sm:mb-0">
                        <h2 className="text-white text-[24px] sm:text-[28px] font-semibold leading-tight mb-2">
                            Super discount on more than {formatPrice(100)}
                        </h2>
                        <p className="text-white text-opacity-80 text-[16px]">
                            Have you ever finally just write dummy info
                        </p>
                    </div>
                    <button className="relative z-10 bg-[#FF9017] text-white px-6 py-2.5 rounded-[6px] font-semibold hover:bg-orange-600 transition-colors">
                        Shop now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
