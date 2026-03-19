import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import HotOffers from './pages/HotOffers';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import ContactUs from './pages/ContactUs';
import NewArrivals from './pages/NewArrivals';
import BestSellers from './pages/BestSellers';
import AdminDashboard from './pages/AdminDashboard';
import AccountSettings from './pages/AccountSettings';
import SecuritySettings from './pages/SecuritySettings';
import Wishlist from './pages/Wishlist';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import Preloader from './components/Preloader';
import InfoPage from './pages/InfoPage';

import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AuthProvider>
            <CurrencyProvider>
                <CartProvider>
                    <WishlistProvider>
                        {isLoading && <Preloader />}
                        <Router>
                            <div className={`min-h-screen bg-gray-bg font-sans flex flex-col transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                                <Navbar />

                                {/* Main Content Area */}
                                <div className="flex-1">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/products" element={<ProductListing />} />
                                        <Route path="/product/:id" element={<ProductDetails />} />
                                        <Route path="/hot-offers" element={<HotOffers />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/wishlist" element={<Wishlist />} />
                                        <Route path="/checkout" element={<Checkout />} />
                                        
                                        {/* Protected User Routes */}
                                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                                        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                                        <Route path="/settings" element={<PrivateRoute><AccountSettings /></PrivateRoute>} />
                                        <Route path="/security" element={<PrivateRoute><SecuritySettings /></PrivateRoute>} />
                                        
                                        <Route path="/messages" element={<Messages />} />
                                        <Route path="/faq" element={<FAQ />} />
                                        <Route path="/shipping" element={<Shipping />} />
                                        <Route path="/contact" element={<ContactUs />} />
                                        <Route path="/best-sellers" element={<BestSellers />} />
                                        <Route path="/new-arrivals" element={<NewArrivals />} />
                                        
                                        {/* Informational Pages */}
                                        <Route path="/about" element={<InfoPage title="About Us" icon="info" />} />
                                        <Route path="/find-store" element={<InfoPage title="Find Store" icon="store" />} />
                                        <Route path="/blogs" element={<InfoPage title="Our Blogs" icon="article" />} />
                                        <Route path="/refund" element={<InfoPage title="Refund Policy" icon="payments" />} />
                                        
                                        <Route path="/login" element={<Login />} />
                                        <Route path="/signup" element={<Signup />} />
                                        <Route 
                                            path="/admin" 
                                            element={
                                                <AdminRoute>
                                                    <AdminDashboard />
                                                </AdminRoute>
                                            } 
                                        />
                                    </Routes>
                                </div>

                                <Footer />
                            </div>
                        </Router>
                    </WishlistProvider>
                </CartProvider>
            </CurrencyProvider>
        </AuthProvider>
    );
}

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const { user, loading, isAdmin } = useAuth();
    
    if (loading) return null;
    
    if (!user || !isAdmin) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

export default App;
