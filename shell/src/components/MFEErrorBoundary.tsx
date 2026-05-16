import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RemoteFallback } from './RemoteFallback';

type ErrorBoundaryState = {
  hasError: boolean;
};

export class MFEErrorBoundary extends Component<{ name: string; children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(`[MFE Shell] ${this.props.name} failed to load:`, error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <RemoteFallback name={this.props.name} />;
    }

    return this.props.children;
  }
}
