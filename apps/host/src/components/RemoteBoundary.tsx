import { Component, type ReactNode } from "react";

interface Props {
  name: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class RemoteBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error(
      `[RemoteBoundary:${this.props.name}] message:`,
      error.message,
    );
    console.error(`[RemoteBoundary:${this.props.name}] stack:`, error.stack);
    console.error(`[RemoteBoundary:${this.props.name}] full error:`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <strong>Remote &quot;{this.props.name}&quot; indisponível.</strong>
          <p className="mt-1 text-xs">{this.state.error?.message}</p>
          {import.meta.env.DEV && this.state.error?.stack && (
            <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap text-xs opacity-70">
              {this.state.error.stack}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
