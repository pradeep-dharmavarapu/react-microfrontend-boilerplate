export function Loader({ name }: { name: string }) {
  return (
    <div className="loader" aria-label={`Loading ${name}`}>
      <span />
      Loading {name}
    </div>
  );
}
