import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code, FileText, BookOpen, User } from 'lucide-react';

export default function DashboardLayout() {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Practice', path: '/dashboard/practice', icon: Code },
        { name: 'Assessments', path: '/dashboard/assessments', icon: FileText },
        { name: 'Resources', path: '/dashboard/resources', icon: BookOpen },
        { name: 'Profile', path: '/dashboard/profile', icon: User },
    ];

    return (
        <div className="min-h-screen bg-gray-50 grid grid-cols-[256px_1fr]">
            {/* Sidebar */}
            <aside className="bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-indigo-700">Placement Prep</h2>
                </div>
                <nav className="px-4 space-y-2 flex-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col min-w-0">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                            U
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-8 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
