import type React from 'react';

export type Page = 'today' | 'workspace' | 'insights';
export type Theme = 'noir' | 'ember' | 'glacier';
export type Density = 'calm' | 'compact';

export type NavItem = {
  id: Page;
  label: string;
  meta: string;
};

export type Command = {
  title: string;
  detail: string;
  key: string;
};

export type Task = {
  label: string;
  source: string;
  progress: number;
  tone: 'gold' | 'teal' | 'rose';
};

export type MicroApp = {
  name: string;
  owner: string;
  state: 'online' | 'standby';
  latency: string;
  desc: string;
};

export type ThemeTokens = Record<Theme, React.CSSProperties>;
