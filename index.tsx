import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global error listener
window.addEventListener('error', (event) => {
  showError('Runtime Error', event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  showError('Unhandled Promise Rejection', event.reason?.toString() || 'Unknown error');
});

// Helper to show error on screen
function showError(title: string, message: string) {
  const root = document.getElementById('root');
  if (root && root.innerHTML === '') {
     document.body.innerHTML = `
      <div style="background-color: #0f172a; color: #ef4444; height: 100vh; padding: 20px; font-family: monospace; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">${title}</h1>
        <p style="color: #cbd5e1; margin-bottom: 2rem;">The application failed to start.</p>
        <pre style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 8px; max-width: 800px; overflow: auto; border: 1px solid #334155; white-space: pre-wrap;">${message}</pre>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #ea580c; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Reload</button>
      </div>
    `;
  }
}

// Failsafe: If app doesn't mount within 3 seconds, show error
setTimeout(() => {
  const root = document.getElementById('root');
  if (root && root.innerHTML === '') {
    showError('Startup Timeout', 'The application took too long to render. This may be due to a silent crash or network issue.');
  }
}, 3000);

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-8 max-w-2xl w-full shadow-2xl">
            <h2 className="text-3xl font-black text-red-500 mb-2 uppercase italic">Critical Error</h2>
            <p className="text-slate-400 mb-6">Something went wrong while rendering the application.</p>
            
            <div className="bg-slate-950 p-6 rounded-xl overflow-auto mb-8 border border-slate-800">
              <code className="text-red-400 text-sm font-mono whitespace-pre-wrap break-words">
                {this.state.error?.toString()}
              </code>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-lg transition-colors uppercase tracking-wider"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);