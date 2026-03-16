import React from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
    return (
        <div className="bg-[#F7FAFC] min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-[16px] text-[#8B96A5] mb-6 space-x-2">
                    <Link to="/" className="cursor-pointer hover:text-[#1C1C1C] transition-colors">Home</Link>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8L14 12L10 16" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#1C1C1C]">FAQ</span>
                </nav>

                <h1 className="text-3xl font-bold text-[#1C1C1C] mb-8">Frequently Asked Questions</h1>

                <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm space-y-6">
                    <div className="border-b border-[#DEE2E7] pb-6">
                        <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2 flex items-center">
                            <span className="material-icons text-[#0D6EFD] mr-2">help_outline</span>
                            How can I track my order?
                        </h3>
                        <p className="text-[#505050] leading-relaxed">
                            Once your order has been shipped, you will receive an email containing a tracking number and a link to track the delivery status on the carrier's website. You can also track your order from your <Link to="/orders" className="text-[#0D6EFD] hover:underline">Orders</Link> dashboard.
                        </p>
                    </div>

                    <div className="border-b border-[#DEE2E7] pb-6">
                        <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2 flex items-center">
                            <span className="material-icons text-[#0D6EFD] mr-2">help_outline</span>
                            Do you ship internationally?
                        </h3>
                        <p className="text-[#505050] leading-relaxed">
                            Yes! We offer global shipping. Shipping costs and delivery times will vary depending on your destination country. You can see the estimated shipping rates during checkout.
                        </p>
                    </div>

                    <div className="border-b border-[#DEE2E7] pb-6">
                        <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2 flex items-center">
                            <span className="material-icons text-[#0D6EFD] mr-2">help_outline</span>
                            What payment methods are accepted?
                        </h3>
                        <p className="text-[#505050] leading-relaxed">
                            We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Cash on Delivery (COD) for eligible regions.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2 flex items-center">
                            <span className="material-icons text-[#0D6EFD] mr-2">help_outline</span>
                            How do I contact customer support?
                        </h3>
                        <p className="text-[#505050] leading-relaxed">
                            You can reach out to our support team anytime through our <Link to="/messages" className="text-[#0D6EFD] hover:underline">Contact Us / Messages</Link> page. We aim to respond to all inquiries within 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
