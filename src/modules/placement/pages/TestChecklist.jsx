import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, RefreshCw, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChecklistItem = ({ id, label, hint, isChecked, onToggle }) => (
    <div
        className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${isChecked
                ? 'bg-green-50 border-green-200 shadow-sm'
                : 'bg-white border-gray-100 hover:border-indigo-200 hover:shadow-md'
            }`}
        onClick={() => onToggle(id)}
    >
        <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'
            }`}>
            {isChecked && <CheckCircle className="w-4 h-4 text-white" />}
        </div>
        <div className="flex-1">
            <h4 className={`font-medium ${isChecked ? 'text-green-800' : 'text-gray-900'}`}>{label}</h4>
            {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
        </div>
    </div>
);

const TestChecklist = () => {
    const navigate = useNavigate();
    const [tests, setTests] = useState([
        { id: 1, label: 'JD required validation works', hint: 'Submit empty JD -> Error blocked.' },
        { id: 2, label: 'Short JD warning shows for <200 chars', hint: 'Paste "abc" -> Warning message.' },
        { id: 3, label: 'Skills extraction groups correctly', hint: 'Check categories (Core CS, Web, etc.).' },
        { id: 4, label: 'Round mapping changes based on company + skills', hint: 'Google vs Startup vs Service.' },
        { id: 5, label: 'Score calculation is deterministic', hint: 'Same JD = Same Score.' },
        { id: 6, label: 'Skill toggles update score live', hint: 'Toggle "Need Practice" -> Score drops.' },
        { id: 7, label: 'Changes persist after refresh', hint: 'Reload page -> Data intact.' },
        { id: 8, label: 'History saves and loads correctly', hint: 'Check History page list.' },
        { id: 9, label: 'Export buttons copy the correct content', hint: 'Test "Copy Checklist".' },
        { id: 10, label: 'No console errors on core pages', hint: 'Pure console (minus harmless warnings).' }
    ]);

    const [checkedIds, setCheckedIds] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        if (saved) {
            try {
                setCheckedIds(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load checklist", e);
            }
        }
    }, []);

    const handleToggle = (id) => {
        let newChecked;
        if (checkedIds.includes(id)) {
            newChecked = checkedIds.filter(cid => cid !== id);
        } else {
            newChecked = [...checkedIds, id];
        }
        setCheckedIds(newChecked);
        localStorage.setItem('prp_test_checklist', JSON.stringify(newChecked));
    };

    const handleReset = () => {
        if (window.confirm('Reset all verification progress?')) {
            setCheckedIds([]);
            localStorage.removeItem('prp_test_checklist');
        }
    };

    const passedCount = checkedIds.length;
    const totalCount = tests.length;
    const isComplete = passedCount === totalCount;
    const progress = (passedCount / totalCount) * 100;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Verification</h1>
                            <p className="text-gray-500 mt-2">Placement Readiness Platform v1.0</p>
                        </div>
                        <div className={`px-5 py-3 rounded-full font-bold text-lg flex items-center gap-2 ${isComplete ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                            {isComplete ? <CheckCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                            Tests Passed: {passedCount} / {totalCount}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-8 shadow-inner">
                        <div
                            className={`h-full transition-all duration-700 ease-out ${isComplete ? 'bg-green-500' : 'bg-indigo-500'}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Status Message */}
                    {!isComplete ? (
                        <div className="flex items-center gap-3 bg-amber-50 text-amber-800 px-6 py-4 rounded-xl border border-amber-200 shadow-sm">
                            <AlertTriangle className="w-6 h-6 flex-shrink-0 animate-pulse" />
                            <span className="font-semibold text-lg">Shipping is locked. Fix and verify all issues.</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 bg-green-50 text-green-800 px-6 py-4 rounded-xl border border-green-200 shadow-sm animate-fade-in">
                            <CheckCircle className="w-6 h-6 flex-shrink-0" />
                            <span className="font-semibold text-lg">All systems go! Ready for launch.</span>
                        </div>
                    )}
                </div>

                {/* Checklist Grid */}
                <div className="space-y-3">
                    {tests.map(test => (
                        <ChecklistItem
                            key={test.id}
                            {...test}
                            isChecked={checkedIds.includes(test.id)}
                            onToggle={handleToggle}
                        />
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 text-gray-500 hover:text-red-600 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reset Checklist
                    </button>

                    <button
                        onClick={() => navigate('/prp/08-ship')}
                        className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white shadow-xl transition-all transform hover:-translate-y-1 ${isComplete
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-300'
                                : 'bg-gray-300 cursor-not-allowed opacity-70'
                            }`}
                        disabled={!isComplete && false} // Let them click to see lock screen
                    >
                        Proceed to Ship
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-400 hover:text-gray-600 text-sm font-medium flex items-center justify-center gap-1 mx-auto"
                    >
                        <ArrowLeft className="w-3 h-3" /> Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestChecklist;
