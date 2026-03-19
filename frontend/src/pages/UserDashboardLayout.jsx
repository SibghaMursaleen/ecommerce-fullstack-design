import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserDashboardLayout = ({ children }) => {
    const { user, isAdmin, logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { name: 'Overview', icon: 'dashboard', path: '/profile' },
        { name: 'My Orders', icon: 'local_shipping', path: '/orders' },
        { name: 'Account Settings', icon: 'manage_accounts', path: '/settings' },
        { name: 'Security', icon: 'security', path: '/security' },
    ];

    if (!user) {
        return (
            <div className="bg-[#F7FAFC] min-h-screen py-20 flex items-center justify-center">
                <div className="bg-white border border-[#DEE2E7] rounded-xl p-10 text-center shadow-lg max-w-md w-full">
                    <span className="material-icons text-6xl text-[#8B96A5] mb-4">lock</span>
                    <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">Account Required</h2>
                    <p className="text-[#8B96A5] mb-8">Please sign in to access your dashboard, track orders, and manage your account settings.</p>
                    <div className="flex flex-col gap-3">
                        <Link to="/login" className="block w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md">
                            Sign In
                        </Link>
                        <Link to="/signup" className="block w-full bg-white border border-[#DEE2E7] text-[#1C1C1C] py-3 rounded-lg font-bold hover:bg-gray-50 transition-all">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F7FAFC] min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1C1C1C]">User Account</h1>
                    <nav className="flex items-center text-sm text-[#8B96A5] mt-2 space-x-2">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-icons text-sm">chevron_right</span>
                        <span className="text-[#1C1C1C]">Account Dashboard</span>
                    </nav>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white border border-[#DEE2E7] rounded-xl overflow-hidden shadow-sm sticky top-6">
                            {/* User Profile Summary */}
                            <div className="p-6 bg-[#F7FAFC] border-b border-[#DEE2E7] flex flex-col items-center">
                                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-3 text-2xl font-bold shadow-inner">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <h3 className="font-bold text-[#1C1C1C] truncate w-full text-center">{user?.name || 'User'}</h3>
                                <p className="text-xs text-[#8B96A5] truncate w-full text-center">{user?.email || 'No email'}</p>
                                {isAdmin && (
                                    <span className="mt-2 px-2 py-0.5 bg-orange/10 text-orange font-bold text-[10px] uppercase rounded">
                                        Admin
                                    </span>
                                )}
                            </div>

                            {/* Navigation Menu */}
                            <nav className="p-4 space-y-1">
                                {menuItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                                                isActive 
                                                ? 'bg-blue-50 text-primary border border-blue-100 shadow-sm' 
                                                : 'text-[#505050] hover:bg-[#F7FAFC] hover:text-primary'
                                            }`}
                                        >
                                            <span className={`material-icons text-xl ${isActive ? 'text-primary' : 'text-[#8B96A5]'}`}>
                                                {item.icon}
                                            </span>
                                            {item.name}
                                        </Link>
                                    );
                                })}

                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange hover:bg-orange/5 font-bold mt-4 border-t border-[#F1F3F5] pt-5"
                                    >
                                        <span className="material-icons text-xl">admin_panel_settings</span>
                                        Admin Panel
                                    </Link>
                                )}

                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-all"
                                >
                                    <span className="material-icons text-xl">logout</span>
                                    Log Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:w-3/4">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardLayout;
