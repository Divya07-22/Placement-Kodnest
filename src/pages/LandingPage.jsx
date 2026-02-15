import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Video, TrendingUp } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Code className="w-12 h-12 text-primary" />,
            title: "Practice Problems",
            description: "Solve coding challenges to sharpen your skills"
        },
        {
            icon: <Video className="w-12 h-12 text-primary" />,
            title: "Mock Interviews",
            description: "Simulate real interview scenarios with AI feedback"
        },
        {
            icon: <TrendingUp className="w-12 h-12 text-primary" />,
            title: "Track Progress",
            description: "Monitor your improvement with detailed analytics"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4">
                <div className="text-center max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Ace Your Placement
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8">
                        Practice, assess, and prepare for your dream job
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-primary hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-6 text-center">
                <p className="text-gray-400">
                    © {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
