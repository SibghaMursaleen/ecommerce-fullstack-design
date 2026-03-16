import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products as allProducts } from '../data/products';
import NewsletterSection from '../components/NewsletterSection';
import Skeleton from '../components/Skeleton';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const HotOffers = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        minutes: 45,
        seconds: 30
    });

    const { addToCart } = useCart();

    // Specific categories as requested
    const targetCategories = ["Electronics", "Home & Garden", "Appliances", "Clothing & Apparel"];

    // Discount filtering and sorting
    // Filter products that have discounts
    const discountedProducts = allProducts.filter(p => 
        targetCategories.includes(p.category) && 
        p.oldPrice && 
        p.oldPrice > p.price
    );

    // Get exactly 3 deals and 7 regular offers
    const deals = discountedProducts.filter(p => p.deal).slice(0, 3);
    const regularOffers = discountedProducts.filter(p => !p.deal).slice(0, 7);
    
    // Combine for a total of 10 items
    const hotProducts = [...deals, ...regularOffers];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59, minutes: prev.minutes - 1 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-[#FFF5F5] min-h-screen">
            {/* High Impact Hero Banner */}
            <header className="bg-gradient-to-r from-[#EB001B] to-[#FF4747] text-white py-8 md:py-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-white/30">
                        Limited Time Offers
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                        HOT OFFERS & DEALS
                    </h1>

                    {/* Countdown Timer (Smaller) */}
                    <div className="flex justify-center gap-2 md:gap-4">
                        {['Days', 'Hours', 'Min', 'Sec'].map((label, idx) => {
                            const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];
                            return (
                                <div key={label} className="flex flex-col items-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-lg md:text-2xl font-black text-[#EB001B]">
                                            {String(values[idx]).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <span className="mt-1 text-[10px] md:text-xs font-bold uppercase opacity-80">{label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-[#1C1C1C]">Exclusive Deals</h2>
                        <div className="h-1 w-12 bg-[#EB001B] rounded-full mt-1"></div>
                    </div>
                    <p className="text-[#8B96A5] text-sm font-medium">
                        {hotProducts.length} Premium Deals
                    </p>
                </div>

                {/* Deals Grid (More columns for smaller items) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {hotProducts.map(product => (
                        <HotOfferCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
                    ))}
                </div>
            </main>

            <NewsletterSection />
        </div>
    );
};

const HotOfferCard = ({ product, onAddToCart }) => {
    const { formatPrice } = useCurrency();
    const [isLoaded, setIsLoaded] = useState(false);
    const discountPercent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    const stockPercent = Math.max(10, Math.floor(Math.random() * 80) + 20);

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col h-full border border-gray-100">
            {/* Image Container (Smaller) */}
            <div className="relative h-[160px] md:h-[200px] overflow-hidden bg-white flex items-center justify-center p-4">
                <div className="absolute top-2 left-2 z-20">
                    <span className="bg-[#EB001B] text-white text-[10px] md:text-xs font-black px-2 py-1 rounded-lg shadow-sm">
                        -{discountPercent}%
                    </span>
                </div>
                
                {product.deal && (
                    <div className="absolute top-2 right-2 z-20">
                        <span className="bg-[#FFD700] text-[#1C1C1C] text-[10px] md:text-xs font-black px-2 py-1 rounded-lg shadow-lg border border-white/50 animate-pulse">
                            {product.deal}
                        </span>
                    </div>
                )}
                
                <img
                    src={product.image}
                    alt={product.title}
                    className={`max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsLoaded(true)}
                />
                {!isLoaded && <div className="absolute inset-0"><Skeleton width="100%" height="100%" /></div>}
            </div>

            {/* Content Container (Tighter) */}
            <div className="p-4 flex flex-col flex-1">
                <Link to={`/product/${product.id}`} className="block mb-2">
                    <h3 className="text-sm font-bold text-[#1C1C1C] leading-snug hover:text-[#EB001B] transition-colors line-clamp-2 min-h-[2.5rem]">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-black text-[#1C1C1C]">{formatPrice(product.price)}</span>
                    <span className="text-xs text-[#8B96A5] line-through font-medium">{formatPrice(product.oldPrice)}</span>
                </div>

                {/* Urgency Progress (Slimmer) */}
                <div className="mb-4 space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
                        <span className="text-[#EB001B]">Low Stock</span>
                        <span className="text-[#8B96A5]">{stockPercent}% Sold</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                        <div 
                            className="h-full bg-gradient-to-r from-[#FF9017] to-[#EB001B]"
                            style={{ width: `${stockPercent}%` }}
                        ></div>
                    </div>
                </div>

                <div className="mt-auto flex gap-2">
                    <button
                        onClick={onAddToCart}
                        className="flex-1 bg-[#1C1C1C] text-white py-2 rounded-xl font-bold uppercase text-[10px] tracking-wider hover:bg-[#EB001B] transition-colors"
                    >
                        Add to Cart
                    </button>
                    <Link 
                        to={`/product/${product.id}`}
                        className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#EB001B] hover:border-[#EB001B] transition-all"
                    >
                        <span className="material-icons text-lg">visibility</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotOffers;
