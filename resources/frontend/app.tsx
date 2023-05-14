import { createInertiaApp } from '@inertiajs/react';
import 'flowbite';
import { createRoot } from 'react-dom/client';
import './styles/app.css';

export function resolvePageComponent(name: string, pages: any[]) {
  for (const path in pages) {
    if (path.endsWith(`${name?.replace('.', '/')}.tsx`)) {
      return typeof pages[path] === 'function' ? pages[path]() : pages[path];
    }
  }

  throw new Error(`Page not found: ${name}`);
}

createInertiaApp({
  resolve: name => {
    return resolvePageComponent(name, (import.meta as any).glob('./Pages/**/*.tsx'));
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
