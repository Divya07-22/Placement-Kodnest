import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, FileText, ArrowRight, Trash2, Calendar, Building } from 'lucide-react';
import { getHistory } from '../utils/analysisUtils';

const Resources = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const handleViewReport = (entry) => {
        navigate('/dashboard/practice', { state: { analysis: entry } });
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <History className="w-6 h-6 text-indigo-600" />
                        Analysis History
                    </h1>
                    <p className="text-gray-600 mt-1">Access your previous JD analyses and preparation plans.</p>
                </div>
            </div>

            {history.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No History Yet</h3>
                    <p className="text-gray-500 mb-6">Analyze a Job Description to get started with your preparation.</p>
                    <button
                        onClick={() => navigate('/dashboard/practice')}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Create New Analysis
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {history.map((entry) => (
                        <div
                            key={entry.id}
                            onClick={() => handleViewReport(entry)}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex justify-between items-start mb-3">
                                <div className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
                                    Score: {entry.readinessScore}/100
                                </div>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(entry.timestamp)}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                {entry.role || 'Unknown Role'}
                            </h3>

                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                <Building className="w-4 h-4" />
                                <span className="line-clamp-1">{entry.company || 'Unknown Company'}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {Object.keys(entry.extractedSkills).slice(0, 3).map((cat) => {
                                    if (entry.extractedSkills[cat].length > 0) {
                                        return (
                                            <span key={cat} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                {entry.extractedSkills[cat][0]}
                                            </span>
                                        );
                                    }
                                    return null;
                                })}
                                {Object.values(entry.extractedSkills).flat().length > 3 && (
                                    <span className="text-xs bg-gray-50 text-gray-400 px-2 py-1 rounded">
                                        +More
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center text-indigo-600 text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform">
                                View Report <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Resources;
