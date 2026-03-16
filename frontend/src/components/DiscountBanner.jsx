import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const DiscountBanner = () => {
    const { formatPrice } = useCurrency();
    
    return (
        <div className="w-full bg-[#0D6EFD] rounded-[6px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between relative overflow-hidden mb-6">
            {/* Diagonal Accent */}
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
    );
};

export default DiscountBanner;
