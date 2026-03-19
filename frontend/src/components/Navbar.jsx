import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { allCategories } from '../data/products';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('All category');
    const { cartCount } = useCart();
    const { wishlist } = useWishlist();
    const { currency, setCurrency } = useCurrency();
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    // Dropdown States
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [settings, setSettings] = useState({
        language: 'English',
        country: 'PK',
        flag: 'https://flagcdn.com/w20/pk.png'
    });

    const toggleDropdown = (name) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, ...value }));
        if (key === 'currency') {
            setCurrency(value.currency);
        }
        setActiveDropdown(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery.trim()) {
            params.append('search', searchQuery.trim());
        }
        if (searchCategory !== 'All category') {
            params.append('category', searchCategory);
        }

        navigate(`/products?${params.toString()}`);
    };

    return (
        <header className="bg-white border-b border-border w-full relative">
            {/* Top Tier */}
            <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 -ml-2 text-dark"
                    >
                        <span className="material-icons text-2xl">{isMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="Brand Logo" className="h-8 sm:h-10 w-auto object-contain" />
                    </Link>
                </div>

                {/* Search Bar (Desktop) */}
                <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-2xl border-2 border-primary rounded-lg overflow-hidden h-11">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-2 outline-none text-dark"
                    />
                    <div className="relative border-l border-border flex items-center bg-[#F7FAFC]">
                        <select
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                            className="pl-4 pr-10 py-2 bg-transparent text-dark outline-none cursor-pointer appearance-none"
                        >
                            <option value="All category">All category</option>
                            {allCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <span className="material-icons absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-text">expand_more</span>
                    </div>
                    <button type="submit" className="bg-primary text-white px-8 h-full font-semibold hover:bg-blue-700 transition-colors">
                        Search
                    </button>
                </form>

                {/* Icons (Desktop) */}
                <div className="hidden sm:flex items-center space-x-6 text-gray-text">
                    <Link to="/messages" className="flex flex-col items-center cursor-pointer hover:text-primary transition-colors">
                        <span className="material-icons text-2xl">message</span>
                        <span className="text-xs mt-1">Message</span>
                    </Link>
                    <Link to="/wishlist" className="flex flex-col items-center cursor-pointer hover:text-primary transition-colors relative">
                        <span className={`material-icons ${wishlist.length > 0 ? 'text-red-500' : ''}`}>
                            {wishlist.length > 0 ? 'favorite' : 'favorite_border'}
                        </span>
                        {wishlist.length > 0 && (
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                                {wishlist.length}
                            </span>
                        )}
                        <span className="text-xs mt-1">Favorites</span>
                    </Link>
                    {user ? (
                        <div className="flex flex-col items-center cursor-pointer hover:text-primary transition-colors group relative">
                             <span className="material-icons text-2xl">person</span>
                             <span className="text-xs mt-1 max-w-[60px] truncate">{user?.name?.split(' ')[0] || 'User'}</span>
                             <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-[#DEE2E7] rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                                 <div className="px-4 py-2 border-b border-[#F1F3F5] mb-1">
                                     <p className="text-sm font-bold text-[#1C1C1C] truncate">{user?.name || 'User'}</p>
                                     <p className="text-xs text-[#8B96A5] truncate">{user?.email || ''}</p>
                                 </div>
                                <Link to="/profile" className="block px-4 py-2 text-sm text-[#1C1C1C] hover:bg-[#F7FAFC]">Profile</Link>
                                <Link to="/wishlist" className="block px-4 py-2 text-sm text-[#1C1C1C] hover:bg-[#F7FAFC]">My Wishlist</Link>
                                <Link to="/orders" className="block px-4 py-2 text-sm text-[#1C1C1C] hover:bg-[#F7FAFC]">My Orders</Link>
                                {isAdmin && <Link to="/admin" className="block px-4 py-2 text-sm text-primary font-bold hover:bg-[#F7FAFC]">Admin Panel</Link>}
                                <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Log Out</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="flex flex-col items-center cursor-pointer hover:text-primary transition-colors">
                            <span className="material-icons text-2xl">person</span>
                            <span className="text-xs mt-1">Sign in</span>
                        </Link>
                    )}
                    <Link to="/cart" className="flex flex-col items-center cursor-pointer hover:text-primary transition-colors relative">
                        <span className="material-icons text-2xl">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                                {cartCount}
                            </span>
                        )}
                        <span className="text-xs mt-1">My cart</span>
                    </Link>
                </div>

                {/* Icons (Mobile) */}
                <div className="sm:hidden flex items-center space-x-4 text-dark">
                    <Link to="/cart" className="p-2 relative">
                        <span className="material-icons text-2xl">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 bg-primary text-white text-[9px] font-bold px-1 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/profile" className="p-2">
                        <span className="material-icons text-2xl">person</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Search Tier */}
            <div className="lg:hidden px-4 pb-4">
                <form onSubmit={handleSearch} className="flex items-center w-full bg-[#F7FAFC] border border-[#DEE2E7] rounded-lg px-3 py-2 cursor-pointer focus-within:border-[#0D6EFD]">
                    <span className="material-icons text-[#8B96A5] mr-2">search</span>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none flex-1 text-sm text-dark h-full w-full"
                    />
                </form>
            </div>

            {/* Mobile Sidebar Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)}></div>
                    <div className="absolute top-0 left-0 bottom-0 w-[280px] bg-white shadow-xl flex flex-col">
                        <div className="p-5 border-b border-border bg-[#F7FAFC]">
                            {user ? (
                                <>
                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-3">
                                        <span className="text-xl font-bold">{user?.name?.charAt(0) || 'U'}</span>
                                    </div>
                                    <p className="text-[18px] font-bold text-[#1C1C1C]">{user?.name || 'User'}</p>
                                    <button onClick={logout} className="text-sm text-red-600 font-medium mt-1">Log Out</button>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-[#DEE2E7] rounded-full flex items-center justify-center text-white mb-3">
                                        <span className="material-icons text-3xl">person</span>
                                    </div>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-[16px] text-[#1C1C1C] hover:underline">
                                        Sign in <span className="text-[#8B96A5]">|</span> Register
                                    </Link>
                                </>
                            )}
                        </div>
                        <nav className="flex-1 overflow-y-auto py-4">
                            <div className="px-5 space-y-4">
                                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-dark hover:text-primary">
                                    <span className="material-icons">home</span> Home
                                </Link>
                                <Link to="/products" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-dark hover:text-primary">
                                    <span className="material-icons">list</span> Categories
                                </Link>
                                <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-dark hover:text-primary relative">
                                    <span className={`material-icons ${wishlist.length > 0 ? 'text-red-500' : ''}`}>
                                        {wishlist.length > 0 ? 'favorite' : 'favorite_border'}
                                    </span> 
                                    Wishlist
                                    {wishlist.length > 0 && (
                                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-auto">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </Link>
                                <div className="flex items-center gap-4 text-dark hover:text-primary cursor-pointer">
                                    <span className="material-icons">inventory_2</span> My orders
                                </div>
                                <div className="border-t border-border pt-4 mt-4 space-y-4">
                                    <div className="flex items-center gap-4 text-dark"><span className="material-icons">language</span> {settings.language} | {currency}</div>
                                    <div className="flex items-center gap-4 text-dark"><span className="material-icons">headset_mic</span> Contact us</div>
                                    <div className="flex items-center gap-4 text-dark"><span className="material-icons">business</span> About</div>
                                </div>
                                <div className="border-t border-border pt-4 mt-4 space-y-4 flex flex-col">
                                    <a href="#" className="text-dark hover:text-primary text-[16px]">User agreement</a>
                                    <a href="#" className="text-dark hover:text-primary text-[16px]">Privacy policy</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            )}

            {/* Bottom Tier (Desktop Only) */}
            <div className="border-t border-border hidden lg:block">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between font-medium">
                    <nav className="flex items-center space-x-8 text-dark">
                        <Link to="/" className="hover:text-primary transition-colors text-sm font-semibold">Home</Link>
                        <Link to="/products" className="flex items-center cursor-pointer hover:text-primary transition-colors">
                            <span className="material-icons text-xl mr-2">menu</span>
                            <span>All category</span>
                        </Link>
                        <Link to="/hot-offers" className="hover:text-primary transition-colors text-sm">Hot offers</Link>
                        <Link to="/best-sellers" className="hover:text-primary transition-colors text-sm font-semibold text-secondary">Best Sellers</Link>
                        <Link to="/new-arrivals" className="hover:text-primary transition-colors text-sm">New Arrivals</Link>

                        <div className="relative">
                            <div className="hover:text-primary transition-colors text-sm flex items-center cursor-pointer" onClick={() => toggleDropdown('help')}>
                                Help
                                <span className={`material-icons text-lg ml-1 text-gray-text transition-transform ${activeDropdown === 'help' ? 'rotate-180' : ''}`}>expand_more</span>
                            </div>

                            {activeDropdown === 'help' && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-50 py-2">
                                    <div className="px-4 py-2 font-semibold text-xs text-gray-text uppercase tracking-wide">Customer Support</div>
                                    <Link to="/faq" className="block px-4 py-2 text-sm hover:bg-light transition-colors text-dark" onClick={() => setActiveDropdown(null)}>FAQ</Link>
                                    <Link to="/shipping" className="block px-4 py-2 text-sm hover:bg-light transition-colors text-dark" onClick={() => setActiveDropdown(null)}>Shipping & Returns</Link>
                                    <Link to="/contact" className="block px-4 py-2 text-sm hover:bg-light transition-colors text-dark" onClick={() => setActiveDropdown(null)}>Contact Us</Link>
                                </div>
                            )}
                        </div>
                    </nav>
                    <div className="flex items-center space-x-8 text-dark text-sm relative">
                        {/* Language & Currency Dropdown */}
                        <div className="relative">
                            <div className="flex items-center text-gray-text">
                                <span>{settings.language}, {currency}</span>
                            </div>
                        </div>

                        {/* Shipping Dropdown */}
                        <div className="relative">
                            <div className="flex items-center cursor-pointer hover:text-primary transition-colors" onClick={() => toggleDropdown('ship')}>
                                <span>Ship to</span>
                                <img src={settings.flag} alt={settings.country} className="ml-2 w-5 h-4 object-cover" />
                                <span className={`material-icons text-lg ml-1 text-gray-text transition-transform ${activeDropdown === 'ship' ? 'rotate-180' : ''}`}>expand_more</span>
                            </div>

                            {activeDropdown === 'ship' && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-50 py-2">
                                    <button onClick={() => updateSetting('country', { country: 'PK', flag: 'https://flagcdn.com/w20/pk.png' })} className="w-full text-left px-4 py-2 text-sm hover:bg-light transition-colors text-dark flex items-center gap-2">
                                        <img src="https://flagcdn.com/w20/pk.png" alt="PK" className="w-5 h-4 object-cover" /> Pakistan
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
