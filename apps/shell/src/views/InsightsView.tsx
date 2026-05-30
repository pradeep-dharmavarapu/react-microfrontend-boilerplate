export function InsightsView() {
  return (
    <section className="dashboard-grid">
      <article className="panel span-6 insight-card">
        <p className="eyebrow">Behavior intelligence</p>
        <h2>You do your best strategic work before 11:30.</h2>
        <p>Move deep work earlier and batch admin after lunch to recover an estimated 3.2 focused hours each week.</p>
      </article>
      <article className="panel span-6 chart-card">
        <div className="bar-chart" aria-label="Weekly focus distribution">
          {[52, 74, 61, 86, 68, 44, 72].map((value, index) => (
            <span key={index} style={{ height: `${value}%` }} />
          ))}
        </div>
      </article>
      <article className="panel span-12">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Suggested automations</p>
            <h2>Personal rules worth enabling</h2>
          </div>
        </div>
        <div className="automation-list">
          <button>Auto-pin critical tasks when readiness drops below 65</button>
          <button>Switch to compact density during working hours</button>
          <button>Surface notes linked to the next calendar event</button>
        </div>
      </article>
    </section>
  );
}
