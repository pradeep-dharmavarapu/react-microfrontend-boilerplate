import type { Density, Theme } from '../types';

type CustomizerProps = {
  theme: Theme;
  density: Density;
  stealth: boolean;
  onThemeChange: (theme: Theme) => void;
  onDensityChange: (density: Density) => void;
  onStealthChange: (enabled: boolean) => void;
};

const themes: Theme[] = ['noir', 'ember', 'glacier'];
const densities: Density[] = ['calm', 'compact'];

export function Customizer({
  theme,
  density,
  stealth,
  onThemeChange,
  onDensityChange,
  onStealthChange,
}: CustomizerProps) {
  return (
    <aside className="customizer">
      <div className="profile-card">
        <div className="avatar">PD</div>
        <div>
          <strong>Builder mode</strong>
          <span>11 live widgets</span>
        </div>
      </div>

      <section>
        <p className="eyebrow">Theme system</p>
        <div className="swatches">
          {themes.map((item) => (
            <button
              key={item}
              className={`${item} ${theme === item ? 'selected' : ''}`}
              aria-label={`Use ${item} theme`}
              onClick={() => onThemeChange(item)}
            />
          ))}
        </div>
      </section>

      <section>
        <p className="eyebrow">Density</p>
        <div className="segmented">
          {densities.map((item) => (
            <button key={item} className={density === item ? 'active' : ''} onClick={() => onDensityChange(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section>
        <p className="eyebrow">Privacy layer</p>
        <label className="toggle-row">
          <span>Stealth numbers</span>
          <input type="checkbox" checked={stealth} onChange={(event) => onStealthChange(event.target.checked)} />
        </label>
      </section>

      <section className="mini-stack">
        <p className="eyebrow">Pinned remotes</p>
        <span>Focus MFE</span>
        <span>Insights MFE</span>
        <span>Profile MFE</span>
      </section>
    </aside>
  );
}
