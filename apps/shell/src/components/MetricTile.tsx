export function MetricTile({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <article className="metric-tile">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{delta}</small>
    </article>
  );
}
