import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { fetchProducts } from '../services/api';
import Skeleton from '../components/Skeleton';

const BestSellerCard = ({ product }) => {
    const { formatPrice } = useCurrency();
    return (
        <div className="bg-white border border-border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 relative group">
            {/* Best Seller Badge */}
            <div className="absolute top-2 left-2 z-20">
                <span className="bg-[#FF9017] text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                    <span className="material-icons text-[12px] md:text-[14px]">star</span>
                    BEST SELLER
                </span>
            </div>

            {/* Product Image */}
            <Link to={`/product/${product.id}`} className="block relative h-40 md:h-52 overflow-hidden bg-white p-4">
                <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
            </Link>

            {/* Product Info */}
            <div className="p-4 flex-1 flex flex-col border-t border-border">
                <div className="mb-2">
                    <span className="text-[#FF9017] font-bold text-lg">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                        <span className="text-gray-text text-sm line-through ml-2">{formatPrice(product.oldPrice)}</span>
                    )}
                </div>

                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-[#FF9017]">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-icons text-sm md:text-base">
                                {i < Math.floor(product.rating) ? 'star' : 'star_border'}
                            </span>
                        ))}
                    </div>
                    <span className="text-gray-text text-xs md:text-sm">{product.rating}</span>
                </div>

                <Link 
                    to={`/product/${product.id}`}
                    className="text-dark hover:text-primary font-medium text-sm md:text-base mb-2 line-clamp-2 transition-colors flex-1"
                >
                    {product.title}
                </Link>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center text-green-600 font-bold text-xs uppercase tracking-wider">
                        <span className="material-icons text-sm mr-1">trending_up</span>
                        {product.salesCount}
                    </div>
                </div>
            </div>
        </div>
    );
};

const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState({
        days: 4,
        hours: 13,
        minutes: 34,
        seconds: 56
    });

    useEffect(() => {
        const loadBestSellers = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts();
                // If the backend doesn't have a specific best seller endpoint, filter here
                const filtered = data.filter(p => p.isBestSeller || (p.salesCount && parseInt(p.salesCount) > 100));
                setBestSellers(filtered.length > 0 ? filtered : data.slice(0, 8)); // Fallback to first 8 if none marked
            } catch (err) {
                console.error("Error loading best sellers:", err);
            } finally {
                setLoading(false);
            }
        };
        loadBestSellers();

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gray-bg min-h-screen">
            <div className="container mx-auto px-4 py-6 md:py-10">
                {/* Header Layout */}
                <div className="bg-white rounded-lg border border-border overflow-hidden mb-8 shadow-sm">
                    <div className="flex flex-col md:flex-row">
                        {/* Title Section */}
                        <div className="md:w-1/3 p-6 md:p-8 bg-gradient-to-br from-[#FF9017] to-[#FFB86C] text-white flex flex-col justify-center">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Best Sellers</h1>
                            <p className="text-white/90 mb-6 text-sm md:text-base">Top-rated worldwide trending products of this month</p>
                            
                            <div className="flex gap-2 md:gap-3">
                                {[
                                    { label: 'Days', val: timeLeft.days },
                                    { label: 'Hour', val: timeLeft.hours },
                                    { label: 'Min', val: timeLeft.minutes },
                                    { label: 'Sec', val: timeLeft.seconds }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-black/20 backdrop-blur-sm rounded px-2 py-1.5 md:px-3 md:py-2 flex flex-col items-center min-w-[50px] md:min-w-[60px]">
                                        <span className="font-bold text-lg md:text-xl leading-none">{String(item.val).padStart(2, '0')}</span>
                                        <span className="text-[10px] uppercase mt-0.5">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Banner Image / Promo Section */}
                        <div className="md:w-2/3 p-6 md:p-8 flex items-center justify-center bg-white relative overflow-hidden">
                            <div className="z-10 text-center md:text-left">
                                <h2 className="text-xl md:text-2xl font-bold text-dark mb-4">Highest Performance Products</h2>
                                <p className="text-gray-text mb-6 max-w-md">Our customers verified these items as the most reliable and high-quality selections available in our store.</p>
                                <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                                    Shop Collection
                                </button>
                            </div>
                            {/* Subtle geometric background shapes */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FF9017]/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, idx) => (
                            <div key={idx} className="bg-white rounded-lg border border-border p-4 h-[350px]">
                                <Skeleton width="100%" height="200px" />
                                <Skeleton width="80%" height="24px" className="mt-4" />
                                <Skeleton width="40%" height="20px" className="mt-2" />
                            </div>
                        ))
                    ) : bestSellers.length > 0 ? (
                        bestSellers.map(product => (
                            <BestSellerCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-white rounded-lg border border-border">
                            <p className="text-gray-text">No best sellers available at the moment.</p>
                        </div>
                    )}
                </div>

                {/* Trust Footer */}
                <div className="mt-12 p-8 bg-white rounded-lg border border-border text-center shadow-sm">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                                <span className="material-icons">verified</span>
                            </div>
                            <span className="font-bold text-dark">Verified Quality</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                                <span className="material-icons">local_shipping</span>
                            </div>
                            <span className="font-bold text-dark">Express Delivery</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                                <span className="material-icons">loop</span>
                            </div>
                            <span className="font-bold text-dark">Easy Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSellers;
