import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import BestSellers from './pages/BestSellers';
import NewArrivals from './pages/NewArrivals';
import Preloader from './components/Preloader';
import { useState, useEffect } from 'react';

import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <CurrencyProvider>
            <CartProvider>
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
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/messages" element={<Messages />} />
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/faq" element={<FAQ />} />
                                <Route path="/shipping" element={<Shipping />} />
                                <Route path="/contact" element={<ContactUs />} />
                                <Route path="/best-sellers" element={<BestSellers />} />
                                <Route path="/new-arrivals" element={<NewArrivals />} />
                                {/* Placeholder routes for upcoming pages */}
                                {/* <Route path="/cart" element={<Cart />} /> */}
                            </Routes>
                        </div>

                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </CurrencyProvider>
    );
}

export default App;
