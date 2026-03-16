import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send an API request
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="bg-[#F7FAFC] min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-[16px] text-[#8B96A5] mb-6 space-x-2">
                    <Link to="/" className="cursor-pointer hover:text-[#1C1C1C] transition-colors">Home</Link>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8L14 12L10 16" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[#1C1C1C]">Contact Us</span>
                </nav>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-[#1C1C1C] mb-4">Get in Touch</h1>
                    <p className="text-[#505050] text-lg max-w-2xl mx-auto">
                        Have a question, feedback, or need assistance? We're here to help! Fill out the form below and our team will get back to you as soon as possible.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Contact Information Cards */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="bg-white border border-[#DEE2E7] rounded-lg p-6 shadow-sm flex items-start">
                            <div className="bg-[#E3F0FF] p-3 rounded-full mr-4 text-[#0D6EFD]">
                                <span className="material-icons">location_on</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-1">Our Office</h3>
                                <p className="text-[#505050]">123 E-commerce St,<br />Tech District, NY 10001</p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#DEE2E7] rounded-lg p-6 shadow-sm flex items-start">
                            <div className="bg-[#E3F0FF] p-3 rounded-full mr-4 text-[#0D6EFD]">
                                <span className="material-icons">phone</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-1">Call Us</h3>
                                <p className="text-[#505050]">+1 (555) 123-4567<br />Mon-Fri, 9AM-6PM</p>
                            </div>
                        </div>

                        <div className="bg-white border border-[#DEE2E7] rounded-lg p-6 shadow-sm flex items-start">
                            <div className="bg-[#E3F0FF] p-3 rounded-full mr-4 text-[#0D6EFD]">
                                <span className="material-icons">email</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-1">Email Us</h3>
                                <p className="text-[#505050]">support@example.com<br />sales@example.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full md:w-2/3">
                        <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6">Send us a Message</h2>

                            {submitted && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                                    <strong className="font-bold">Success! </strong>
                                    <span className="block sm:inline">Your message has been sent successfully. We'll be in touch soon!</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-[#1C1C1C] mb-1">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-[#1C1C1C] mb-1">Your Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-[#1C1C1C] mb-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD]"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-[#1C1C1C] mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-[#1C1C1C] outline-none focus:border-[#0D6EFD] resize-y"
                                        placeholder="Please provide details..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-[#0D6EFD] hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-md transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
