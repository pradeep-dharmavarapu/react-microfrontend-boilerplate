import { deploymentCopy } from '../../../libs/ui/src';
import './remote.css';

export default function FocusRemote() {
  return (
    <section className="remote-module focus-remote">
      <div className="remote-module-header">
        <span>{deploymentCopy.remote}</span>
        <strong>Focus MFE</strong>
      </div>
      <div className="remote-module-grid">
        <article>
          <small>Protected time</small>
          <b>4.8h</b>
        </article>
        <article>
          <small>Next sprint</small>
          <b>11:30</b>
        </article>
      </div>
      <p>This remote represents a feature team owning focus-related workflows like tasks, calendar protection, and work sessions.</p>
    </section>
  );
}
