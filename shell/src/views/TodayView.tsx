import { habits, tasks } from '../data/commandCenter';
import { MetricTile } from '../components/MetricTile';
import { TaskRow } from '../components/TaskRow';

export function TodayView() {
  return (
    <>
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Personal Command Center</p>
          <h1>Your day, distilled into one premium control surface.</h1>
          <p>
            A microfrontend shell with a custom app feel: intelligent widgets, personal
            themes, remote-ready modules, and command-first navigation.
          </p>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring one" />
          <div className="orbit-ring two" />
          <div className="orbit-core">
            <strong>91</strong>
            <span>readiness</span>
          </div>
        </div>
      </section>

      <section className="metric-grid">
        <MetricTile label="Focus score" value="91" delta="+12 from last week" />
        <MetricTile label="Protected time" value="4.8h" delta="2 sprints booked" />
        <MetricTile label="Signal ratio" value="73%" delta="noise down 18%" />
        <MetricTile label="Flow streak" value="11d" delta="best this quarter" />
      </section>

      <section className="dashboard-grid">
        <article className="panel span-7">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Priority stack</p>
              <h2>What deserves attention</h2>
            </div>
            <button className="ghost-button">Tune</button>
          </div>
          <div className="task-list">
            {tasks.map((task) => (
              <TaskRow key={task.label} {...task} />
            ))}
          </div>
        </article>

        <article className="panel focus-card span-5">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Focus engine</p>
              <h2>45 min sprint</h2>
            </div>
            <button className="primary-button">Start</button>
          </div>
          <div className="focus-dial">
            <strong>32</strong>
            <span>mins clear</span>
          </div>
          <div className="focus-settings">
            <span>Slack muted</span>
            <span>Calendar guarded</span>
            <span>Analytics live</span>
          </div>
        </article>

        <article className="panel span-5">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Habit heatmap</p>
              <h2>Energy rhythm</h2>
            </div>
          </div>
          <div className="heatmap">
            {habits.map((value, index) => (
              <span key={`${value}-${index}`} style={{ opacity: 0.25 + value / 140 }} />
            ))}
          </div>
        </article>

        <article className="panel span-7">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Micro app feed</p>
              <h2>Live orchestration</h2>
            </div>
            <button className="ghost-button">View all</button>
          </div>
          <div className="timeline">
            <p><b>08:45</b> Focus MFE reserved a 90 minute protected block.</p>
            <p><b>09:20</b> Insights MFE found a dip after context-heavy meetings.</p>
            <p><b>10:05</b> Profile MFE applied your weekday compact layout.</p>
          </div>
        </article>
      </section>
    </>
  );
}
