import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global error listener to catch non-React errors (like script loading issues)
window.addEventListener('error', (event) => {
  const root = document.getElementById('root');
  if (root) {
    // Only overwrite if the app hasn't mounted significantly
    if (root.innerHTML === '') {
       document.body.innerHTML = `
        <div style="background-color: #0f172a; color: #ef4444; height: 100vh; padding: 20px; font-family: monospace; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">Startup Error</h1>
          <p style="color: #cbd5e1; margin-bottom: 2rem;">The application failed to start.</p>
          <pre style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 8px; max-width: 800px; overflow: auto; border: 1px solid #334155;">${event.message}</pre>
        </div>
      `;
    }
  }
});

// Error Boundary Component to catch React rendering errors
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