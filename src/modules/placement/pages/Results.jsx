import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Calendar, Target, Download, Copy, Check, X } from 'lucide-react';
import { getHistoryById, updateHistoryEntry } from '../utils/analysisUtils';

export default function Results({ initialData: propInitialData }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get initial data
    const historyId = searchParams.get('id');
    const locationState = location.state?.analysis;

    // Initialize state - prioritize prop, then location state, then null (will fetch in effect)
    const [initialData, setInitialData] = useState(propInitialData || locationState || null);

    // Fetch from history if not in state
    useEffect(() => {
        if (!initialData && historyId) {
            const entry = getHistoryById(historyId);
            if (entry) {
                setInitialData(entry);
            }
        }
    }, [historyId, initialData]);

    // State for interactive features
    const [skillConfidenceMap, setSkillConfidenceMap] = useState({});
    const [liveScore, setLiveScore] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Initialize state from data
    useEffect(() => {
        if (initialData) {
            // Initialize confidence map if not exists
            const initialMap = initialData.skillConfidenceMap || {};

            // If new analysis, default all skills to 'practice' if not set
            if (Object.keys(initialMap).length === 0 && initialData.extractedSkills) {
                Object.values(initialData.extractedSkills).flat().forEach(skill => {
                    initialMap[skill] = 'practice';
                });
            }

            setSkillConfidenceMap(initialMap);

            // Robust Base Score Calculation
            let baseScore;

            // Calculate modifier from the map
            let modifier = 0;
            Object.values(initialMap).forEach(val => {
                if (val === 'know') modifier += 2;
                if (val === 'practice') modifier -= 2;
            });

            if (initialData.baseScore !== undefined) {
                baseScore = initialData.baseScore;
            } else {
                // Backward compatibility: If no baseScore, infer it
                // Logic: currentScore = base + modifier
                // Therefore: base = currentScore - modifier
                // But wait, if it was a legacy item, readinessScore might be the *only* score. 
                // If map is NEW (empty), modifier is for Defaults. 
                // If map existed, modifier is for existing values.

                if (Object.keys(initialData.skillConfidenceMap || {}).length > 0) {
                    // Map existed, so readinessScore presumably includes the modifier.
                    baseScore = (initialData.readinessScore || 0) - modifier;
                } else {
                    // Map matches defaults we just set. 
                    // If we just defaulted everything to 'practice', modifier is negative.
                    // The readinessScore from analysis does NOT include these defaults yet.
                    // So base is just readinessScore.
                    baseScore = initialData.readinessScore || 0;
                }
            }

            // Calculate initial live score
            setLiveScore(Math.max(0, Math.min(100, baseScore + modifier)));

            // Store baseScore in state for updates (we can attach it to initialData object in state)
            setInitialData(prev => ({ ...prev, baseScore }));
        }
    }, [initialData]);

    // Handle confidence toggle
    const handleConfidenceChange = (skill, status) => {
        const newMap = { ...skillConfidenceMap, [skill]: status };
        setSkillConfidenceMap(newMap);

        // Get base score (from our patched state)
        const baseScore = initialData.baseScore || 0;

        // Calculate new score: Base + (Knows * 2) - (Practices * 2)
        let modifier = 0;
        Object.values(newMap).forEach(val => {
            if (val === 'know') modifier += 2;
            if (val === 'practice') modifier -= 2;
        });

        const newScore = Math.max(0, Math.min(100, baseScore + modifier));
        setLiveScore(newScore);

        // Persist changes
        if (historyId) {
            updateHistoryEntry(historyId, {
                skillConfidenceMap: newMap,
                readinessScore: newScore, // Update display score
                baseScore: baseScore // Ensure base persists
            });
        }
    };

    // Toast Helper
    const showNotification = (msg) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    // Export Functions
    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        showNotification(`${label} copied to clipboard!`);
    };

    const export7DayPlan = () => {
        const text = initialData.plan.map(day =>
            `Day ${day.day}: ${day.title}\n${day.tasks.map(t => `  - ${t}`).join('\n')}`
        ).join('\n\n');
        copyToClipboard(text, '7-Day Plan');
    };

    const exportChecklist = () => {
        const text = [
            'Round 1: Aptitude & Basics',
            ...initialData.checklist.round1.map(item => `  - ${item}`),
            '\nRound 2: DSA & Core CS',
            ...initialData.checklist.round2.map(item => `  - ${item}`),
            '\nRound 3: Technical Interview',
            ...initialData.checklist.round3.map(item => `  - ${item}`),
            '\nRound 4: HR & Behavioral',
            ...initialData.checklist.round4.map(item => `  - ${item}`)
        ].join('\n');
        copyToClipboard(text, 'Checklist');
    };

    const exportQuestions = () => {
        const text = initialData.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
        copyToClipboard(text, 'Interview Questions');
    };

    const downloadAsTXT = () => {
        const { company, role, extractedSkills, plan, questions } = initialData;
        const content = `
PLACEMENT PREPARATION ANALYSIS
-----------------------------
Company: ${company || 'N/A'}
Role: ${role || 'N/A'}
Readiness Score: ${liveScore}/100

EXTRACTED SKILLS
${Object.keys(extractedSkills).map(cat =>
            `${categoryNames[cat]}: ${extractedSkills[cat].join(', ')}`
        ).join('\n')}

7-DAY STUDY PLAN
${plan.map(day => `Day ${day.day}: ${day.title}\n${day.tasks.map(t => `  - ${t}`).join('\n')}`).join('\n\n')}

ROUND-WISE CHECKLIST
Round 1: Aptitude & Basics
${initialData.checklist.round1.map(item => `- ${item}`).join('\n')}

Round 2: DSA & Core CS
${initialData.checklist.round2.map(item => `- ${item}`).join('\n')}

Round 3: Technical Interview
${initialData.checklist.round3.map(item => `- ${item}`).join('\n')}

Round 4: HR & Behavioral
${initialData.checklist.round4.map(item => `- ${item}`).join('\n')}

10 LIKELY INTERVIEW QUESTIONS
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${company || 'JD'}_Analysis_${Date.now()}.txt`;
        a.click();
        showNotification('Analysis downloaded!');
    };

    if (!initialData) {
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

    const { company, role, extractedSkills, checklist, plan, questions, companyIntel, roundMapping } = initialData;

    const CircularProgress = ({ value }) => {
        const percentage = value;
        const circumference = 2 * Math.PI * 60;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative w-40 h-40 mx-auto">
                <svg className="transform -rotate-90 w-40 h-40">
                    <circle cx="80" cy="80" r="60" stroke="#e5e7eb" strokeWidth="10" fill="none" />
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
                    <span className="text-3xl font-bold text-gray-900 transition-all">{Math.round(value)}</span>
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
        general: 'General',
        other: 'Key Skills'
    };

    // Action Next Component
    const ActionNext = () => {
        const weakSkills = Object.entries(skillConfidenceMap)
            .filter(([_, status]) => status === 'practice')
            .map(([skill]) => skill)
            .slice(0, 3);

        return (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-600" />
                    Action Next
                </h3>

                {weakSkills.length > 0 ? (
                    <div className="mb-4">
                        <p className="text-sm text-gray-700 mb-2">Focus on these skills:</p>
                        <div className="flex flex-wrap gap-2">
                            {weakSkills.map(skill => (
                                <span key={skill} className="bg-white px-2 py-1 rounded border border-amber-200 text-sm font-medium text-amber-800">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-700 mb-4">You're confident in all skills! Time to focus on mock interviews.</p>
                )}

                <p className="text-gray-900 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Day 1 plan now.
                </p>
            </div>
        );
    };

    // Company Intel Component
    const CompanyIntelCard = ({ intel }) => {
        if (!intel) return null;
        return (
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{intel.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="bg-indigo-100 text-primary text-xs px-2 py-0.5 rounded-full font-medium">{intel.type}</span>
                            <span className="text-xs text-gray-500">{intel.size}</span>
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <Target className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Typical Hiring Focus</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{intel.focus}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-indigo-100">
                    <p className="text-xs text-indigo-400 italic">
                        Demo Mode: Company intel generated heuristically.
                    </p>
                </div>
            </div>
        );
    };

    // Round Mapping Component
    const RoundTimeline = ({ rounds }) => {
        if (!rounds) return null;
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    Interview Rounds
                </h3>
                <div className="space-y-0">
                    {rounds.map((round, idx) => (
                        <div key={idx} className="relative pl-8 pb-8 last:pb-0">
                            {/* Timeline Line */}
                            {idx !== rounds.length - 1 && (
                                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200"></div>
                            )}
                            {/* Timeline Dot */}
                            <div className="absolute left-0 top-1 w-6 h-6 bg-indigo-50 border-2 border-primary rounded-full flex items-center justify-center text-xs font-bold text-primary">
                                {idx + 1}
                            </div>

                            <div>
                                <h4 className="text-base font-bold text-gray-900">{round.title}</h4>
                                <p className="text-sm text-gray-600 mt-1 mb-2 font-medium">{round.focus}</p>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <p className="text-xs text-gray-500 mb-2 italic">
                                        <span className="font-semibold not-italic text-gray-700">Why this round? </span>
                                        {round.why}
                                    </p>
                                    <ul className="space-y-1">
                                        {round.tips.map((tip, i) => (
                                            <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                                                <span className="text-primary">•</span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 pb-12 relative">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in transition-opacity duration-300">
                    {toastMessage}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
                    {company && role && (
                        <p className="text-gray-600 mt-1">{company} - {role}</p>
                    )}
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={downloadAsTXT}
                        className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download TXT
                    </button>
                    <button
                        onClick={() => navigate('/dashboard/practice')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Score & Skills */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Company Intel Card (NEW) */}
                    <CompanyIntelCard intel={companyIntel} />

                    {/* Readiness Score */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Readiness Score</h3>
                        <CircularProgress value={liveScore} />
                        <p className="text-center mt-4 text-gray-600">
                            {liveScore >= 80 ? 'Excellent! You\'re well-prepared.' :
                                liveScore >= 60 ? 'Good progress! Keep improving.' :
                                    'Focus on building more skills.'}
                        </p>
                    </div>

                    {/* Interactive Skills */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Skill Confidence</h3>
                        <p className="text-xs text-gray-500 mb-4">Mark skills you know to update your score.</p>
                        <div className="space-y-4">
                            {Object.keys(extractedSkills || {}).map(category => (
                                <div key={category}>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                                        {categoryNames[category]}
                                    </h4>
                                    <div className="space-y-2">
                                        {extractedSkills[category].map((skill, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 p-2 rounded-lg gap-2">
                                                <span className="font-medium text-gray-900 text-sm">{skill}</span>
                                                <div className="flex gap-1 text-xs">
                                                    <button
                                                        onClick={() => handleConfidenceChange(skill, 'know')}
                                                        className={`px-2 py-1 rounded flex items-center gap-1 transition-colors ${skillConfidenceMap[skill] === 'know'
                                                            ? 'bg-green-600 text-white shadow-sm'
                                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                            }`}
                                                    >
                                                        <Check className="w-3 h-3" />
                                                        Know
                                                    </button>
                                                    <button
                                                        onClick={() => handleConfidenceChange(skill, 'practice')}
                                                        className={`px-2 py-1 rounded flex items-center gap-1 transition-colors ${skillConfidenceMap[skill] === 'practice'
                                                            ? 'bg-orange-500 text-white shadow-sm'
                                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                            }`}
                                                    >
                                                        <X className="w-3 h-3" />
                                                        Practice
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Plan & Content */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Round Mapping (NEW) */}
                    <RoundTimeline rounds={roundMapping} />

                    {/* 7-Day Plan */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-primary" />
                                7-Day Study Plan
                            </h3>
                            <button
                                onClick={export7DayPlan}
                                className="text-primary hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                            >
                                <Copy className="w-4 h-4" /> Copy
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {plan.map((dayPlan) => (
                                <div key={dayPlan.day} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                                            {dayPlan.day}
                                        </div>
                                        <h4 className="font-semibold text-gray-900 text-sm">{dayPlan.title}</h4>
                                    </div>
                                    <ul className="space-y-1">
                                        {dayPlan.tasks.slice(0, 3).map((task, idx) => (
                                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                                                <span className="text-primary mt-0.5">•</span>
                                                <span>{task}</span>
                                            </li>
                                        ))}
                                        {dayPlan.tasks.length > 3 && (
                                            <li className="text-xs text-gray-500 pl-3">+ {dayPlan.tasks.length - 3} more</li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checklist */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <CheckCircle className="w-6 h-6 text-primary" />
                                Preparation Checklist
                            </h3>
                            <button
                                onClick={exportChecklist}
                                className="text-primary hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                            >
                                <Copy className="w-4 h-4" /> Copy
                            </button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { key: 'round1', title: 'Round 1: Aptitude' },
                                { key: 'round2', title: 'Round 2: DSA & Core' },
                                { key: 'round3', title: 'Round 3: Tech Interview' },
                                { key: 'round4', title: 'Round 4: HR' }
                            ].map(({ key, title }) => (
                                <div key={key} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                    <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {checklist[key].slice(0, 4).map((item, idx) => (
                                            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0"></div>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <Target className="w-6 h-6 text-primary" />
                                Interview Questions
                            </h3>
                            <button
                                onClick={exportQuestions}
                                className="text-primary hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                            >
                                <Copy className="w-4 h-4" /> Copy
                            </button>
                        </div>
                        <ol className="space-y-2">
                            {questions.slice(0, 5).map((q, idx) => (
                                <li key={idx} className="flex gap-3 text-sm">
                                    <span className="font-semibold text-gray-400 min-w-[1.5rem]">{idx + 1}.</span>
                                    <span className="text-gray-700">{q}</span>
                                </li>
                            ))}
                        </ol>
                        {questions.length > 5 && (
                            <p className="text-sm text-gray-500 mt-2 pl-9">+ {questions.length - 5} more questions in download</p>
                        )}
                    </div>

                    {/* Action Next */}
                    <ActionNext />
                </div>
            </div>
        </div>
    );
}
