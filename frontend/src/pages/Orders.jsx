import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const Orders = () => {
    const { orders } = useCart();
    const { formatPrice } = useCurrency();

    // Review Modal State
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewItem, setReviewItem] = useState(null);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');

    const openReviewModal = (item) => {
        setReviewItem(item);
        setRating(5);
        setReviewText('');
        setIsReviewModalOpen(true);
    };

    const submitReview = () => {
        alert(`Review submitted for ${reviewItem.title}!\nRating: ${rating} Stars\nReview: ${reviewText}`);
        setIsReviewModalOpen(false);
    };

    return (
        <div className="bg-[#F7FAFC] min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-[16px] text-[#8B96A5] mb-6 space-x-2">
                    <Link to="/" className="cursor-pointer hover:text-[#1C1C1C] transition-colors">Home</Link>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8L14 12L10 16" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#1C1C1C]">My Orders</span>
                </nav>

                <h1 className="text-3xl font-bold text-[#1C1C1C] mb-6">My Orders</h1>

                {orders && orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden">
                                <div className="bg-[#F7FAFC] border-b border-[#DEE2E7] p-4 flex flex-wrap justify-between items-center gap-4">
                                    <div className="flex gap-6 text-sm">
                                        <div>
                                            <p className="text-[#8B96A5] mb-0.5">Order ID</p>
                                            <p className="font-semibold text-[#1C1C1C]">{order.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-[#8B96A5] mb-0.5">Date Placed</p>
                                            <p className="font-medium text-[#1C1C1C]">{order.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-[#8B96A5] mb-0.5">Total</p>
                                            <p className="font-semibold text-[#1C1C1C]">{formatPrice(order.total)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[#8B96A5] mb-0.5">Payment Method</p>
                                            <p className="font-medium text-[#1C1C1C]">{order.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="bg-blue-100 text-[#0D6EFD] px-3 py-1 rounded-full text-xs font-semibold">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 items-center">
                                            <div className="w-16 h-16 border border-[#DEE2E7] rounded-[6px] p-1 flex-shrink-0 flex items-center justify-center">
                                                <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <Link to={`/products`} className="text-[#1C1C1C] font-medium hover:text-[#0D6EFD] transition-colors line-clamp-1">
                                                    {item.title}
                                                </Link>
                                                <p className="text-[#8B96A5] text-sm mt-1">Qty: {item.qty} • {formatPrice(item.price)}</p>
                                            </div>
                                            <div className="hidden sm:block">
                                                <button
                                                    onClick={() => openReviewModal(item)}
                                                    className="text-[#0D6EFD] border border-[#0D6EFD] px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
                                                >
                                                    Write Review
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-[#DEE2E7] rounded-lg p-16 flex flex-col items-center justify-center text-center">
                        <span className="material-icons text-[#8B96A5] text-6xl mb-4">inventory_2</span>
                        <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2">No orders placed</h3>
                        <p className="text-[#8B96A5] mb-6 max-w-md">You haven't placed any orders yet. Once you make a purchase, you can track your shipments and view invoices here.</p>
                        <Link to="/products" className="bg-[#0D6EFD] text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {isReviewModalOpen && reviewItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                        <div className="flex justify-between items-center mb-4 border-b border-[#DEE2E7] pb-4">
                            <h3 className="text-xl font-semibold text-[#1C1C1C]">Write a Review</h3>
                            <button onClick={() => setIsReviewModalOpen(false)} className="text-[#8B96A5] hover:text-[#1C1C1C]">
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        <div className="flex gap-4 items-center mb-6">
                            <img src={reviewItem.image} alt={reviewItem.title} className="w-16 h-16 object-contain border border-[#DEE2E7] rounded p-1" />
                            <p className="text-[#1C1C1C] font-medium text-sm line-clamp-2">{reviewItem.title}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#1C1C1C] mb-2">Overall Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`material-icons text-3xl cursor-pointer ${star <= rating ? 'text-[#FF9017]' : 'text-[#DEE2E7]'}`}
                                    >
                                        star
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-[#1C1C1C] mb-2">Add a written review</label>
                            <textarea
                                rows="4"
                                className="w-full border border-[#DEE2E7] rounded-md p-3 text-sm focus:outline-none focus:border-[#0D6EFD]"
                                placeholder="What did you like or dislike? What did you use this product for?"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsReviewModalOpen(false)}
                                className="px-5 py-2.5 text-[#505050] font-medium border border-[#DEE2E7] rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitReview}
                                className="px-5 py-2.5 bg-[#0D6EFD] text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                                disabled={!reviewText.trim()}
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
