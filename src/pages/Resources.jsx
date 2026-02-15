import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Trash2, Calendar, Briefcase } from 'lucide-react';
import { getHistory } from '../utils/analysisUtils';

export default function Resources() {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        try {
            const data = getHistory();
            // Filter out corrupted entries (missing ID or timestamp)
            const validData = data.filter(item => item && item.id && item.createdAt);

            if (validData.length !== data.length) {
                // If we filtered some out, update localStorage to clean it up
                console.warn('Removed corrupted history entries');
                localStorage.setItem('jdHistory', JSON.stringify(validData));
            }

            setHistory(validData);
        } catch (error) {
            console.error('Failed to load history:', error);
            setHistory([]);
            // Optional: Backup and clear if critically corrupted
            // localStorage.removeItem('jdHistory');
        }
    };

    const handleDelete = (id) => {
        const updated = history.filter(item => item.id !== id);
        localStorage.setItem('jdHistory', JSON.stringify(updated));
        loadHistory();
    };

    const handleViewAnalysis = (id) => {
        navigate(`/dashboard/results?id=${id}`);
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 bg-green-50';
        if (score >= 60) return 'text-yellow-600 bg-yellow-50';
        return 'text-orange-600 bg-orange-50';
    };

    if (history.length === 0) {
        return (
            <div className="text-center py-16">
                <HistoryIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analyses Yet</h3>
                <p className="text-gray-600 mb-6">
                    Start by analyzing a job description to see your preparation insights
                </p>
                <button
                    onClick={() => navigate('/dashboard/assessments')}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Analyze Your First JD
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Analysis History</h2>
                    <p className="text-gray-600 mt-1">{history.length} saved {history.length === 1 ? 'analysis' : 'analyses'}</p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/assessments')}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    New Analysis
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 border border-gray-200"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    {item.company && (
                                        <div className="flex items-center gap-1 text-gray-700">
                                            <Briefcase className="w-4 h-4" />
                                            <span className="font-semibold">{item.company}</span>
                                        </div>
                                    )}
                                    {item.role && (
                                        <span className="text-gray-600">• {item.role}</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(item.createdAt)}</span>
                                </div>

                                {/* Skills Preview */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {Object.keys(item.extractedSkills).slice(0, 4).map((category) => (
                                        <span
                                            key={category}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                        >
                                            {item.extractedSkills[category].length} {category}
                                        </span>
                                    ))}
                                    {Object.keys(item.extractedSkills).length > 4 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                            +{Object.keys(item.extractedSkills).length - 4} more
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className={`px-3 py-1 rounded-full font-semibold ${getScoreColor(item.readinessScore)}`}>
                                        Score: {item.readinessScore}/100
                                    </div>
                                    <button
                                        onClick={() => handleViewAnalysis(item.id)}
                                        className="text-primary hover:text-indigo-700 font-medium text-sm"
                                    >
                                        View Details →
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors p-2"
                                title="Delete analysis"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
