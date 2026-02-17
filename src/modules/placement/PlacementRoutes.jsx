import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Assessments from './pages/Assessments';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import ProofPage from './pages/ProofPage';
import ShipLock from './pages/ShipLock';
import DesignSystem from './pages/DesignSystem';

import TestChecklist from './pages/TestChecklist';

export default function PlacementRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="practice" element={<Practice />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="resources" element={<Resources />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Verification Pages */}
      <Route path="/prp/07-test" element={<TestChecklist />} />
      <Route path="/prp/08-ship" element={<ShipLock />} />
      <Route path="/prp/proof" element={<ProofPage />} />

      {/* Design System Verification */}
      <Route path="/design-system" element={<DesignSystem />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
