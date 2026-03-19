import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        
        const result = await login(email, password);
        
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
                        <h2 className="text-3xl font-bold text-[#1C1C1C]">Sign In</h2>
                        <p className="text-[#8B96A5] mt-2">Welcome back to PKR Shop</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-center gap-2 border border-red-100">
                            <span className="material-icons text-[18px]">error_outline</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-[#DEE2E7] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[#1C1C1C]"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-semibold text-[#1C1C1C]">Password</label>
                                <a href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</a>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-[#DEE2E7] focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-[#1C1C1C]"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="h-4 w-4 text-primary border-[#DEE2E7] rounded focus:ring-primary cursor-pointer" />
                            <label htmlFor="remember" className="ml-2 block text-sm text-[#505050] cursor-pointer">Remember me</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-white py-3.5 rounded-lg font-bold text-base hover:bg-blue-700 transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </span>
                            ) : "Log In"}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-[#F1F3F5] text-center">
                        <p className="text-[#505050] text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary font-bold hover:underline">Register now</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
