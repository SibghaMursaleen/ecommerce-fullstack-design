import React, { useState } from 'react';

const NewsletterSection = () => {
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
            setError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setEmail('');
        }, 1200);
    };

    return (
        <section className="bg-[#EFF2F4] py-10 w-full flex flex-col items-center justify-center text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-[20px] font-semibold text-[#1C1C1C] mb-2">Subscribe on our newsletter</h2>
                <p className="text-[#606060] text-[16px] mb-6">
                    Get daily news on upcoming offers from many suppliers all over the world
                </p>

                {isSuccess ? (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 max-w-[460px] mx-auto animate-fade-in">
                        <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="material-icons text-2xl">done</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1C1C1C]">Thanks for subscribing!</h3>
                        <p className="text-sm text-[#8B96A5] mt-1">You will now receive our daily updates.</p>
                        <button 
                            onClick={() => setIsSuccess(false)}
                            className="mt-4 text-xs font-bold text-primary hover:underline uppercase tracking-wider"
                        >
                            Subscribe another email
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center max-w-[460px] mx-auto gap-2">
                        <div className="relative flex-1 w-full">
                            <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#8B96A5]">email</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className={`bg-white w-full pl-10 pr-4 py-[10px] border ${error ? 'border-red-500' : 'border-[#DEE2E7]'} rounded-[6px] focus:outline-none focus:ring-1 focus:ring-primary/30 text-[#1C1C1C]`}
                                required
                            />
                            {error && <p className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium">{error}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-[#0D6EFD] hover:bg-blue-600 text-white font-medium px-8 py-[10px] rounded-[6px] transition-all shadow-sm w-full sm:w-auto flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Wait...
                                </>
                            ) : 'Subscribe'}
                        </button>
                    </form>
                )}
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}} />
        </section>
    );
};

export default NewsletterSection;
