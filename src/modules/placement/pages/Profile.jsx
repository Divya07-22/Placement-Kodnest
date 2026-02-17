import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Award, Clock, Settings, LogOut } from 'lucide-react';

const Profile = () => {
    const [stats, setStats] = useState({ analyses: 0, shipped: false });
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Edit Mode States
    const [isEditing, setIsEditing] = useState(false);
    const [userProfile, setUserProfile] = useState({
        name: 'Student Developer',
        email: 'student@example.com',
        role: 'Frontend Enthusiast'
    });

    // Force sync on mount
    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('prp_analysis_history') || '[]');
        const shipped = localStorage.getItem('prp_final_submission') ? true : false;
        setStats({ analyses: history.length, shipped });

        // Initialize Dark Mode from Storage
        const savedTheme = localStorage.getItem('theme');
        const hasDarkClass = document.documentElement.classList.contains('dark');

        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            if (!hasDarkClass) document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            if (hasDarkClass) document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        // Direct DOM check to prevent state desync
        const isCurrentlyDark = document.documentElement.classList.contains('dark');

        if (isCurrentlyDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const handleSaveProfile = () => {
        setIsEditing(false);
        // In a real app, we would save to backend here
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 font-sans transition-colors duration-200">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Profile</h1>

            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="bg-white dark:bg-gray-800 p-1 rounded-full">
                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold text-gray-400 border-4 border-white dark:border-gray-800 shadow-sm overflow-hidden">
                                <User className="w-10 h-10" />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                if (isEditing) {
                                    handleSaveProfile();
                                } else {
                                    setIsEditing(true);
                                }
                            }}
                            className={`
                                cursor-pointer z-10 
                                px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm border
                                ${isEditing
                                    ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'}
                            `}
                        >
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>

                    <div>
                        {isEditing ? (
                            <div className="space-y-3 max-w-sm">
                                <input
                                    type="text"
                                    value={userProfile.name}
                                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                                    className="w-full text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-indigo-500 outline-none px-1 py-1"
                                />
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                    <Mail className="w-4 h-4" />
                                    <input
                                        type="text"
                                        value={userProfile.email}
                                        onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                        className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 outline-none focus:border-indigo-500 px-1"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.name}</h2>
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1">
                                    <Mail className="w-4 h-4" />
                                    <span>{userProfile.email}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                            <Clock className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Analyses</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.analyses}</div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                            <Shield className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Status</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        Active <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                            <Award className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Project Status</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {stats.shipped ? 'Shipped 🚀' : 'In Progress'}
                    </div>
                </div>
            </div>

            {/* Settings Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" /> Settings
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer group">
                        <span className="text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Email Notifications</span>
                        <div className="w-10 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <div
                        onClick={toggleDarkMode}
                        role="button"
                        tabIndex={0}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer group select-none active:scale-[0.99] transform transition-transform"
                    >
                        <span className="text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Dark Mode</span>
                        <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
                        </div>
                    </div>
                    <hr className="border-gray-100 dark:border-gray-700 my-2" />
                    <button className="flex items-center gap-2 text-red-600 font-medium p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg w-full transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
