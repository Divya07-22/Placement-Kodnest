import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText } from 'lucide-react';
import {
    extractSkills,
    calculateReadinessScore,
    generateChecklist,
    generate7DayPlan,
    generateInterviewQuestions,
    saveToHistory
} from '../utils/analysisUtils';

export default function Assessments() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAnalyze = (e) => {
        e.preventDefault();
        setIsAnalyzing(true);

        // Simulate analysis delay for better UX
        setTimeout(() => {
            // Extract skills
            const extractedSkills = extractSkills(formData.jdText);

            // Calculate readiness score
            const readinessScore = calculateReadinessScore(
                formData.jdText,
                formData.company,
                formData.role,
                extractedSkills
            );

            // Generate checklist, plan, and questions
            const checklist = generateChecklist(extractedSkills);
            const plan = generate7DayPlan(extractedSkills);
            const questions = generateInterviewQuestions(extractedSkills);

            // Prepare analysis data
            const analysisData = {
                company: formData.company,
                role: formData.role,
                jdText: formData.jdText,
                extractedSkills,
                readinessScore,
                checklist,
                plan,
                questions
            };

            // Save to history
            saveToHistory(analysisData);

            // Navigate to results with data
            navigate('/dashboard/results', { state: analysisData });
        }, 800);
    };

    const sampleJD = `We are looking for a talented Software Engineer to join our team. 

Requirements:
- Strong knowledge of Data Structures and Algorithms (DSA)
- Proficiency in Java or Python
- Experience with React and Node.js
- Understanding of OOP, DBMS, and OS concepts
- Familiarity with SQL and MongoDB
- Knowledge of AWS and Docker is a plus
- Good problem-solving skills

Responsibilities:
- Develop and maintain web applications
- Write clean, efficient code
- Collaborate with cross-functional teams
- Participate in code reviews`;

    const fillSample = () => {
        setFormData({
            company: 'Google',
            role: 'Software Engineer',
            jdText: sampleJD
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">JD Analysis</h2>
                <p className="text-gray-600 mt-2">
                    Paste a job description to get personalized preparation insights
                </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleAnalyze} className="space-y-6">
                    {/* Company Name */}
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name (Optional)
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="e.g., Google, Microsoft, Amazon"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                            Role (Optional)
                        </label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="e.g., Software Engineer, Full Stack Developer"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Job Description */}
                    <div>
                        <label htmlFor="jdText" className="block text-sm font-medium text-gray-700 mb-2">
                            Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="jdText"
                            name="jdText"
                            value={formData.jdText}
                            onChange={handleChange}
                            required
                            rows={12}
                            placeholder="Paste the complete job description here..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            {formData.jdText.length} characters
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={!formData.jdText.trim() || isAnalyzing}
                            className="flex-1 bg-primary hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Analyze JD
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={fillSample}
                            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FileText className="w-5 h-5" />
                            Fill Sample
                        </button>
                    </div>
                </form>
            </div>

            {/* Info Card */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What you'll get:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span><strong>Readiness Score (0-100)</strong> based on skills, company, and role</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span><strong>Extracted Skills</strong> grouped by category (Core CS, Languages, Web, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span><strong>Round-wise Preparation Checklist</strong> (Aptitude, DSA, Technical, HR)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span><strong>7-Day Study Plan</strong> tailored to detected skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span><strong>10 Likely Interview Questions</strong> based on your JD</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
