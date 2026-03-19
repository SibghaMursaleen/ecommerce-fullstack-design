import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserDashboardLayout from './UserDashboardLayout';

const Profile = () => {
    const { user, isAdmin } = useAuth();

    if (!user) return null; // Handled by Layout

    return (
        <UserDashboardLayout>
            <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-primary to-blue-700 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Hello, {user?.name?.split(' ')[0] || 'User'}!</h2>
                        <p className="text-white/80 max-w-md">Welcome to your dashboard. Here you can track your recent orders and manage your account information.</p>
                        <div className="mt-6 flex gap-3">
                            <Link to="/orders" className="bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-gray-50 transition-all">
                                View My Orders
                            </Link>
                            <Link to="/products" className="bg-primary-dark/20 text-white border border-white/30 px-4 py-2 rounded-lg font-bold text-sm hover:bg-white/10 transition-all">
                                Shop More
                            </Link>
                        </div>
                    </div>
                    {/* Abstract Decorative Circles */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute right-20 -bottom-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Account Stats */}
                    <div className="bg-white border border-[#DEE2E7] rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-[#1C1C1C] mb-6 flex items-center gap-2">
                            <span className="material-icons text-primary">analytics</span>
                            Account Overview
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#F7FAFC] p-4 rounded-lg">
                                <p className="text-xs text-[#8B96A5] uppercase font-bold tracking-wider mb-1">Status</p>
                                <p className="text-green-600 font-bold flex items-center text-sm">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Active
                                </p>
                            </div>
                            <div className="bg-[#F7FAFC] p-4 rounded-lg">
                                <p className="text-xs text-[#8B96A5] uppercase font-bold tracking-wider mb-1">Role</p>
                                <p className={`font-bold text-sm ${isAdmin ? 'text-orange' : 'text-primary'}`}>{isAdmin ? 'Admin' : 'Shopper'}</p>
                            </div>
                            <div className="bg-[#F7FAFC] p-4 rounded-lg md:col-span-2">
                                <p className="text-xs text-[#8B96A5] uppercase font-bold tracking-wider mb-1">Email Verified</p>
                                <div className="flex items-center gap-2 text-[#1C1C1C] font-semibold text-sm">
                                    <span className="material-icons text-green-500 text-base">verified</span>
                                    Yes
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Settings */}
                    <div className="bg-white border border-[#DEE2E7] rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-[#1C1C1C] mb-6 flex items-center gap-2">
                            <span className="material-icons text-primary">settings</span>
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <Link to="/settings" className="flex items-center justify-between p-3 rounded-lg border border-[#F1F3F5] hover:bg-[#F7FAFC] transition-all group">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons text-[#8B96A5] group-hover:text-primary transition-colors">edit</span>
                                    <span className="text-sm font-medium">Edit Personal Info</span>
                                </div>
                                <span className="material-icons text-sm text-[#DEE2E7]">chevron_right</span>
                            </Link>
                            <Link to="/security" className="flex items-center justify-between p-3 rounded-lg border border-[#F1F3F5] hover:bg-[#F7FAFC] transition-all group">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons text-[#8B96A5] group-hover:text-primary transition-colors">lock</span>
                                    <span className="text-sm font-medium">Change Password</span>
                                </div>
                                <span className="material-icons text-sm text-[#DEE2E7]">chevron_right</span>
                            </Link>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-[#F1F3F5] hover:bg-[#F7FAFC] transition-all group">
                                <div className="flex items-center gap-3">
                                    <span className="material-icons text-[#8B96A5] group-hover:text-primary transition-colors">notifications</span>
                                    <span className="text-sm font-medium">Notifications</span>
                                </div>
                                <span className="material-icons text-sm text-[#DEE2E7]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white border border-[#DEE2E7] rounded-xl p-8 shadow-sm">
                    <h3 className="text-[18px] font-bold text-[#1C1C1C] mb-6">Recent Activity Highlights</h3>
                    <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-[#F1F3F5] rounded-xl">
                        <div className="w-16 h-16 bg-[#F7FAFC] rounded-full flex items-center justify-center mb-4">
                            <span className="material-icons text-[#DEE2E7] text-4xl">timeline</span>
                        </div>
                        <p className="text-[#8B96A5] font-medium">No recent profile activity to show.</p>
                        <p className="text-xs text-[#8B96A5] mt-1 text-center max-w-xs">Once you start ordering or updating your profile, highlights will appear here.</p>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
};

export default Profile;
