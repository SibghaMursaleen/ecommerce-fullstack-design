import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
    const { formatPrice } = useCurrency();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isFavorited = isInWishlist(product.id);
    
    return (
        <div className="bg-white border border-[#DEE2E7] rounded-[6px] p-4 flex flex-col md:flex-row gap-6 mb-4 hover:shadow-sm transition-shadow">
            {/* Product Image */}
            <div className="w-[160px] h-[160px] flex-shrink-0 flex items-center justify-center bg-white rounded-[6px] mx-auto md:mx-0 overflow-hidden">
                <img src={product.image} alt={product.title} className="w-full h-full object-contain p-2" />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col pt-2">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[#1C1C1C] text-[16px] font-medium max-w-[80%]">{product.title}</h3>
                    <button 
                        onClick={() => toggleWishlist(product)}
                        className={`w-[40px] h-[40px] rounded-[6px] border ${isFavorited ? 'border-red-500 bg-red-50' : 'border-[#DEE2E7] hover:bg-blue-50'} flex items-center justify-center transition-colors group`}
                    >
                        <span className={`material-icons${isFavorited ? '' : '-outlined'} text-[20px] ${isFavorited ? 'text-red-500' : 'text-[#0D6EFD]'}`}>
                            {isFavorited ? 'favorite' : 'favorite_border'}
                        </span>
                    </button>
                </div>

                <div className="flex items-baseline space-x-2 mb-3">
                    <span className="text-[#1C1C1C] text-[20px] font-semibold">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                        <span className="text-[#8B96A5] text-[16px] line-through">{formatPrice(product.oldPrice)}</span>
                    )}
                </div>

                <div className="flex flex-wrap items-center text-[14px] text-[#505050] mb-4 gap-y-2">
                    {/* Stars */}
                    <div className="flex items-center text-[#FF9017] mr-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={`material-icons text-[18px] ${i < Math.floor(product.rating) ? '' : 'text-[#D5DDE5] material-icons-outlined'}`}>
                                {i < Math.floor(product.rating) ? 'star' : 'star_border'}
                            </span>
                        ))}
                        <span className="text-[#FF9017] font-medium ml-1.5">{product.rating}</span>
                    </div>

                    <span className="text-[#DEE2E7] mx-2 hidden sm:inline">•</span>
                    <span className="mr-3">{product.orders} orders</span>

                    <span className="text-[#DEE2E7] mx-2 hidden sm:inline">•</span>
                    <span className="text-[#00B517] font-medium mr-3">{product.shipping}</span>
                </div>

                <p className="text-[#505050] text-[16px] leading-[24px] tracking-tight max-w-[650px]">
                    {product.description}
                </p>

                <div className="mt-auto pt-4">
                    <span className="text-[#0D6EFD] font-medium text-[16px] cursor-pointer hover:underline">View details</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
