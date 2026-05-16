import React from 'react';
import { CommandPalette } from './components/CommandPalette';
import { Customizer } from './components/Customizer';
import { SideNav } from './components/SideNav';
import { Topbar } from './components/Topbar';
import { themeTokens } from './data/commandCenter';
import './styles/commandCenter.css';
import type { Density, Page, Theme } from './types';
import { InsightsView } from './views/InsightsView';
import { TodayView } from './views/TodayView';
import { WorkspaceView } from './views/WorkspaceView';

export default function App() {
  const [page, setPage] = React.useState<Page>('today');
  const [theme, setTheme] = React.useState<Theme>('noir');
  const [density, setDensity] = React.useState<Density>('calm');
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [stealth, setStealth] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }

      if (event.key === 'Escape') {
        setPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const style = {
    ...themeTokens[theme],
    '--density': density === 'compact' ? '10px' : '16px',
  } as React.CSSProperties;

  return (
    <div className={`app-shell ${density} ${stealth ? 'stealth' : ''}`} style={style}>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <SideNav activePage={page} onPageChange={setPage} onCommandOpen={() => setPaletteOpen(true)} />

      <main className="main-stage">
        <Topbar />
        {page === 'today' && <TodayView />}
        {page === 'workspace' && <WorkspaceView />}
        {page === 'insights' && <InsightsView />}
      </main>

      <Customizer
        theme={theme}
        density={density}
        stealth={stealth}
        onThemeChange={setTheme}
        onDensityChange={setDensity}
        onStealthChange={setStealth}
      />
    </div>
  );
}
