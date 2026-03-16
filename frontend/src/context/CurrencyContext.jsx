import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        const saved = localStorage.getItem('currency');
        return saved || 'PKR';
    });

    // Conversion rates (Base: USD)
    const rates = {
        USD: 1,
        PKR: 280, // Approximate conversion rate
    };

    const symbols = {
        PKR: 'Rs.',
    };

    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);

    const convertPrice = (usdPrice) => {
        if (!usdPrice && usdPrice !== 0) return 0;
        return usdPrice * (rates[currency] || 1);
    };

    const formatPrice = (usdPrice) => {
        const converted = convertPrice(usdPrice);
        const symbol = symbols[currency] || 'Rs.';
        
        return `${symbol} ${Math.round(converted).toLocaleString()}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice, symbols }}>
            {children}
        </CurrencyContext.Provider>
    );
};
