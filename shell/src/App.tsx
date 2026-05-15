import React, { Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react';

// ── Error Boundary ────────────────────────────────────────────────
interface ErrorBoundaryState { hasError: boolean; error: Error | null; }

class MFEErrorBoundary extends Component<
  { name: string; children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(`[MFE Shell] ${this.props.name} failed to load:`, error.message);
  }

  render() {
    if (this.state.hasError) {
      return <MFEOfflinePlaceholder name={this.props.name} />;
    }
    return this.props.children;
  }
}

// ── Offline Placeholder ───────────────────────────────────────────
const MFEOfflinePlaceholder = ({ name }: { name: string }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', height: '400px', gap: '16px',
    background: 'var(--card-bg)', borderRadius: '12px',
    border: '1px dashed var(--border)', color: 'var(--text-secondary)'
  }}>
    <div style={{ fontSize: '48px' }}>⚡</div>
    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text)' }}>
      {name} MFE
    </div>
    <div style={{ fontSize: '14px', textAlign: 'center', maxWidth: '400px', lineHeight: '1.6' }}>
      This micro-frontend runs as an <strong>independent deployment</strong>.
      In production, each MFE is deployed to its own CDN endpoint.
    </div>
    <div style={{
      background: 'var(--accent-subtle)', border: '1px solid var(--accent)',
      borderRadius: '8px', padding: '12px 20px', fontSize: '13px',
      fontFamily: 'monospace', color: 'var(--accent)'
    }}>
      window.__MFE_CONFIG__.{name.toLowerCase()} = 'https://your-cdn.com/remoteEntry.js'
    </div>
    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
      Architecture demo — shell loads independently of remote MFEs
    </div>
  </div>
);

// ── Loading Spinner ───────────────────────────────────────────────
const MFELoader = ({ name }: { name: string }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', height: '400px', gap: '16px',
    color: 'var(--text-secondary)'
  }}>
    <div style={{
      width: '40px', height: '40px', border: '3px solid var(--border)',
      borderTop: '3px solid var(--accent)', borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
    <div style={{ fontSize: '14px' }}>Loading {name} MFE...</div>
  </div>
);

// ── Demo Pages (shown when remotes are offline) ──────────────────
const HomePage = () => {
  const cards = [
    { icon: '⚡', title: 'Module Federation', desc: 'Each MFE is an independently deployable unit. The shell loads remotes at runtime — no rebuild needed when an MFE deploys.' },
    { icon: '🔄', title: 'Shared Redux Store', desc: 'Auth state, UI state, and cross-MFE notifications managed centrally in the shell. MFEs read from the same store via React context.' },
    { icon: '🚀', title: 'Independent CI/CD', desc: 'Each MFE has its own pipeline. A bug fix in Dashboard deploys in minutes without touching Analytics or the Shell.' },
    { icon: '🛡️', title: 'Error Isolation', desc: 'Each remote is wrapped in an Error Boundary. A crash in one MFE never brings down the others.' },
  ];

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%)',
        borderRadius: '16px', padding: '48px', marginBottom: '32px', color: '#fff'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '2px', opacity: 0.8, marginBottom: '12px' }}>
          PRODUCTION ARCHITECTURE DEMO
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 700, margin: '0 0 16px', lineHeight: 1.2 }}>
          React Micro-Frontend<br />Boilerplate
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.9, margin: '0 0 24px', maxWidth: '600px', lineHeight: 1.6 }}>
          Built from the architecture that took T-Mobile's Orion platform from monthly to weekly
          releases — with 5 independent teams deploying without conflicts.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['React 18', 'TypeScript', 'Module Federation', 'Redux', 'GitHub Actions'].map(tag => (
            <span key={tag} style={{
              background: 'rgba(255,255,255,0.2)', borderRadius: '20px',
              padding: '4px 12px', fontSize: '13px', fontWeight: 500
            }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {cards.map(card => (
          <div key={card.title} style={{
            background: 'var(--card-bg)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '24px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{card.icon}</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>{card.title}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{card.desc}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'var(--card-bg)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '24px'
      }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '16px' }}>
          Architecture Diagram
        </div>
        <pre style={{
          fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.8',
          fontFamily: 'monospace', margin: 0, overflowX: 'auto'
        }}>{`Shell (this app)                    CDN
─────────────────────────────       ─────────────────────────
  Module Federation Host      ──▶   Dashboard MFE
  Shared Redux Store          ──▶   Analytics MFE
  Auth + Routing                    (independently deployed)
  Error Boundaries per MFE

window.__MFE_CONFIG__ = {
  dashboard: 'https://cdn.example.com/dashboard/remoteEntry.js',
  analytics: 'https://cdn.example.com/analytics/remoteEntry.js',
}`}</pre>
      </div>
    </div>
  );
};

// ── Main App ──────────────────────────────────────────────────────
type Page = 'home' | 'dashboard' | 'analytics';

export default function App() {
  const [page, setPage] = React.useState<Page>('home');
  const [dark, setDark] = React.useState(true);

  const theme = {
    '--bg': dark ? '#0f1117' : '#f8fafc',
    '--card-bg': dark ? '#1a1d27' : '#ffffff',
    '--border': dark ? '#2a2d3a' : '#e2e8f0',
    '--text': dark ? '#f1f5f9' : '#0f172a',
    '--text-secondary': dark ? '#94a3b8' : '#475569',
    '--text-muted': dark ? '#64748b' : '#94a3b8',
    '--accent': '#3b82f6',
    '--accent-subtle': dark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.08)',
    '--nav-bg': dark ? '#13151f' : '#ffffff',
  } as React.CSSProperties;

  const navLinks: { id: Page; label: string; icon: string }[] = [
    { id: 'home', label: 'Architecture', icon: '🏠' },
    { id: 'dashboard', label: 'Dashboard MFE', icon: '📊' },
    { id: 'analytics', label: 'Analytics MFE', icon: '📈' },
  ];

  return (
    <div style={{ ...theme, minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        a { color: var(--accent); text-decoration: none; }
      `}</style>

      {/* Nav */}
      <nav style={{
        background: 'var(--nav-bg)', borderBottom: '1px solid var(--border)',
        padding: '0 24px', display: 'flex', alignItems: 'center',
        height: '60px', position: 'sticky', top: 0, zIndex: 100,
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginRight: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--accent)' }}>⚡</span> MFE Shell
          <span style={{
            fontSize: '11px', background: 'var(--accent-subtle)', color: 'var(--accent)',
            border: '1px solid var(--accent)', borderRadius: '4px', padding: '2px 6px', fontWeight: 500
          }}>DEMO</span>
        </div>

        <div style={{ display: 'flex', gap: '4px', marginRight: '16px' }}>
          {navLinks.map(link => (
            <button key={link.id} onClick={() => setPage(link.id)} style={{
              background: page === link.id ? 'var(--accent-subtle)' : 'transparent',
              border: page === link.id ? '1px solid var(--accent)' : '1px solid transparent',
              color: page === link.id ? 'var(--accent)' : 'var(--text-secondary)',
              borderRadius: '6px', padding: '6px 14px', cursor: 'pointer',
              fontSize: '13px', fontWeight: page === link.id ? 600 : 400,
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              {link.icon} {link.label}
            </button>
          ))}
        </div>

        <button onClick={() => setDark(!dark)} style={{
          background: 'var(--card-bg)', border: '1px solid var(--border)',
          borderRadius: '6px', padding: '6px 10px', cursor: 'pointer',
          fontSize: '16px', color: 'var(--text)'
        }}>{dark ? '☀️' : '🌙'}</button>
      </nav>

      {/* Main */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {page === 'home' && <HomePage />}
        {page === 'dashboard' && (
          <MFEErrorBoundary name="Dashboard">
            <Suspense fallback={<MFELoader name="Dashboard" />}>
              <MFEOfflinePlaceholder name="Dashboard" />
            </Suspense>
          </MFEErrorBoundary>
        )}
        {page === 'analytics' && (
          <MFEErrorBoundary name="Analytics">
            <Suspense fallback={<MFELoader name="Analytics" />}>
              <MFEOfflinePlaceholder name="Analytics" />
            </Suspense>
          </MFEErrorBoundary>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '20px 24px',
        textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)'
      }}>
        Built by{' '}
        <a href="https://linkedin.com/in/pradeep-kumar-dharmavarapu" target="_blank" rel="noreferrer">
          Pradeep Kumar Dharmavarapu
        </a>
        {' '}·{' '}
        <a href="https://github.com/pradeep-dharmavarapu/react-microfrontend-boilerplate" target="_blank" rel="noreferrer">
          View on GitHub
        </a>
      </footer>
    </div>
  );
}
