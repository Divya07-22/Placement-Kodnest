import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';

// Import Module Routes
import PlacementRoutes from './modules/placement/PlacementRoutes';
import JobRoutes from './modules/jobs/JobRoutes';
import ResumeRoutes from './modules/resume/ResumeRoutes';

// Import Global Styles (Tailwind is already imported in index.css)
// We might need to import module specific styles here if they aren't imported in their route files
// but usually they are imported in their own components.
// Job Notification has a global style that might conflict, so we rely on its import in JobRoutes or similar.

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">Unified Platform</h1>
          <p className="text-xl text-gray-500">Access all your career tools in one place</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Placement Module */}
          <Link to="/placement" className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Placement</h2>
            <p className="text-gray-500">Readiness platform, practice tests, and assessments.</p>
          </Link>

          {/* Jobs Module */}
          <Link to="/jobs" className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Job Tracker</h2>
            <p className="text-gray-500">Track applications, notifications, and hiring status.</p>
          </Link>

          {/* Resume Module */}
          <Link to="/resume" className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">AI Resume</h2>
            <p className="text-gray-500">Build professional resumes with AI assistance.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Module Routes *
         * Wildcards allow the internal routers to handle sub-paths
         */}
        <Route path="/placement/*" element={<PlacementRoutes />} />
        <Route path="/jobs/*" element={<JobRoutes />} />
        <Route path="/resume/*" element={<ResumeRoutes />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
