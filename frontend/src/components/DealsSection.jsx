import React from 'react';
import watch from '../assets/Smart_Watches.png';
import laptop from '../assets/Laptops.png';
import gopro from '../assets/Gopro_Cameras.png';
import headphones from '../assets/Headphones.png';
import canonCamera from '../assets/Gopro_Cameras.png';

const DealsSection = () => {
    const deals = [
        { name: "Smart watches", discount: "-25%", image: watch },
        { name: "Laptops", discount: "-15%", image: laptop },
        { name: "GoPro cameras", discount: "-40%", image: gopro },
        { name: "Headphones", discount: "-25%", image: headphones },
    ];

    const timerItems = [
        { label: "Days", value: "04" },
        { label: "Hour", value: "13" },
        { label: "Min", value: "34" },
        { label: "Sec", value: "56" },
    ];

    return (
        <section className="bg-white border border-border rounded-lg mt-5 overflow-hidden flex flex-col md:flex-row">
            {/* Left Info / Timer */}
            <div className="w-full md:w-[280px] p-5 border-b md:border-b-0 md:border-r border-border flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4">
                <div>
                    <h2 className="text-xl font-bold text-dark">Deals and offers</h2>
                    <p className="text-gray-text text-sm mb-0 md:mb-4">Consumer electronics</p>
                </div>

                <div className="flex space-x-1.5 shrink-0">
                    {timerItems.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center bg-[#E3E8EE] sm:bg-[#606060] text-dark sm:text-white w-10 h-11 sm:w-11 sm:h-12 rounded">
                            <span className="text-sm sm:text-base font-bold leading-none">{item.value}</span>
                            <span className="text-[9px] sm:text-[10px] opacity-80">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-4">
                {deals.map((deal, idx) => (
                    <div
                        key={idx}
                        className={`p-5 flex flex-col items-center justify-center text-center border-b border-r border-border hover:bg-gray-50 transition-colors cursor-pointer last:border-r-0 ${idx >= 3 ? "sm:border-b-0" : ""
                            } md:border-b-0`}
                    >
                        <div className={`h-32 w-full flex items-center justify-center mb-4 ${deal.name === "GoPro cameras" ? "scale-110" : ""}`}>
                            <img src={deal.image} alt={deal.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <p className="text-base text-dark mb-2">{deal.name}</p>
                        <span className="bg-[#FFE3E3] text-[#EB001B] text-sm font-bold px-4 py-1.5 rounded-full">
                            {deal.discount}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DealsSection;
