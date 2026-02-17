import React from 'react';
import { PlayCircle, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="p-2 md:p-6 max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 1. Overall Readiness & Skill Breakdown */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                    {/* Circular Progress */}
                    <div className="flex flex-col items-center justify-center relative">
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="#F3F4F6"
                                strokeWidth="12"
                                fill="transparent"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="hsl(245, 58%, 51%)"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 88}
                                strokeDashoffset={2 * Math.PI * 88 * (1 - 0.72)}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">72</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 block">/ 100</span>
                        </div>
                        <p className="mt-4 font-semibold text-gray-700 dark:text-gray-300">Readiness Score</p>
                    </div>

                    {/* Skill Breakdown (Custom Bars) */}
                    <div className="w-full flex-1 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Skill Breakdown</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'DSA', score: 75 },
                                { label: 'System Design', score: 60 },
                                { label: 'Communication', score: 80 },
                                { label: 'Resume', score: 85 },
                                { label: 'Aptitude', score: 70 }
                            ].map((skill, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        <span>{skill.label}</span>
                                        <span>{skill.score}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                                            style={{ width: `${skill.score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column Stack */}
                <div className="space-y-6">
                    {/* 3. Continue Practice */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Continue Practice</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Pick up where you left off</p>
                            </div>
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                <PlayCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span className="text-gray-700 dark:text-gray-300">Dynamic Programming</span>
                                <span className="text-indigo-600 dark:text-indigo-400">3/10 Completed</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/dashboard/practice')}
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                            Continue Session <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* 4. Weekly Goals */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Weekly Goal</h3>
                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">On Track</span>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Problems Solved</span>
                                <span className="font-bold text-gray-900 dark:text-white">12 / 20</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${[0, 1, 3, 4].includes(i) ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                                        }`}>
                                        {day}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Upcoming Assessments */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Upcoming Assessments
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", type: "Technical" },
                        { title: "System Design Review", time: "Wed, 2:00 PM", type: "Architecture" },
                        { title: "HR Interview Prep", time: "Friday, 11:00 AM", type: "Soft Skills" }
                    ].map((item, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500 transition-colors">
                            <div className="mt-1">
                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.time}</p>
                                <span className="inline-block mt-3 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                                    {item.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
