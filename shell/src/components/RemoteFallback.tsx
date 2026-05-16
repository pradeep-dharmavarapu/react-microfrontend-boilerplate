export function RemoteFallback({ name }: { name: string }) {
  return (
    <section className="remote-fallback">
      <div className="remote-mark">MF</div>
      <div>
        <p className="eyebrow">Remote surface</p>
        <h2>{name}</h2>
        <p>
          This slot is ready for an independently deployed micro frontend. The shell keeps
          the experience polished even when a remote is offline or still being built.
        </p>
      </div>
      <code>{name.toLowerCase()}Remote: https://cdn.example.com/{name.toLowerCase()}/remoteEntry.js</code>
    </section>
  );
}
