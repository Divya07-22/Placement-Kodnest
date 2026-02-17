import React from 'react';
import { BookOpen, Code, Terminal, Clock, ArrowRight } from 'lucide-react';

const Assessments = () => {
    const assessments = [
        {
            id: 1,
            title: "React Fundamentals",
            desc: "Test your knowledge of Hooks, State, and Props.",
            icon: <Code className="w-6 h-6 text-blue-500" />,
            level: "Intermediate",
            duration: "30 mins"
        },
        {
            id: 2,
            title: "JavaScript Logic",
            desc: "Arrays, Objects, Closures, and Async programming.",
            icon: <Terminal className="w-6 h-6 text-yellow-500" />,
            level: "Advanced",
            duration: "45 mins"
        },
        {
            id: 3,
            title: "System Design Basics",
            desc: "Scalability, Load Balancing, and Database choices.",
            icon: <BookOpen className="w-6 h-6 text-purple-500" />,
            level: "Beginner",
            duration: "20 mins"
        }
    ];

    return (
        <div className="space-y-8 font-sans">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Skill Assessments</h1>
                <p className="text-gray-500 mt-2">Take mock tests to validate your readiness.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assessments.map((test) => (
                    <div key={test.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                                {test.icon}
                            </div>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase">
                                {test.level}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{test.title}</h3>
                        <p className="text-gray-500 text-sm mb-6 h-10">{test.desc}</p>

                        <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mb-6">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.duration}</span>
                            <span>•</span>
                            <span>15 Questions</span>
                        </div>

                        <button className="w-full py-3 rounded-lg border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                            onClick={() => alert('Demo Mode: Assessment module will be available in the next release.')}>
                            Start {test.title} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-5px] group-hover:translate-x-0" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-indigo-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold mb-2">Want more practice?</h3>
                    <p className="text-indigo-200 text-sm">Unlock premium assessments tailored to your target companies.</p>
                </div>
                <button className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                    View Premium Plan
                </button>
            </div>
        </div>
    );
};

export default Assessments;
