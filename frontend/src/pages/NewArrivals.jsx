import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email.');
            return;
        }

        setIsSubmitting(true);
        // Simulate notification signup
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setEmail('');
        }, 1200);
    };

    return (
        <div className="bg-gray-bg min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-3xl w-full bg-white rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[400px]">
                
                {/* Left Side: Visual/Accent Section */}
                <div className="md:w-1/3 bg-gradient-to-br from-primary to-blue-600 p-8 flex flex-col items-center justify-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm animate-pulse">
                        <span className="material-icons text-4xl">new_releases</span>
                    </div>
                    <h2 className="text-xl font-bold text-center">New Collection</h2>
                    <p className="text-white/80 text-xs mt-2 uppercase tracking-widest font-bold">Arriving Soon</p>
                </div>

                {/* Right Side: Content Section */}
                <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-white">
                    {isSuccess ? (
                        <div className="w-full text-center md:text-left animate-fade-in">
                            <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                                <span className="material-icons">notifications_active</span>
                            </div>
                            <h2 className="text-2xl font-bold text-dark mb-2">You're on the list!</h2>
                            <p className="text-gray-text mb-6">We'll send an update to your inbox as soon as the collection drops.</p>
                            <button 
                                onClick={() => setIsSuccess(false)}
                                className="text-primary font-bold hover:underline py-2"
                            >
                                Notify another email
                            </button>
                            <div className="mt-8 border-t border-border pt-6">
                                <Link to="/" className="text-gray-text hover:text-primary transition-colors text-xs font-semibold flex items-center gap-1 justify-center md:justify-start">
                                    <span className="material-icons text-sm">west</span>
                                    Return to Shop
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Limited Edition
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-4 leading-tight">
                                Fresh Styles <span className="text-primary">On The Way</span>
                            </h1>

                            <p className="text-gray-text text-sm md:text-base mb-8 max-w-md leading-relaxed">
                                Our style experts are currently curating the season's most exclusive arrivals. 
                                Subscribe below to be the first to know when we launch.
                            </p>

                            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-2 relative">
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address" 
                                    className={`flex-1 bg-gray-50 border ${error ? 'border-red-500' : 'border-border'} px-4 py-3 rounded-lg text-sm outline-none focus:border-primary transition-colors`}
                                    required
                                />
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 text-sm whitespace-nowrap flex items-center justify-center gap-2 min-w-[120px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Wait...
                                        </>
                                    ) : 'Notify Me'}
                                </button>
                                {error && <p className="absolute -bottom-5 left-1 text-[10px] text-red-500 font-medium">{error}</p>}
                            </form>

                            <Link 
                                to="/" 
                                className="mt-8 text-gray-text hover:text-primary transition-colors text-xs font-semibold flex items-center gap-1"
                            >
                                <span className="material-icons text-sm">west</span>
                                Return to Shop
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
            `}} />
        </div>
    );
};

export default NewArrivals;
