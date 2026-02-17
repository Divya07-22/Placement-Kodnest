import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Saved from './pages/Saved';
import Digest from './pages/Digest';
import Settings from './pages/Settings';
import Proof from './pages/Proof';
import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';
import DesignSystem from './pages/DesignSystem';

export default function JobRoutes() {
  return (
    <div className="page-container">
      <Navigation />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="home" element={<Home />} />
        <Route path="saved" element={<Saved />} />
        <Route path="digest" element={<Digest />} />
        <Route path="settings" element={<Settings />} />
        <Route path="proof" element={<Proof />} />

        {/* Tracker Routes */}
        <Route path="07-test" element={<TestChecklist />} />
        <Route path="08-ship" element={<Ship />} />

        <Route path="design" element={<DesignSystem />} />

        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </div>
  );
}
