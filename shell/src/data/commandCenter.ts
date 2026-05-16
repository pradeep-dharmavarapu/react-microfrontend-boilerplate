import type React from 'react';
import type { Command, MicroApp, NavItem, Task, ThemeTokens } from '../types';

export const themeTokens: ThemeTokens = {
  noir: {
    '--bg': '#08090c',
    '--panel': '#111319',
    '--panel-strong': '#171a22',
    '--panel-soft': 'rgba(255,255,255,0.055)',
    '--line': 'rgba(255,255,255,0.11)',
    '--line-strong': 'rgba(255,255,255,0.2)',
    '--text': '#f4f1ea',
    '--muted': '#9ea3ad',
    '--faint': '#666d7b',
    '--accent': '#e8c270',
    '--accent-2': '#60d5c8',
    '--accent-3': '#ff6b7a',
    '--shadow': '0 28px 80px rgba(0,0,0,0.45)',
  } as React.CSSProperties,
  ember: {
    '--bg': '#120d0b',
    '--panel': '#1d1713',
    '--panel-strong': '#261d18',
    '--panel-soft': 'rgba(255,255,255,0.06)',
    '--line': 'rgba(255,255,255,0.12)',
    '--line-strong': 'rgba(255,255,255,0.22)',
    '--text': '#fff5ea',
    '--muted': '#b8a69a',
    '--faint': '#7e6a60',
    '--accent': '#ffb04f',
    '--accent-2': '#e95f4f',
    '--accent-3': '#80d8bd',
    '--shadow': '0 28px 80px rgba(35,14,6,0.5)',
  } as React.CSSProperties,
  glacier: {
    '--bg': '#091114',
    '--panel': '#10191d',
    '--panel-strong': '#152329',
    '--panel-soft': 'rgba(255,255,255,0.055)',
    '--line': 'rgba(214,244,255,0.13)',
    '--line-strong': 'rgba(214,244,255,0.24)',
    '--text': '#ecfbff',
    '--muted': '#9db5bd',
    '--faint': '#66808a',
    '--accent': '#7ce7ff',
    '--accent-2': '#b5ff78',
    '--accent-3': '#f6a6ff',
    '--shadow': '0 28px 80px rgba(0,28,38,0.52)',
  } as React.CSSProperties,
};

export const navItems: NavItem[] = [
  { id: 'today', label: 'Today', meta: 'Live cockpit' },
  { id: 'workspace', label: 'Workspace', meta: 'Micro apps' },
  { id: 'insights', label: 'Insights', meta: 'Patterns' },
];

export const commands: Command[] = [
  { title: 'Start deep work sprint', detail: 'Mute low-signal widgets for 45 minutes', key: 'D' },
  { title: 'Rebalance dashboard', detail: 'Bring critical cards above the fold', key: 'R' },
  { title: 'Open analytics MFE', detail: 'Launch the remote insight surface', key: 'A' },
  { title: 'Switch profile theme', detail: 'Apply a saved personal look', key: 'T' },
];

export const tasks: Task[] = [
  { label: 'Finalize launch checklist', source: 'Work OS', progress: 78, tone: 'gold' },
  { label: 'Review product metrics', source: 'Insights MFE', progress: 54, tone: 'teal' },
  { label: 'Plan investor update', source: 'Notes MFE', progress: 34, tone: 'rose' },
];

export const microApps: MicroApp[] = [
  { name: 'Focus MFE', owner: 'Personal ops', state: 'online', latency: '42ms', desc: 'Tasks, calendar, rituals, and sprint controls.' },
  { name: 'Insights MFE', owner: 'Analytics', state: 'standby', latency: '88ms', desc: 'Habits, spend, energy, and workflow intelligence.' },
  { name: 'Profile MFE', owner: 'Identity', state: 'online', latency: '37ms', desc: 'Theme, shortcuts, widgets, permissions, and persona.' },
];

export const habits = [72, 42, 88, 64, 90, 56, 82, 48, 76, 92, 38, 68, 84, 52, 96, 62, 74, 46, 86, 58, 80];
