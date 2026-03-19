import React, { useState } from 'react';
import quoteBg from '../assets/quote_image.png';

const QuoteSection = () => {
    const [formData, setFormData] = useState({
        item: '',
        details: '',
        quantity: '',
        unit: 'Pcs'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.item || !formData.quantity) {
            alert('Please fill out the item and quantity.');
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ item: '', details: '', quantity: '', unit: 'Pcs' });
        }, 1500);
    };

    return (
        <section className="relative rounded-lg overflow-hidden mt-5 min-h-[420px] flex flex-col md:flex-row items-start justify-between p-6 md:p-10">
            {/* Background with Precise Gradient Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${quoteBg})` }}
            >
                {/* Smooth blend: Solid blue on left, almost transparent on right to show the image clearly */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2C7CF1] via-[#2C7CF1]/60 to-transparent"></div>
            </div>

            {/* Left Content */}
            <div className="relative z-10 flex-1 text-white max-w-[440px] mb-8 md:mb-0 md:pr-10">
                <h2 className="text-[32px] font-bold leading-[38px] mb-4 tracking-[-0.2px]">
                    An easy way to send requests to all suppliers
                </h2>
                <p className="text-[16px] font-normal text-white leading-[24px] max-w-[390px]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
                </p>
            </div>

            {/* Right Form Card */}
            <div className="relative z-10 bg-white p-6 md:p-8 rounded-md shadow-sm w-full max-w-[490px] min-h-[300px] flex flex-col justify-center">
                {isSuccess ? (
                    <div className="text-center py-10 animate-fade-in">
                        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-icons text-3xl">check_circle</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#1C1C1C] mb-2">Thank You!</h3>
                        <p className="text-[#8B96A5]">Your inquiry has been sent successfully. Suppliers will contact you soon.</p>
                        <button 
                            onClick={() => setIsSuccess(false)}
                            className="mt-6 text-primary font-bold hover:underline"
                        >
                            Send another inquiry
                        </button>
                    </div>
                ) : (
                    <>
                        <h3 className="text-[20px] font-bold text-[#1C1C1C] mb-5 tracking-tight">Send quote to suppliers</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="item"
                                    value={formData.item}
                                    onChange={handleInputChange}
                                    placeholder="What item you need?"
                                    className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2.5 placeholder:text-[#8B96A5] text-dark focus:outline-none focus:ring-1 focus:ring-primary/30"
                                    required
                                />
                            </div>

                            <div>
                                <textarea
                                    name="details"
                                    value={formData.details}
                                    onChange={handleInputChange}
                                    placeholder="Type more details"
                                    className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2.5 placeholder:text-[#8B96A5] text-dark focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none h-[73px]"
                                ></textarea>
                            </div>

                            <div className="flex space-x-2">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        placeholder="Quantity"
                                        className="w-full border border-[#DEE2E7] rounded-[6px] px-3 py-2.5 placeholder:text-[#8B96A5] text-dark focus:outline-none focus:ring-1 focus:ring-primary/30"
                                        required
                                    />
                                </div>
                                <div className="w-[111px]">
                                    <div className="relative">
                                        <select 
                                            name="unit"
                                            value={formData.unit}
                                            onChange={handleInputChange}
                                            className="w-full appearance-none border border-[#DEE2E7] rounded-[6px] px-3 py-2.5 bg-white pr-9 focus:outline-none focus:ring-1 focus:ring-primary/30 text-dark"
                                        >
                                            <option value="Pcs">Pcs</option>
                                            <option value="Kg">Kg</option>
                                            <option value="Unit">Unit</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#8B96A5]">
                                            <span className="material-icons-outlined text-[24px]">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-1">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-fit bg-[#0D6EFD] hover:bg-blue-600 text-white font-medium px-6 py-2.5 rounded-md transition-all text-[16px] shadow-sm flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Sending...
                                        </>
                                    ) : 'Send inquiry'}
                                </button>
                            </div>
                        </form>
                    </>
                )}
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
        </section>
    );
};

export default QuoteSection;
