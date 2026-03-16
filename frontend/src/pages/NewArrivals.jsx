import React from 'react';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
    return (
        <div className="bg-gray-bg min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-3xl w-full bg-white rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col md:flex-row">
                
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

                    <div className="w-full flex flex-col sm:flex-row gap-2">
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            className="flex-1 bg-gray-50 border border-border px-4 py-3 rounded-lg text-sm outline-none focus:border-primary transition-colors"
                        />
                        <button className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 text-sm whitespace-nowrap">
                            Notify Me
                        </button>
                    </div>

                    <Link 
                        to="/" 
                        className="mt-8 text-gray-text hover:text-primary transition-colors text-xs font-semibold flex items-center gap-1"
                    >
                        <span className="material-icons text-sm">west</span>
                        Return to Shop
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
