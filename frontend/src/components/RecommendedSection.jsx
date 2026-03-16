import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

const RecommendedSection = ({ items }) => {
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    
    return (
        <section className="mt-8">
            <h2 className="text-[24px] font-semibold text-[#1C1C1C] mb-6 tracking-tight">Recommended items</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.map((item, idx) => (
                    <Link
                        key={idx}
                        to={`/product/${item.id}`}
                        className="bg-white border border-[#DEE2E7] rounded-[6px] p-3 flex flex-col transition-all cursor-pointer product-card hover:border-primary group"
                    >
                        <div className="h-[150px] flex items-center justify-center mb-3">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="max-h-full max-w-full object-contain mix-blend-multiply"
                            />
                        </div>
                        <div className="mt-auto">
                            <p className="text-[#1C1C1C] font-semibold text-[16px] mb-1">{formatPrice(item.price)}</p>
                            <p className="text-[#8B96A5] text-[14px] font-normal leading-snug line-clamp-2 mb-3">
                                {item.name}
                            </p>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToCart({ ...item, id: `rec-${idx}` });
                                }}
                                className="w-full bg-[#0D6EFD] text-white py-1.5 rounded-[6px] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                            >
                                Add to cart
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RecommendedSection;
