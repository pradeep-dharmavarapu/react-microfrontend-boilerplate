import type { Task } from '../types';

export function TaskRow({ label, source, progress, tone }: Task) {
  return (
    <div className="task-row">
      <div className={`task-orb ${tone}`} />
      <div className="task-copy">
        <strong>{label}</strong>
        <span>{source}</span>
      </div>
      <div className="progress-track" aria-label={`${label} ${progress}% complete`}>
        <i style={{ width: `${progress}%` }} />
      </div>
      <b>{progress}%</b>
    </div>
  );
}
