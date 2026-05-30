import { deploymentCopy } from '../../../libs/ui/src';
import './remote.css';

export default function InsightsRemote() {
  return (
    <section className="remote-module insights-remote">
      <div className="remote-module-header">
        <span>{deploymentCopy.remote}</span>
        <strong>Insights MFE</strong>
      </div>
      <div className="signal-bars" aria-label="Weekly signal quality">
        {[42, 68, 58, 88, 74, 51].map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
      <p>This remote represents a separate team owning analytics, patterns, recommendations, and signal scoring.</p>
    </section>
  );
}
