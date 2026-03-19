import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserDashboardLayout from './UserDashboardLayout';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const Orders = () => {
    const { orders, loading } = useCart();
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
        <UserDashboardLayout>
            <div className="space-y-6">
                <div className="bg-white border border-[#DEE2E7] rounded-xl p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[#1C1C1C]">Order History</h2>
                        <span className="text-sm text-[#8B96A5]">{orders?.length || 0} orders total</span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                        </div>
                    ) : !orders || orders.length === 0 ? (
                        <div className="text-center py-20 bg-[#F7FAFC] rounded-xl border-2 border-dashed border-[#DEE2E7]">
                            <span className="material-icons text-6xl text-[#DEE2E7] mb-4">inventory_2</span>
                            <h3 className="text-lg font-semibold text-[#1C1C1C]">No orders yet</h3>
                            <p className="text-[#8B96A5] mb-6">You haven't placed any orders yet. Start shopping to see them here!</p>
                            <Link to="/products" className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all inline-block shadow-md">
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order?._id || order?.id || Math.random()} className="border border-[#DEE2E7] rounded-xl overflow-hidden transition-all hover:shadow-md">
                                    {/* Order Header */}
                                    <div className="bg-[#F7FAFC] p-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#DEE2E7]">
                                        <div className="flex gap-6">
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-[#8B96A5] tracking-wider mb-1">Order Placed</p>
                                                <p className="text-sm text-[#1C1C1C] font-semibold">{new Date(order.createdAt || order.date).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-[#8B96A5] tracking-wider mb-1">Total</p>
                                                <p className="text-sm text-[#1C1C1C] font-bold">{formatPrice(order?.totalAmount || order?.total || 0)}</p>
                                            </div>
                                            <div className="hidden sm:block">
                                                <p className="text-[10px] uppercase font-bold text-[#8B96A5] tracking-wider mb-1">Status</p>
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                    order.status === 'Processing' ? 'bg-blue-50 text-primary' :
                                                    order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-gray-100'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-[#8B96A5] font-mono">
                                            #{(order?._id || order?.id || '00000000').slice(-8).toUpperCase()}
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="p-6 space-y-4">
                                        {order?.items?.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center">
                                                <div className="w-16 h-16 border border-[#DEE2E7] rounded p-1 flex-shrink-0 bg-white">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-[#1C1C1C] truncate">{item.title}</h4>
                                                    <p className="text-xs text-[#8B96A5]">Qty: {item.qty} • {formatPrice(item.price)}</p>
                                                </div>
                                                <button
                                                    onClick={() => openReviewModal(item)}
                                                    className="text-primary font-bold text-xs border border-primary px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors shrink-0"
                                                >
                                                    Write Review
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Footer */}
                                    <div className="px-6 py-3 bg-white border-t border-[#F1F3F5] flex justify-between items-center text-xs">
                                        <p className="text-[#8B96A5]">Payment: <span className="font-bold text-[#505050]">{order.paymentMethod}</span></p>
                                        <Link to="/products" className="text-primary font-bold hover:underline">Buy again</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Review Modal */}
            {isReviewModalOpen && reviewItem && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-[#1C1C1C]">Share Your Thoughts</h3>
                            <button onClick={() => setIsReviewModalOpen(false)} className="text-[#8B96A5] hover:text-[#1C1C1C] p-1">
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        <div className="flex gap-4 items-center mb-8 p-3 bg-[#F7FAFC] rounded-xl border border-[#DEE2E7]">
                            <img src={reviewItem.image} alt={reviewItem.title} className="w-14 h-14 object-contain" />
                            <p className="text-[#1C1C1C] font-semibold text-sm line-clamp-2">{reviewItem.title}</p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-[#505050] mb-3 text-center">How would you rate it?</label>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`material-icons text-4xl cursor-pointer transition-all active:scale-90 ${star <= rating ? 'text-[#FF9017]' : 'text-[#DEE2E7]'}`}
                                    >
                                        {star <= rating ? 'star' : 'star_border'}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-bold text-[#505050] mb-2">Write your review</label>
                            <textarea
                                rows="4"
                                className="w-full border border-[#DEE2E7] rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-all resize-none"
                                placeholder="What did you like or dislike? How was the quality?"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsReviewModalOpen(false)}
                                className="flex-1 px-5 py-3 text-[#505050] font-bold border border-[#DEE2E7] rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Not now
                            </button>
                            <button
                                onClick={submitReview}
                                className="flex-1 px-5 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
                                disabled={!reviewText.trim()}
                            >
                                Post Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </UserDashboardLayout>
    );
};

export default Orders;
