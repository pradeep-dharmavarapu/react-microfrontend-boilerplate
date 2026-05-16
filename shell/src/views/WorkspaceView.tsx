import { Suspense } from 'react';
import { Loader } from '../components/Loader';
import { MFEErrorBoundary } from '../components/MFEErrorBoundary';
import { RemoteFallback } from '../components/RemoteFallback';
import { microApps } from '../data/commandCenter';

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
              <small>{app.latency}</small>
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
      <MFEErrorBoundary name="Insights">
        <Suspense fallback={<Loader name="Insights" />}>
          <RemoteFallback name="Insights" />
        </Suspense>
      </MFEErrorBoundary>
    </section>
  );
}
