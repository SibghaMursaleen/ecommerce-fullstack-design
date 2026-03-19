import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import banner from '../assets/hero-banner.jpg';
import { allCategories } from '../data/products';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <section className="bg-white border border-border rounded-lg mt-5 overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[auto] lg:min-h-[400px]">
                {/* Left Sidebar (Desktop Only) */}
                <div className="lg:w-[240px] p-4 hidden lg:block border-r border-border shrink-0">
                    <ul className="space-y-1">
                        {allCategories.map((cat, index) => (
                            <li key={index}>
                                <Link
                                    to={`/products?category=${encodeURIComponent(cat)}`}
                                    className="block px-3 py-2 rounded-md transition-colors text-sm text-dark font-medium hover:bg-[#E5F1FF] hover:font-semibold"
                                >
                                    {cat}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                to="/products"
                                className="block px-3 py-2 rounded-md transition-colors text-sm text-[#0D6EFD] font-medium hover:bg-[#E5F1FF]"
                            >
                                All Categories
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Center Banner */}
                <div className="flex-1 relative bg-[#95D1CC] overflow-hidden flex items-center min-h-[220px] sm:min-h-[300px] lg:min-h-[400px]">
                    <img
                        src={banner}
                        alt="Summer Sale Banner"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative z-10 p-6 sm:p-10 space-y-1 sm:space-y-2 max-w-sm">
                        <h3 className="text-[20px] sm:text-[28px] text-dark font-normal tracking-tight">Latest trending</h3>
                        <h1 className="text-3xl sm:text-5xl lg:text-4xl font-bold text-dark leading-tight">
                            Electronic items
                        </h1>
                        <div className="pt-3 sm:pt-4">
                            <Link to="/products" className="bg-white text-dark font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm inline-block">
                                Learn more
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar Cards (Hidden on mobile/tablet) */}
                <div className="hidden xl:flex lg:w-1/4 p-4 flex-col space-y-4 bg-white border-l border-border">
                    {/* User Welcome Card */}
                    <div className="bg-[#E3F0FF] p-4 rounded-lg shadow-sm">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#8B96A5] shadow-sm">
                                <span className="material-icons text-3xl">account_circle</span>
                            </div>
                            <div>
                                <p className="text-dark leading-snug text-sm font-bold">Hi, {user ? user.name.split(' ')[0] : 'user'}</p>
                                <p className="font-normal text-xs text-gray-text">{user ? 'Ready to shop?' : 'let\'s get started'}</p>
                            </div>
                        </div>
                        {!user ? (
                            <>
                                <Link to="/signup" className="block w-full text-center bg-primary text-white py-2 rounded-lg font-bold mb-2 hover:bg-blue-700 transition-all text-sm active:scale-95 shadow-sm">
                                    Join now
                                </Link>
                                <Link to="/login" className="block w-full text-center bg-white text-primary py-2 rounded-lg font-bold border border-[#DEE2E7] hover:bg-gray-50 transition-all text-sm shadow-sm active:scale-95">
                                    Log in
                                </Link>
                            </>
                        ) : (
                            <>
                                {isAdmin ? (
                                    <Link to="/admin" className="block w-full text-center bg-primary text-white py-2 rounded-lg font-bold mb-2 hover:bg-blue-700 transition-all text-sm active:scale-95 shadow-sm">
                                        Admin Panel
                                    </Link>
                                ) : (
                                    <Link to="/cart" className="block w-full text-center bg-primary text-white py-2 rounded-lg font-bold mb-2 hover:bg-blue-700 transition-all text-sm active:scale-95 shadow-sm">
                                        View Cart
                                    </Link>
                                )}
                                <button 
                                    onClick={() => { logout(); navigate('/'); }}
                                    className="w-full bg-white text-red-500 py-2 rounded-lg font-bold border border-[#DEE2E7] hover:bg-red-50 hover:border-red-200 transition-all text-sm shadow-sm active:scale-95"
                                >
                                    Log out
                                </button>
                            </>
                        )}
                    </div>

                    {/* Promo Card 1 */}
                    <div className="bg-orange p-4 rounded-lg text-white flex-1 flex flex-col justify-center">
                        <p className="text-sm font-bold leading-relaxed">
                            Get PKR 1000 off <br /> <span className="font-normal opacity-90 text-xs">with a new supplier</span>
                        </p>
                    </div>

                    {/* Promo Card 2 */}
                    <div className="bg-teal p-4 rounded-lg text-white flex-1 flex flex-col justify-center">
                        <p className="text-sm font-bold leading-relaxed">
                            Send quotes with <br /> <span className="font-normal opacity-90 text-xs">supplier preferences</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
