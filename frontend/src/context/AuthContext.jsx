import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../services/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post('/auth/register', { name, email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    const updateProfile = async (profileData) => {
        try {
            const { data } = await axios.put('/auth/profile', profileData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Profile update failed' 
            };
        }
    };

    const updatePassword = async (passwordData) => {
        try {
            const { data } = await axios.put('/auth/password', passwordData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Password update failed' 
            };
        }
    };

    const isAdmin = user && user.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, updatePassword, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
