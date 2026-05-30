import { commands } from '../data/commandCenter';

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  if (!open) return null;

  return (
    <div className="palette-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="command-palette" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <div className="palette-search">
          <span>CMD</span>
          <input autoFocus placeholder="Search commands, widgets, remotes..." />
          <kbd>Esc</kbd>
        </div>
        <div className="command-list">
          {commands.map((command) => (
            <button key={command.title}>
              <span>
                <strong>{command.title}</strong>
                <small>{command.detail}</small>
              </span>
              <kbd>{command.key}</kbd>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
