import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
        
        setIsSubmitting(true);
        const result = await register(formData.name, formData.email, formData.password);
        
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#F7FAFC] px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-[#DEE2E7] overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-[#1C1C1C]">Create Account</h2>
                        <p className="text-[#8B96A5] mt-2">Join the PKR Shop community</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-center gap-2 border border-red-100">
                            <span className="material-icons text-[18px]">error_outline</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">Full Name</label>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-[#DEE2E7] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[#1C1C1C]"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-[#DEE2E7] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[#1C1C1C]"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-[#DEE2E7] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[#1C1C1C]"
                                placeholder="Min. 6 characters"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-[#DEE2E7] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[#1C1C1C]"
                                placeholder="Repeat your password"
                                required
                            />
                        </div>

                        <div className="flex items-start">
                            <input type="checkbox" id="terms" className="mt-1 h-4 w-4 text-primary border-[#DEE2E7] rounded focus:ring-primary cursor-pointer" required />
                            <label htmlFor="terms" className="ml-2 block text-sm text-[#505050] cursor-pointer">
                                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-base hover:bg-blue-700 transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-[#F1F3F5] text-center">
                        <p className="text-[#505050] text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
