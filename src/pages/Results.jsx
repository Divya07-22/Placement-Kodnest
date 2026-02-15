import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Calendar, Target } from 'lucide-react';
import { getHistoryById } from '../utils/analysisUtils';

export default function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get analysis data from location state or history
    const historyId = searchParams.get('id');
    const analysisData = historyId
        ? getHistoryById(historyId)
        : location.state;

    if (!analysisData) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No analysis data found.</p>
                <button
                    onClick={() => navigate('/dashboard/assessments')}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                    Go to Assessments
                </button>
            </div>
        );
    }

    const {
        company,
        role,
        readinessScore,
        extractedSkills,
        checklist,
        plan,
        questions
    } = analysisData;

    // Circular Progress Component
    const CircularProgress = ({ value }) => {
        const percentage = value;
        const circumference = 2 * Math.PI * 60;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative w-40 h-40 mx-auto">
                <svg className="transform -rotate-90 w-40 h-40">
                    <circle
                        cx="80"
                        cy="80"
                        r="60"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="80"
                        cy="80"
                        r="60"
                        stroke="hsl(245, 58%, 51%)"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{value}</span>
                    <span className="text-xs text-gray-500">/ 100</span>
                </div>
            </div>
        );
    };

    const categoryNames = {
        coreCS: 'Core CS',
        languages: 'Languages',
        web: 'Web Development',
        data: 'Databases',
        cloudDevOps: 'Cloud & DevOps',
        testing: 'Testing',
        general: 'General'
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
                    {company && role && (
                        <p className="text-gray-600 mt-1">{company} - {role}</p>
                    )}
                </div>
                <button
                    onClick={() => navigate('/dashboard/assessments')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Assessments
                </button>
            </div>

            {/* Readiness Score */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Readiness Score</h3>
                <CircularProgress value={readinessScore} />
                <p className="text-center mt-4 text-gray-600">
                    {readinessScore >= 80 ? 'Excellent! You\'re well-prepared.' :
                        readinessScore >= 60 ? 'Good progress! Keep improving.' :
                            'Focus on building more skills.'}
                </p>
            </div>

            {/* Extracted Skills */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Skills Extracted</h3>
                <div className="space-y-4">
                    {Object.keys(extractedSkills).map(category => (
                        <div key={category}>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                {categoryNames[category]}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {extractedSkills[category].map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-indigo-50 text-primary rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Round-wise Checklist */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    Round-wise Preparation Checklist
                </h3>
                <div className="space-y-6">
                    {[
                        { key: 'round1', title: 'Round 1: Aptitude & Basics' },
                        { key: 'round2', title: 'Round 2: DSA & Core CS' },
                        { key: 'round3', title: 'Round 3: Technical Interview' },
                        { key: 'round4', title: 'Round 4: HR & Behavioral' }
                    ].map(({ key, title }) => (
                        <div key={key} className="border-l-4 border-primary pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                            <ul className="space-y-1">
                                {checklist[key].map((item, idx) => (
                                    <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* 7-Day Plan */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    7-Day Study Plan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plan.map((dayPlan) => (
                        <div key={dayPlan.day} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {dayPlan.day}
                                </div>
                                <h4 className="font-semibold text-gray-900">{dayPlan.title}</h4>
                            </div>
                            <ul className="space-y-1">
                                {dayPlan.tasks.map((task, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                        <span className="text-primary mt-0.5">✓</span>
                                        <span>{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interview Questions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    10 Likely Interview Questions
                </h3>
                <ol className="space-y-3">
                    {questions.map((question, idx) => (
                        <li key={idx} className="flex gap-3">
                            <span className="font-semibold text-primary min-w-[2rem]">{idx + 1}.</span>
                            <span className="text-gray-700">{question}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
