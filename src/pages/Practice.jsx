import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FileText, Search, ArrowRight, Briefcase, Building, Sparkles } from 'lucide-react';
import { analyzeJD } from '../utils/analysisUtils';
import Results from './Results';

const Practice = () => {
    const location = useLocation();
    const [mode, setMode] = useState('input'); // 'input' or 'results'
    const [analysisData, setAnalysisData] = useState(null);

    // Form State
    const [jdText, setJdText] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [warningMsg, setWarningMsg] = useState('');

    useEffect(() => {
        // If navigated with state (from History), show results
        if (location.state?.analysis) {
            setAnalysisData(location.state.analysis);
            setMode('results');
        }
    }, [location.state]);

    const handleAnalyze = () => {
        if (!jdText.trim()) {
            alert("Please paste a Job Description to analyze.");
            return;
        }

        setWarningMsg('');
        if (jdText.length < 200) {
            setWarningMsg("This JD is too short to analyze deeply. Paste full JD for better output.");
        }

        setIsAnalyzing(true);

        // Simulate processing delay for UX
        setTimeout(() => {
            const result = analyzeJD(jdText, company, role);
            setAnalysisData(result);
            setMode('results');
            setIsAnalyzing(false);
        }, 1500);
    };

    if (mode === 'results' && analysisData) {
        return <Results initialData={analysisData} />;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">JD Analyzer</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Paste a Job Description below to generate a tailored preparation plan,
                    skill checklist, and interview questions.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                <div className="p-6 md:p-8 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Building className="w-4 h-4" /> Company Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Google, Amazon, Startup"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Role
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Frontend Engineer, SDE-1"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Job Description / Requirements
                        </label>
                        <textarea
                            className="w-full h-48 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="Paste the full JD architecture here... We'll extract the skills and requirements automatically."
                            value={jdText}
                            onChange={(e) => setJdText(e.target.value)}
                        ></textarea>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                            {jdText.length} characters
                        </p>

                        <div className="flex justify-end pt-4 flex-col items-end gap-3">
                            {warningMsg && (
                                <div className="text-amber-600 text-sm bg-amber-50 px-3 py-1 rounded border border-amber-200">
                                    Warning: {warningMsg}
                                </div>
                            )}
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !jdText.trim()}
                                className={`
                                flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white
                                transition-all duration-300 shadow-lg hover:shadow-xl
                                ${isAnalyzing ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-indigo-600 hover:translate-y-[-2px]'}
                            `}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Analyze Job Description
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                            <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1">Smart Extraction</h3>
                            <p className="text-sm text-indigo-700 dark:text-indigo-400">We identify core skills like React, SQL, and System Design.</p>
                        </div>
                        <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                            <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-1">7-Day Plan</h3>
                            <p className="text-sm text-purple-700 dark:text-purple-400">Get a daily schedule tailored to the job's stack.</p>
                        </div>
                        <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-800">
                            <h3 className="font-semibold text-pink-900 dark:text-pink-300 mb-1">Checklist</h3>
                            <p className="text-sm text-pink-700 dark:text-pink-400">Round-by-round breakdown of what to prepare.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Practice;
