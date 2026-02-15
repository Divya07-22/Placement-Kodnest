import React, { useState, useEffect } from 'react';
import { CheckCircle, Copy, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProofPage = () => {
    const navigate = useNavigate();
    const [links, setLinks] = useState({ lovable: '', github: '', deployed: '' });
    const [checklistComplete, setChecklistComplete] = useState(false);

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

        if (checkedCount < 10) navigate('/prp/08-ship');
        else setChecklistComplete(true);
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

    const copySubmission = () => {
        if (!isShipped) return;
        const text = "Placement Readiness Platform — Final Submission\n\n" +
            "Lovable Project: " + links.lovable + "\n" +
            "GitHub Repository: " + links.github + "\n" +
            "Live Deployment: " + links.deployed + "\n\n" +
            "Core Capabilities:\n" +
            "- JD skill extraction (deterministic)\n" +
            "- Round mapping engine\n" +
            "- 7-day prep plan\n" +
            "- Interactive readiness scoring\n" +
            "- History persistence";
        navigator.clipboard.writeText(text);
        alert('Proof of Work copied!');
    };

    if (!checklistComplete) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans text-gray-900">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Proof of Work</h1>
                        <p className="text-gray-500 text-sm mt-1">Finalize submission artifacts</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        {isShipped && (
                            <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg">
                                <h3 className="text-xl font-bold mb-2">You built a real product.</h3>
                                <p className="text-indigo-200">Not a tutorial. Not a clone.</p>
                                <div className="mt-4 pt-4 border-t border-indigo-700 font-semibold flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" /> This is your proof of work.
                                </div>
                            </div>
                        )}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h3 className="font-bold mb-4 text-sm uppercase text-gray-500">Build Steps (8/8)</h3>
                            <div className="space-y-2">
                                {steps.map((s, i) => (
                                    <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-100">
                                        <span className="text-sm font-medium">{s}</span>
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                        <h3 className="font-bold flex items-center gap-2 text-sm uppercase text-gray-500"><ExternalLink className="w-4 h-4" /> Submission Artifacts</h3>
                        {['lovable', 'github', 'deployed'].map(f => (
                            <div key={f}>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{f}</label>
                                <input
                                    value={links[f]}
                                    onChange={e => handleLinkChange(f, e.target.value)}
                                    className={`w-full p-3 border rounded-xl outline-none transition-all ${isValidUrl(links[f]) ? 'border-green-500 bg-green-50 text-green-900' : 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`}
                                    placeholder="https://..."
                                />
                            </div>
                        ))}
                        <button
                            onClick={copySubmission} disabled={!isShipped}
                            className={`w-full py-4 rounded-xl font-bold text-white flex justify-center gap-2 transition-all ${isShipped ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl' : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                            <Copy className="w-4 h-4" /> {isShipped ? 'Copy Final Submission' : 'Complete All Fields'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProofPage;
