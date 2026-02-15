import React, { useEffect, useState } from 'react';
import { Lock, Rocket, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShipLock = () => {
    const navigate = useNavigate();
    const [isLocked, setIsLocked] = useState(true);
    const [stats, setStats] = useState({ passed: 0, total: 10 });

    useEffect(() => {
        const checkStatus = () => {
            const saved = localStorage.getItem('prp_test_checklist');
            const checkedIds = saved ? JSON.parse(saved) : [];
            const passed = checkedIds.length;
            setStats({ passed, total: 10 });
            setIsLocked(passed < 10);
        };

        checkStatus();
    }, []);

    const handleReset = () => {
        if (window.confirm('Reset checklist and re-lock shipping?')) {
            localStorage.removeItem('prp_test_checklist');
            navigate('/prp/07-test');
        }
    };

    if (isLocked) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
                <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative overflow-hidden">
                    {/* Lock Header */}
                    <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10">
                        <Lock className="w-10 h-10 text-amber-600" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Shipping Locked</h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        The platform is not ready. You must pass all system verification tests before deployment.
                    </p>

                    {/* Progress Card */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                        <div className="flex justify-between text-base font-bold text-gray-800 mb-3">
                            <span>Tests Passed</span>
                            <span className={stats.passed < 10 ? 'text-amber-600' : 'text-green-600'}>
                                {stats.passed} / {stats.total}
                            </span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                                style={{ width: `${(stats.passed / stats.total) * 100}%` }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/prp/07-test')}
                        className="w-full bg-gray-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back to Testing
                    </button>

                    <div className="mt-6 text-xs text-gray-400 uppercase tracking-widest font-semibold">
                        KodNest Build System
                    </div>
                </div>
            </div>
        );
    }

    // Unlocked State (Success)
    return (
        <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4 font-sans relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full mix-blend-overlay filter blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400 rounded-full mix-blend-overlay filter blur-[100px] animate-pulse delay-700"></div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center relative z-10 border-4 border-white/20 backdrop-blur-sm">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-green-200 shadow-xl animate-bounce">
                    <Rocket className="w-12 h-12 text-green-600" />
                </div>

                <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tighter">
                    Ready to Ship!
                </h1>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed font-medium">
                    All verification checks passed. The platform is robust, hardened, and ready for production deployment.
                </p>

                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 text-left shadow-sm">
                    <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-4 opacity-70">Clean Bill of Health</h3>
                    <div className="space-y-3">
                        {['Analysis Engine', 'Validation Logic', 'Premium Design', 'Persistence Layer'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm font-semibold text-indigo-900">
                                <div className="bg-green-500 rounded-full p-1"><CheckCircle className="w-3 h-3 text-white" /></div>
                                {item} Verified
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={() => navigate('/prp/proof')}
                    >
                        Proceed to Final Submission
                    </button>

                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center gap-2 text-gray-400 hover:text-red-500 text-sm font-medium py-2 transition-colors"
                    >
                        <RefreshCw className="w-3 h-3" />
                        Reset Checklist & Re-Lock
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShipLock;
