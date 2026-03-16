import React from 'react';
import logo from '../assets/logo-colored.png';

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden">
            {/* Logo Container with Animation */}
            <div className="relative flex flex-col items-center">
                <div className="w-48 md:w-64 animate-logo-reveal p-4">
                    <img 
                        src={logo} 
                        alt="Brand Logo" 
                        className="w-full h-auto object-contain drop-shadow-xl"
                    />
                </div>
                
                {/* Progress Bar (Visual Teaser) */}
                <div className="mt-8 w-40 h-1 bg-gray-100 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-primary animate-loading-bar rounded-full"></div>
                </div>

                {/* Subtle Text */}
                <p className="mt-4 text-gray-text text-sm font-medium tracking-[0.3em] uppercase opacity-60 animate-fade-in">
                    Loading Experience
                </p>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes logo-reveal {
                    0% { transform: scale(0.85); opacity: 0; filter: blur(10px); }
                    50% { transform: scale(1.05); opacity: 1; filter: blur(0); }
                    100% { transform: scale(1); opacity: 1; filter: blur(0); }
                }
                @keyframes loading-bar {
                    0% { width: 0%; left: 0; }
                    50% { width: 70%; left: 15%; }
                    100% { width: 100%; left: 0; }
                }
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 0.6; transform: translateY(0); }
                }
                .animate-logo-reveal {
                    animation: logo-reveal 2.5s cubic-bezier(0.2, 0, 0.2, 1) forwards;
                }
                .animate-loading-bar {
                    animation: loading-bar 5s ease-in-out infinite;
                }
                .animate-fade-in {
                    animation: fade-in 1.5s ease-out 1s forwards;
                    opacity: 0;
                }
            `}} />
        </div>
    );
};

export default Preloader;
