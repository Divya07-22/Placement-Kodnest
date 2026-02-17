import React, { useState, useEffect } from 'react';
import { CheckCircle, Copy, ExternalLink, ShieldCheck, AlertCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProofPage = () => {
    const navigate = useNavigate();
    const [links, setLinks] = useState({ lovable: '', github: '', deployed: '' });
    const [checklistComplete, setChecklistComplete] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const steps = [
        "1. Project Setup", "2. Landing Page", "3. Dashboard UI",
        "4. JD Analysis Logic", "5. Visualization", "6. Persistence",
        "7. Hardening", "8. Verification"
    ];

    useEffect(() => {
        const savedLinks = localStorage.getItem('prp_final_submission');
        if (savedLinks) setLinks(JSON.parse(savedLinks));

        const checklistSaved = localStorage.getItem('prp_test_checklist');
        const checkedCount = checklistSaved ? JSON.parse(checklistSaved).length : 0;

        if (checkedCount < 10) {
            navigate('/prp/08-ship'); // Enforce lock
        } else {
            setChecklistComplete(true);
        }
    }, [navigate]);

    const handleLinkChange = (field, value) => {
        const newLinks = { ...links, [field]: value };
        setLinks(newLinks);
        localStorage.setItem('prp_final_submission', JSON.stringify(newLinks));
    };

    const isValidUrl = (str) => {
        try { return Boolean(new URL(str)); } catch (e) { return false; }
    };

    const allLinksValid = isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deployed);
    const isShipped = checklistComplete && allLinksValid;

    useEffect(() => {
        if (isShipped) setShowConfetti(true);
    }, [isShipped]);

    const copySubmission = () => {
        if (!isShipped) return;
        const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;

        navigator.clipboard.writeText(text);
        alert('Proof of Work copied to clipboard!');
    };

    if (!checklistComplete) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-gray-900">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header with Status */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Proof of Work</h1>
                        <p className="text-gray-500 text-sm mt-1">Finalize submission artifacts for the Placement Readiness Platform.</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm flex items-center gap-2 ${isShipped ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                        {isShipped ? (
                            <><CheckCircle className="w-4 h-4" /> Shipped</>
                        ) : (
                            <><Loader className="w-4 h-4 animate-spin" /> In Progress</>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        {/* Completion Message */}
                        {isShipped && (
                            <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl transform transition-all hover:scale-[1.02]">
                                <h3 className="text-2xl font-bold mb-4">You built a real product.</h3>
                                <p className="text-indigo-200 text-lg leading-relaxed">
                                    Not a tutorial. Not a clone.<br />
                                    A structured tool that solves a real problem.
                                </p>
                                <div className="mt-6 pt-6 border-t border-indigo-700 font-semibold flex items-center gap-3 text-green-400">
                                    <ShieldCheck className="w-6 h-6" />
                                    <span>This is your proof of work.</span>
                                </div>
                            </div>
                        )}

                        {/* Step Completion */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                            <h3 className="font-bold mb-4 text-xs uppercase tracking-widest text-gray-500">Development Steps (8/8)</h3>
                            <div className="space-y-2">
                                {steps.map((s, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <span className="text-sm font-medium text-gray-700">{s}</span>
                                        <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase">
                                            Completed <CheckCircle className="w-4 h-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Artifact Inputs */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-6 h-fit">
                        <h3 className="font-bold flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
                            <ExternalLink className="w-4 h-4" /> Submission Artifacts
                        </h3>

                        {[
                            { id: 'lovable', label: 'Lovable Project Link' },
                            { id: 'github', label: 'GitHub Repository Link' },
                            { id: 'deployed', label: 'Deployed URL' }
                        ].map((field) => (
                            <div key={field.id}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                                <input
                                    value={links[field.id]}
                                    onChange={e => handleLinkChange(field.id, e.target.value)}
                                    className={`w-full p-3 border rounded-xl outline-none transition-all font-mono text-sm ${isValidUrl(links[field.id])
                                            ? 'border-green-500 bg-green-50 text-green-900 focus:ring-green-200'
                                            : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                                        }`}
                                    placeholder="https://..."
                                />
                                {!isValidUrl(links[field.id]) && links[field.id] && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> Invalid URL
                                    </p>
                                )}
                            </div>
                        ))}

                        <hr className="border-gray-100 my-4" />

                        <button
                            onClick={copySubmission}
                            disabled={!isShipped}
                            className={`w-full py-4 rounded-xl font-bold text-white flex justify-center items-center gap-2 transition-all shadow-lg ${isShipped
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/30 hover:-translate-y-1'
                                    : 'bg-gray-300 cursor-not-allowed text-gray-500 shadow-none'
                                }`}
                        >
                            <Copy className="w-5 h-5" />
                            {isShipped ? 'Copy Final Submission' : 'Complete All Fields to Ship'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProofPage;
