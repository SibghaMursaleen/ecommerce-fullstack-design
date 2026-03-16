import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div className="bg-[#F7FAFC] min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-[16px] text-[#8B96A5] mb-6 space-x-2">
                    <Link to="/" className="cursor-pointer hover:text-[#1C1C1C] transition-colors">Home</Link>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8L14 12L10 16" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#1C1C1C]">Profile</span>
                </nav>

                <h1 className="text-3xl font-bold text-[#1C1C1C] mb-6">My Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 bg-white border border-[#DEE2E7] rounded-lg p-6">
                        <div className="flex flex-col items-center mb-6 text-center">
                            <div className="w-24 h-24 bg-[#DEE2E7] text-white rounded-full flex items-center justify-center mb-4">
                                <span className="material-icons text-5xl">person</span>
                            </div>
                            <h2 className="text-xl font-semibold text-[#1C1C1C]">Guest User</h2>
                            <p className="text-[#8B96A5] text-sm">guest@example.com</p>
                        </div>
                        <ul className="space-y-2 border-t border-[#DEE2E7] pt-4">
                            <li><Link to="/profile" className="flex items-center text-[#1C1C1C] hover:text-[#0D6EFD] py-2"><span className="material-icons mr-3">manage_accounts</span> Account Settings</Link></li>
                            <li><Link to="/orders" className="flex items-center text-[#1C1C1C] hover:text-[#0D6EFD] py-2"><span className="material-icons mr-3">local_shipping</span> My Orders</Link></li>
                            <li><Link to="/messages" className="flex items-center text-[#1C1C1C] hover:text-[#0D6EFD] py-2"><span className="material-icons mr-3">chat</span> Messages</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 bg-white border border-[#DEE2E7] rounded-lg p-6 flex flex-col items-center justify-center text-center">
                        <span className="material-icons-outlined text-[#8B96A5] text-5xl mb-4">lock</span>
                        <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2">Sign in to customize your profile</h3>
                        <p className="text-[#8B96A5] mb-6 max-w-sm">Save your shipping addresses, manage payment methods, and get a tailored shopping experience.</p>
                        <div className="flex gap-4">
                            <button className="bg-[#0D6EFD] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                                Sign In
                            </button>
                            <button className="bg-white border border-[#DEE2E7] text-[#0D6EFD] px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors shadow-sm">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
