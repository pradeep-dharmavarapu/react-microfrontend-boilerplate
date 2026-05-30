import { navItems } from '../data/commandCenter';
import type { Page } from '../types';

type SideNavProps = {
  activePage: Page;
  onPageChange: (page: Page) => void;
  onCommandOpen: () => void;
};

export function SideNav({ activePage, onPageChange, onCommandOpen }: SideNavProps) {
  return (
    <aside className="side-nav">
      <div className="brand-lockup">
        <div className="brand-mark">PC</div>
        <div>
          <strong>Pulse Command</strong>
          <span>Personal OS</span>
        </div>
      </div>

      <nav aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item.id} className={activePage === item.id ? 'active' : ''} onClick={() => onPageChange(item.id)}>
            <span>{item.label}</span>
            <small>{item.meta}</small>
          </button>
        ))}
      </nav>

      <button className="command-trigger" onClick={onCommandOpen}>
        <span>Command Center</span>
        <kbd>Ctrl K</kbd>
      </button>
    </aside>
  );
}
