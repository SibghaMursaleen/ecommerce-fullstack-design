import React from 'react';
import { Link } from 'react-router-dom';

const Messages = () => {
    return (
        <div className="bg-[#F7FAFC] min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-[16px] text-[#8B96A5] mb-6 space-x-2">
                    <Link to="/" className="cursor-pointer hover:text-[#1C1C1C] transition-colors">Home</Link>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8L14 12L10 16" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#1C1C1C]">Messages</span>
                </nav>

                <h1 className="text-3xl font-bold text-[#1C1C1C] mb-6">Messages</h1>

                <div className="bg-white border border-[#DEE2E7] rounded-lg p-16 flex flex-col items-center justify-center text-center">
                    <span className="material-icons text-[#8B96A5] text-6xl mb-4">chat_bubble_outline</span>
                    <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2">No active messages</h3>
                    <p className="text-[#8B96A5] mb-6 max-w-md">You don't have any messages from sellers right now. When you contact a supplier, your conversation will appear here.</p>
                    <Link to="/products" className="bg-[#0D6EFD] text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors">
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Messages;
