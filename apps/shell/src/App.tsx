import React, { lazy, Suspense } from 'react';
import { Loader } from './components/Loader';
import { MFEErrorBoundary } from './components/MFEErrorBoundary';
import './styles/commandCenter.css';

const FocusRemote = lazy(() => import('focus/Module'));
const InsightsRemote = lazy(() => import('insights/Module'));

type SectionId = 'overview' | 'nx' | 'federation' | 'deployments' | 'remotes';

type GuideSection = {
  id: SectionId;
  label: string;
  kicker: string;
  title: string;
  body: string;
  bullets: string[];
  command?: string;
};

const sections: GuideSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    kicker: 'Why I built this',
    title: 'I wanted this to show real microfrontend architecture, not just a UI demo.',
    body:
      'This repo is my practical take on a React microfrontend boilerplate. I kept the UI simple so the main thing is clear: there is a shell, there are remote apps, and each part can be built and deployed on its own.',
    bullets: [
      'I use the shell for layout, navigation, remote composition, and fallback handling.',
      'Focus and Insights are separate remote apps, not just cards inside the shell.',
      'Each app has its own Nx target and its own dist output.',
      'The shell loads remotes at runtime through remoteEntry.js.',
    ],
  },
  {
    id: 'nx',
    label: 'Nx Monorepo',
    kicker: 'How I structured it',
    title: 'I used Nx so each app has a clear boundary.',
    body:
      'I moved the project into an apps/libs structure because that is easier to explain, scale, and review. Nx can see each app separately, cache builds, and run affected commands when only one area changes.',
    bullets: [
      'apps/shell is the host application on port 3000.',
      'apps/focus is a remote application on port 4201.',
      'apps/insights is a remote application on port 4202.',
      'libs/ui is where I keep shared copy/types used across MFEs.',
    ],
    command: 'npx nx show projects\nnpm run affected:build\nnpm run graph',
  },
  {
    id: 'federation',
    label: 'Module Federation',
    kicker: 'How the remotes load',
    title: 'The shell does not bundle every feature by default.',
    body:
      'The shell knows where each remoteEntry.js file lives. Focus and Insights expose a Module, and the shell lazy-loads those modules when you open the live remotes section.',
    bullets: [
      'focus exposes ./Module from apps/focus/src/RemoteApp.tsx.',
      'insights exposes ./Module from apps/insights/src/RemoteApp.tsx.',
      'The shell imports focus/Module and insights/Module at runtime.',
      'If a remote is down, the shell should still stay usable.',
    ],
    command:
      "remotes: {\n  focus: 'http://localhost:4201/assets/remoteEntry.js',\n  insights: 'http://localhost:4202/assets/remoteEntry.js'\n}",
  },
  {
    id: 'deployments',
    label: 'Deployments',
    kicker: 'How I would ship it',
    title: 'Each microfrontend has its own build output.',
    body:
      'The important thing for me is that the shell, Focus, and Insights do not have to ship as one big frontend. They produce separate artifacts, so they can go through separate deployment paths.',
    bullets: [
      'dist/apps/shell is the host deployment artifact.',
      'dist/apps/focus contains the Focus remoteEntry.js.',
      'dist/apps/insights contains the Insights remoteEntry.js.',
      'In CI, I can use nx affected -t build so untouched apps are not rebuilt unnecessarily.',
    ],
    command: 'npm run build:shell\nnpm run build:focus\nnpm run build:insights',
  },
  {
    id: 'remotes',
    label: 'Live Remotes',
    kicker: 'Check it yourself',
    title: 'These cards come from the remote apps.',
    body:
      'This section is here so the demo is not only documentation. The cards below are loaded from Focus and Insights through Module Federation.',
    bullets: [
      'Stop a remote server and the shell should fall back instead of breaking the page.',
      'Change a remote app and rebuild only that app.',
      'The shell controls the page structure.',
      'The remote controls its own feature content.',
    ],
  },
];

const architectureNodes = [
  { title: 'Shell Host', meta: 'apps/shell · port 3000', tone: 'host' },
  { title: 'Focus Remote', meta: 'apps/focus · port 4201', tone: 'remote' },
  { title: 'Insights Remote', meta: 'apps/insights · port 4202', tone: 'remote' },
  { title: 'Shared UI Lib', meta: 'libs/ui · workspace library', tone: 'lib' },
];

export default function App() {
  const [activeId, setActiveId] = React.useState<SectionId>('overview');
  const activeSection = sections.find((section) => section.id === activeId) ?? sections[0];

  return (
    <main className="doc-shell">
      <aside className="doc-sidebar">
        <div className="brand">
          <span>PC</span>
          <div>
            <strong>Pulse Command</strong>
            <small>Nx Module Federation Boilerplate</small>
          </div>
        </div>

        <nav aria-label="Architecture guide">
          {sections.map((section) => (
            <button
              key={section.id}
              className={activeId === section.id ? 'active' : ''}
              onClick={() => setActiveId(section.id)}
            >
              <span>{section.label}</span>
              <small>{section.kicker}</small>
            </button>
          ))}
        </nav>
      </aside>

      <section className="doc-content">
        <header className="article-hero">
          <p>Microfrontend Boilerplate</p>
          <h1>My React microfrontend boilerplate with Nx and Module Federation.</h1>
          <span>
            I built this as an interactive walkthrough. Click the sections to see how the
            workspace, federation config, remote loading, and deployment flow fit together.
          </span>
        </header>

        <section className="architecture-map" aria-label="Architecture diagram">
          {architectureNodes.map((node, index) => (
            <React.Fragment key={node.title}>
              <article className={`map-node ${node.tone}`}>
                <strong>{node.title}</strong>
                <small>{node.meta}</small>
              </article>
              {index < architectureNodes.length - 1 && <div className="map-line" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </section>

        <article className="guide-card">
          <div className="guide-kicker">{activeSection.kicker}</div>
          <h2>{activeSection.title}</h2>
          <p>{activeSection.body}</p>

          <div className="guide-grid">
            <div>
              <h3>What to notice</h3>
              <ul>
                {activeSection.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>

            <div className="command-panel">
              <h3>Command or config I want to highlight</h3>
              <pre>{activeSection.command ?? 'Open another section to see the command or config I used for that part.'}</pre>
            </div>
          </div>
        </article>

        {activeId === 'remotes' && (
          <section className="remote-proof">
            <MFEErrorBoundary name="Focus MFE">
              <Suspense fallback={<Loader name="Focus MFE" />}>
                <FocusRemote />
              </Suspense>
            </MFEErrorBoundary>

            <MFEErrorBoundary name="Insights MFE">
              <Suspense fallback={<Loader name="Insights MFE" />}>
                <InsightsRemote />
              </Suspense>
            </MFEErrorBoundary>
          </section>
        )}
      </section>
    </main>
  );
}
