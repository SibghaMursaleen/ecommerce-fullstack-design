import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { useCurrency } from '../context/CurrencyContext';

const CategorySection = ({ title, items, sidebarImg, otherProductsLink = "/products" }) => {
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    return (
        <section className="bg-white border border-border rounded-lg mt-5 overflow-hidden flex flex-col lg:flex-row">
            {/* Featured Sidebar */}
            <div className="lg:w-[280px] relative min-h-[250px] overflow-hidden flex flex-col">
                <img
                    src={sidebarImg || "https://placehold.co/280x400/e2e8f0/ffffff?text=Sidebar+Image"}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 p-6 flex flex-col items-start h-full">
                    <h2 className="text-xl font-bold text-dark mb-4 max-w-[150px]">{title}</h2>
                    <Link to={otherProductsLink} className="bg-white text-dark font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm inline-block">
                        Other products
                    </Link>
                </div>
            </div>

            {/* Product Grid (4 columns, 2 rows) */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4">
                {items.map((item, idx) => (
                    <Link
                        key={idx}
                        to={`/product/${item.id || 1}`}
                        className="p-3 sm:p-4 flex flex-row justify-between border-b border-r border-border hover:bg-gray-50 transition-colors cursor-pointer last:border-r-0 lg:[&:nth-child(4n)]:border-r-0 h-[120px] sm:h-[127px] product-card group relative block"
                    >
                        <div className="flex-1 pr-1 sm:pr-2">
                            <div className="flex justify-between items-start">
                                <p className="text-base text-dark font-medium leading-snug">{item.name}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart({ ...item, id: `cat-${title}-${idx}` });
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-primary text-white rounded-md flex items-center justify-center shadow-md scale-90 hover:scale-105"
                                >
                                    <span className="material-icons text-[18px]">add_shopping_cart</span>
                                </button>
                            </div>
                            <div className="mt-2">
                                <span className="text-gray-text text-sm">From</span>
                                <p className="text-gray-text text-sm">{formatPrice(item.price)}</p>
                            </div>
                        </div>
                        <div className="w-16 h-16 sm:w-20 sm:h-20 self-end flex items-center justify-center shrink-0">
                            <img
                                src={item.image || "https://placehold.co/100x80/f3f4f6/9ca3af?text=Product"}
                                alt={item.name}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
