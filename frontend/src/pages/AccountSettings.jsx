import React, { useState } from 'react';
import UserDashboardLayout from './UserDashboardLayout';
import { useAuth } from '../context/AuthContext';

const AccountSettings = () => {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus({ type: '', message: '' });

        const result = await updateProfile(formData);

        if (result.success) {
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
        } else {
            setStatus({ type: 'error', message: result.message });
        }
        
        setSubmitting(false);
        setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    };

    return (
        <UserDashboardLayout>
            <div className="bg-white border border-[#DEE2E7] rounded-xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#1C1C1C] mb-6">Personal Information</h2>
                
                {status.message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        <span className="material-icons">{status.type === 'success' ? 'check_circle' : 'error'}</span>
                        <p className="font-medium">{status.message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-[#505050]">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-[#505050]">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-colors bg-gray-50 text-[#8B96A5]"
                                readOnly
                            />
                            <p className="text-[11px] text-[#8B96A5]">Email cannot be changed for security</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-[#505050]">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-colors"
                                placeholder="+92 300 1234567"
                            />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-bold text-[#505050]">Permanent Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-colors resize-none"
                                placeholder="Enter your full shipping address"
                            ></textarea>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className={`bg-primary text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            {submitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button 
                            type="button" 
                            className="bg-white border border-[#DEE2E7] text-[#505050] px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                <div className="mt-12 pt-8 border-t border-[#F1F3F5]">
                    <h3 className="text-lg font-bold text-[#FF3838] mb-4">Danger Zone</h3>
                    <div className="bg-red-50 border border-red-100 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="font-bold text-[#1C1C1C]">Deactivate Account</p>
                            <p className="text-sm text-[#8B96A5]">Once you deactivate, your data will be hidden but can be restored later.</p>
                        </div>
                        <button className="bg-white border border-[#FF3838] text-[#FF3838] px-6 py-2 rounded-lg font-bold hover:bg-red-50 transition-all text-sm">
                            Deactivate
                        </button>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
};

export default AccountSettings;
