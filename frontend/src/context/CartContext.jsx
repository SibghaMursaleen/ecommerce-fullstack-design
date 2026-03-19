import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from '../services/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });
    const { user } = useAuth();

    const fetchOrders = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true);
            const response = await axios.get('/orders/myorders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        } else {
            setOrders([]);
        }
    }, [user, fetchOrders]);

    const showNotification = useCallback((message) => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast({ show: false, message: '' });
        }, 3000);
    }, []);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prevItems, { ...product, qty: 1 }];
        });
        showNotification(`${product.title || product.name || 'Item'} added to cart!`);
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const clearCart = () => setCartItems([]);

    const addOrder = async (orderData) => {
        try {
            const response = await axios.post('/orders', orderData);
            setOrders(prevOrders => [response.data, ...prevOrders]);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    const cartCount = (Array.isArray(cartItems) ? cartItems : []).reduce((acc, item) => acc + (item?.qty || 0), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, orders, addOrder }}>
            {children}
            {/* Toast Notification */}
            <div className={`fixed bottom-5 right-5 z-50 transform transition-all duration-300 ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                <div className="bg-[#00B517] text-white px-6 py-3 rounded-[6px] shadow-lg flex items-center gap-3">
                    <span className="material-icons text-[20px]">check_circle</span>
                    <p className="font-medium text-[15px] max-w-[300px] truncate">{toast.message}</p>
                </div>
            </div>
        </CartContext.Provider>
    );
};
