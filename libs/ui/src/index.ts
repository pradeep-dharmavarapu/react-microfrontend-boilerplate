export type MfeStatus = 'host' | 'remote' | 'fallback';

export const deploymentCopy: Record<MfeStatus, string> = {
  host: 'Host shell',
  remote: 'Independently deployable remote',
  fallback: 'Resilient fallback',
};
