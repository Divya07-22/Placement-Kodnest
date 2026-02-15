import React from 'react';
import { Calendar, Clock, TrendingUp, BookOpen } from 'lucide-react';

export default function Dashboard() {
    // Circular Progress Component
    const CircularProgress = ({ value, max }) => {
        const percentage = (value / max) * 100;
        const circumference = 2 * Math.PI * 70;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative w-48 h-48 mx-auto">
                <svg className="transform -rotate-90 w-48 h-48">
                    <circle
                        cx="96"
                        cy="96"
                        r="70"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="none"
                    />
                    <circle
                        cx="96"
                        cy="96"
                        r="70"
                        stroke="hsl(245, 58%, 51%)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{value}</span>
                    <span className="text-sm text-gray-500">/ {max}</span>
                </div>
            </div>
        );
    };

    // Radar Chart Component (Custom SVG)
    const RadarChart = () => {
        const skills = [
            { name: 'DSA', value: 75 },
            { name: 'System Design', value: 60 },
            { name: 'Communication', value: 80 },
            { name: 'Resume', value: 85 },
            { name: 'Aptitude', value: 70 },
        ];

        const size = 200;
        const center = size / 2;
        const levels = 5;
        const angleStep = (2 * Math.PI) / skills.length;

        const getPoint = (index, value) => {
            const angle = angleStep * index - Math.PI / 2;
            const radius = (value / 100) * (size / 2 - 30);
            return {
                x: center + radius * Math.cos(angle),
                y: center + radius * Math.sin(angle),
            };
        };

        const dataPoints = skills.map((skill, i) => getPoint(i, skill.value));
        const pathData = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

        return (
            <div className="relative w-full h-64">
                <svg width={size} height={size} className="mx-auto">
                    {/* Grid circles */}
                    {[...Array(levels)].map((_, i) => (
                        <circle
                            key={i}
                            cx={center}
                            cy={center}
                            r={((i + 1) / levels) * (size / 2 - 30)}
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="1"
                        />
                    ))}
                    {/* Axes */}
                    {skills.map((_, i) => {
                        const point = getPoint(i, 100);
                        return (
                            <line
                                key={i}
                                x1={center}
                                y1={center}
                                x2={point.x}
                                y2={point.y}
                                stroke="#e5e7eb"
                                strokeWidth="1"
                            />
                        );
                    })}
                    {/* Data polygon */}
                    <path d={pathData} fill="hsl(245, 58%, 51%)" fillOpacity="0.3" stroke="hsl(245, 58%, 51%)" strokeWidth="2" />
                    {/* Data points */}
                    {dataPoints.map((point, i) => (
                        <circle key={i} cx={point.x} cy={point.y} r="4" fill="hsl(245, 58%, 51%)" />
                    ))}
                </svg>
                {/* Labels */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {skills.map((skill, i) => {
                        const angle = angleStep * i - Math.PI / 2;
                        const labelRadius = size / 2 - 10;
                        const x = center + labelRadius * Math.cos(angle);
                        const y = center + labelRadius * Math.sin(angle);
                        return (
                            <div
                                key={i}
                                className="absolute text-xs font-medium text-gray-700"
                                style={{
                                    left: `${x}px`,
                                    top: `${y}px`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                {skill.name}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const activeDays = [true, true, false, true, true, false, false];

    const upcomingAssessments = [
        { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM', icon: BookOpen },
        { title: 'System Design Review', time: 'Wed, 2:00 PM', icon: TrendingUp },
        { title: 'HR Interview Prep', time: 'Friday, 11:00 AM', icon: Calendar },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>

            {/* 2-column grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overall Readiness */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Overall Readiness</h3>
                    <CircularProgress value={72} max={100} />
                    <p className="text-center mt-4 text-gray-600 font-medium">Readiness Score</p>
                </div>

                {/* Skill Breakdown */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Skill Breakdown</h3>
                    <RadarChart />
                </div>

                {/* Continue Practice */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Practice</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 mb-2">Last Topic</p>
                            <p className="text-lg font-semibold text-gray-900">Dynamic Programming</p>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Progress</span>
                                <span>3/10 completed</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                        </div>
                        <button className="w-full bg-primary hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                            Continue
                        </button>
                    </div>
                </div>

                {/* Weekly Goals */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Goals</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Problems Solved</span>
                                <span>12/20 this week</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                        <div className="flex justify-between gap-2">
                            {weekDays.map((day, index) => (
                                <div key={day} className="flex flex-col items-center gap-1">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${activeDays[index]
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-200 text-gray-400'
                                            }`}
                                    >
                                        {day[0]}
                                    </div>
                                    <span className="text-xs text-gray-500">{day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upcoming Assessments */}
                <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Assessments</h3>
                    <div className="space-y-3">
                        {upcomingAssessments.map((assessment, index) => {
                            const Icon = assessment.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
                                >
                                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{assessment.title}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            <span>{assessment.time}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
