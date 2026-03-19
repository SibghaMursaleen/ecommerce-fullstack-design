import React, { useState } from 'react';
import UserDashboardLayout from './UserDashboardLayout';
import { useAuth } from '../context/AuthContext';

const SecuritySettings = () => {
    const { updatePassword } = useAuth();
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (passwordData.newPassword.length < 6) {
            setStatus({ type: 'error', message: 'New password must be at least 6 characters!' });
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setStatus({ type: 'error', message: 'New passwords do not match!' });
            return;
        }

        setSubmitting(true);
        setStatus({ type: '', message: '' });

        const result = await updatePassword({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
        });

        if (result.success) {
            setStatus({ type: 'success', message: 'Password updated successfully!' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            setStatus({ type: 'error', message: result.message });
        }

        setSubmitting(false);
        setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    };

    return (
        <UserDashboardLayout>
            <div className="bg-white border border-[#DEE2E7] rounded-xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#1C1C1C] mb-6">Security Settings</h2>
                
                {status.message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        <span className="material-icons">{status.type === 'success' ? 'check_circle' : 'error'}</span>
                        <p className="font-medium">{status.message}</p>
                    </div>
                )}

                <div className="max-w-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-[#505050]">Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handleChange}
                                required
                                className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-[#F1F3F5]">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-[#505050]">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-colors"
                                    placeholder="Min 8 characters"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-[#505050]">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-[#DEE2E7] rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-colors"
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={submitting}
                            className={`bg-primary text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            {submitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                            {submitting ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-[#F1F3F5] space-y-6">
                        <h3 className="text-lg font-bold text-[#1C1C1C]">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between p-4 bg-[#F7FAFC] rounded-lg border border-[#DEE2E7]">
                            <div className="flex items-center gap-3">
                                <span className="material-icons text-primary">phonelink_lock</span>
                                <div>
                                    <p className="font-bold text-sm text-[#1C1C1C]">Text Message (SMS)</p>
                                    <p className="text-xs text-[#8B96A5]">Use your phone to receive security codes</p>
                                </div>
                            </div>
                            <button className="text-primary font-bold text-sm hover:underline">Enable</button>
                        </div>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    );
};

export default SecuritySettings;
