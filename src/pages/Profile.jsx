import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Award, Clock, Settings, LogOut } from 'lucide-react';

const Profile = () => {
    const [stats, setStats] = useState({ analyses: 0, shipped: false });

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('prp_analysis_history') || '[]');
        const shipped = localStorage.getItem('prp_final_submission') ? true : false;
        setStats({ analyses: history.length, shipped });
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-8 font-sans">
            <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="bg-white p-1 rounded-full">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold text-gray-400 border-4 border-white shadow-sm">
                                <User className="w-10 h-10" />
                            </div>
                        </div>
                        <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                            Edit Profile
                        </button>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Student Developer</h2>
                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                            <Mail className="w-4 h-4" />
                            <span>student@example.com</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Total Analyses</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stats.analyses}</div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <Shield className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Account Status</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Active <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                            <Award className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">Project Status</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                        {stats.shipped ? 'Shipped 🚀' : 'In Progress'}
                    </div>
                </div>
            </div>

            {/* Settings Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" /> Settings
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <span className="text-gray-700">Email Notifications</span>
                        <div className="w-10 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <span className="text-gray-700">Dark Mode</span>
                        <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <hr className="border-gray-100 my-2" />
                    <button className="flex items-center gap-2 text-red-600 font-medium p-2 hover:bg-red-50 rounded-lg w-full transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
