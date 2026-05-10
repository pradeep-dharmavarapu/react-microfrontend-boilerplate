// Ambient declarations for Module Federation remotes (keeps repo file count minimal)
declare module 'mfeDashboard/*';
declare module 'mfeAnalytics/*';

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MFELoader } from './components/MFELoader';

// Lazy-loaded micro-frontends via Module Federation
const DashboardMFE = lazy(() => import('mfeDashboard/App'));
const AnalyticsMFE = lazy(() => import('mfeAnalytics/App'));

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <nav style={navStyle}>
            <span style={logoStyle}>⚡ MFE Platform</span>
            <NavLink to="/" style={linkStyle}>Home</NavLink>
            <NavLink to="/dashboard" style={linkStyle}>Dashboard MFE</NavLink>
            <NavLink to="/analytics" style={linkStyle}>Analytics MFE</NavLink>
          </nav>

          <main style={{ flex: 1, padding: '24px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard/*"
                element={
                  <ErrorBoundary fallback={<MFELoader name="Dashboard" error />}>
                    <Suspense fallback={<MFELoader name="Dashboard" />}>
                      <DashboardMFE />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/analytics/*"
                element={
                  <ErrorBoundary fallback={<MFELoader name="Analytics" error />}>
                    <Suspense fallback={<MFELoader name="Analytics" />}>
                      <AnalyticsMFE />
                    </Suspense>
                  </ErrorBoundary>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

const Home: React.FC = () => (
  <div>
    <h1>MFE Shell Application</h1>
    <p>This shell orchestrates independently deployed micro-frontend applications.</p>
    <ul>
      <li><strong>Dashboard MFE</strong> — runs on port 3001</li>
      <li><strong>Analytics MFE</strong> — runs on port 3002</li>
    </ul>
    <p>Each MFE is independently deployable. The shell loads them at runtime.</p>
  </div>
);

const navStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '24px',
  padding: '16px 24px', background: '#1a1a2e', color: '#fff'
};
const logoStyle: React.CSSProperties = { fontWeight: 700, fontSize: '18px', marginRight: 'auto' };
const linkStyle = ({ isActive }: { isActive: boolean }): React.CSSProperties => ({
  color: isActive ? '#7c3aed' : '#94a3b8',
  textDecoration: 'none', fontWeight: isActive ? 600 : 400
});
