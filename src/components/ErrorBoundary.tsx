'use client';

import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary component to catch and handle React errors gracefully
 * Prevents the entire app from crashing when a component throws an error
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
    
    // TODO: Send to error reporting service (e.g., Sentry)
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-12 w-12 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Coś poszło nie tak
            </h2>
            <p className="text-slate-400 mb-6">
              Przepraszamy, wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-slate-800 rounded-lg text-left">
                <p className="text-xs text-red-400 font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                }}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Spróbuj ponownie
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Wróć do strony głównej
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Simple error fallback component for specific sections
 */
export function ErrorFallback({ error, resetError }: { error?: Error; resetError?: () => void }) {
  return (
    <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
      <div className="flex items-start gap-3">
        <svg
          className="h-6 w-6 text-red-500 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-1">Wystąpił błąd</h3>
          <p className="text-slate-400 text-sm mb-3">
            Nie udało się załadować tej sekcji.
          </p>
          {error && process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-red-400 font-mono mb-3 p-2 bg-slate-900 rounded">
              {error.message}
            </p>
          )}
          {resetError && (
            <button
              onClick={resetError}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Spróbuj ponownie
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
