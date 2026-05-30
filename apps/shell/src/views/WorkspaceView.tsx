import { lazy, Suspense } from 'react';
import { deploymentCopy } from '../../../../libs/ui/src';
import { Loader } from '../components/Loader';
import { MFEErrorBoundary } from '../components/MFEErrorBoundary';
import { microApps } from '../data/commandCenter';

const FocusRemote = lazy(() => import('focus/Module'));
const InsightsRemote = lazy(() => import('insights/Module'));

const runtimeRemotes = [
  { name: 'Focus MFE', port: 4201, scope: 'focus', Component: FocusRemote },
  { name: 'Insights MFE', port: 4202, scope: 'insights', Component: InsightsRemote },
];

export function WorkspaceView() {
  return (
    <section className="panel workspace-panel">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Federated workspace</p>
          <h2>Remote apps that feel native</h2>
        </div>
        <button className="primary-button">Add MFE</button>
      </div>
      <div className="remote-grid">
        {microApps.map((app) => (
          <article key={app.name} className="remote-card">
            <div className="remote-card-top">
              <span className={`status-dot ${app.state}`} />
              <small>{deploymentCopy.remote}</small>
            </div>
            <h3>{app.name}</h3>
            <p>{app.desc}</p>
            <div>
              <span>{app.owner}</span>
              <button>Open</button>
            </div>
          </article>
        ))}
      </div>

      <div className="federation-status">
        <span>{deploymentCopy.host}</span>
        <strong>Shell composes remotes at runtime. Each remote has its own Nx target, port, build output, and deployment path.</strong>
      </div>

      <div className="remote-runtime-grid">
        {runtimeRemotes.map(({ name, port, scope, Component }) => (
          <article className="remote-runtime-card" key={name}>
            <div className="remote-card-top">
              <span className="status-dot online" />
              <small>{scope}@localhost:{port}</small>
            </div>
            <MFEErrorBoundary name={name}>
              <Suspense fallback={<Loader name={name} />}>
                <Component />
              </Suspense>
            </MFEErrorBoundary>
          </article>
        ))}
      </div>
    </section>
  );
}
