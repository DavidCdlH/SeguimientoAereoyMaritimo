import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App.tsx';
import { Toaster } from '../components/ui/sonner';
import '../styles/globals.css';

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4 text-foreground">
              Sistema de Seguimiento de Vehículos
            </h1>
            <p className="text-muted-foreground mb-4">
              Ha ocurrido un error inesperado. Por favor, recargue la página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize React app
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se pudo encontrar el elemento root en el DOM');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        closeButton
        richColors
        expand={true}
        duration={4000}
      />
    </ErrorBoundary>
  </React.StrictMode>
);

// Service worker registration (optional)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registrado: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW falló al registrarse: ', registrationError);
      });
  });
}