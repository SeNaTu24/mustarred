import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from 'wouter';
import App from './App';

export function render(path: string): { html: string; helmet: any } {
  const helmetContext: { helmet?: any } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <Router ssrPath={path}>
        <App />
      </Router>
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet ?? {} };
}
