import React from 'react';

const NewsletterSection = () => {
    return (
        <section className="bg-[#EFF2F4] py-10 w-full flex flex-col items-center justify-center text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-[20px] font-semibold text-[#1C1C1C] mb-2">Subscribe on our newsletter</h2>
                <p className="text-[#606060] text-[16px] mb-6">
                    Get daily news on upcoming offers from many suppliers all over the world
                </p>
                <form className="flex item-center max-w-[460px] mx-auto space-x-2">
                    <div className="relative flex-1">
                        <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8B96A5]">email</span>
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-white w-full pl-10 pr-4 py-[10px] border border-[#DEE2E7] rounded-[6px] focus:outline-none focus:ring-1 focus:ring-primary/30 text-[#1C1C1C]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#0D6EFD] hover:bg-blue-600 text-white font-medium px-6 py-[10px] rounded-[6px] transition-colors shadow-sm"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSection;
