import React from 'react';

export const MFELoader: React.FC<{ name: string; error?: boolean }> = ({ name, error }) => (
  <div style={{ padding: 20, textAlign: 'center' }}>
    {error ? <div>{name} failed to load.</div> : <div>Loading {name}...</div>}
  </div>
);
