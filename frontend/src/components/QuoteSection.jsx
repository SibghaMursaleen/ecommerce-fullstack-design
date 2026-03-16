import React from 'react';
import quoteBg from '../assets/quote_image.png';

const QuoteSection = () => {
    return (
        <section className="relative rounded-lg overflow-hidden mt-5 min-h-[420px] flex flex-col md:flex-row items-start justify-between p-6 md:p-10">
            {/* Background with Precise Gradient Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${quoteBg})` }}
            >
                {/* Smooth blend: Solid blue on left, almost transparent on right to show the image clearly */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2C7CF1] via-[#2C7CF1]/60 to-transparent"></div>
            </div>

            {/* Left Content */}
            <div className="relative z-10 flex-1 text-white max-w-[440px] mb-8 md:mb-0 md:pr-10">
                <h2 className="text-[32px] font-bold leading-[38px] mb-4 tracking-[-0.2px]">
                    An easy way to send requests to all suppliers
                </h2>
                <p className="text-[16px] font-normal text-white leading-[24px] max-w-[390px]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                </p>
            </div>

            {/* Right Form Card */}
            <div className="relative z-10 bg-white p-6 md:p-6 rounded-md shadow-sm w-full max-w-[490px]">
                <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-5 tracking-tight">Send quote to suppliers</h3>

                <form className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="What item you need?"
                            className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2.5 placeholder:text-[#8B96A5] text-dark focus:outline-none focus:ring-1 focus:ring-primary/30"
                        />
                    </div>

                    <div>
                        <textarea
                            placeholder="Type more details"
                            className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2.5 placeholder:text-[#8B96A5] text-dark focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none h-[73px]"
                        ></textarea>
                    </div>

                    <div className="flex space-x-2">
                        <div className="w-[206px]">
                            <input
                                type="text"
                                placeholder="Quantity"
                                className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2.5 placeholder:text-[#8B96A5] text-dark focus:outline-none focus:ring-1 focus:ring-primary/30"
                            />
                        </div>
                        <div className="w-[111px]">
                            <div className="relative">
                                <select className="w-full appearance-none border border-[#DEE2E7] rounded-[6px] px-3 py-2.5 bg-white pr-9 focus:outline-none focus:ring-1 focus:ring-primary/30 text-dark">
                                    <option>Pcs</option>
                                    <option>Kg</option>
                                    <option>Unit</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#8B96A5]">
                                    <span className="material-icons-outlined text-[24px]">expand_more</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-1">
                        <button
                            type="button"
                            className="bg-[#0D6EFD] hover:bg-blue-600 text-white font-medium px-4 py-2.5 rounded-md transition-colors text-[16px] shadow-sm"
                        >
                            Send inquiry
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default QuoteSection;
