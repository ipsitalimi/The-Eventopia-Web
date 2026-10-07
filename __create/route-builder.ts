import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

const API_BASENAME = '/api';
const api = new Hono();

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

/**
 * Bundle all API route modules at build time.
 * This replaces filesystem scanning, which breaks in production
 * (build/server has no src/app/api directory on disk / Vercel).
 */
const routeModules = import.meta.glob('../src/app/api/**/route.js', {
  eager: true,
}) as Record<string, Record<string, unknown>>;

function getHonoPath(routeFile: string): { name: string; pattern: string }[] {
  // Normalize Vite glob keys like "../src/app/api/planner/route.js"
  const marker = '/api/';
  const idx = routeFile.lastIndexOf(marker);
  const relativePath =
    idx >= 0 ? routeFile.slice(idx + marker.length) : routeFile;
  const parts = relativePath.split('/').filter(Boolean);
  const routeParts = parts.slice(0, -1); // Remove 'route.js'
  if (routeParts.length === 0) {
    return [{ name: 'root', pattern: '' }];
  }
  return routeParts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [, dots, param] = match;
      return dots === '...'
        ? { name: param, pattern: `:${param}{.+}` }
        : { name: param, pattern: `:${param}` };
    }
    return { name: segment, pattern: segment };
  });
}

function registerRoutes() {
  const routeFiles = Object.keys(routeModules)
    .slice()
    .sort((a, b) => b.length - a.length);

  // Clear existing routes before re-registering
  api.routes = [];

  for (const routeFile of routeFiles) {
    const route = routeModules[routeFile];
    if (!route) continue;

    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;
    for (const method of methods) {
      const methodHandler = route[method];
      if (typeof methodHandler !== 'function') continue;

      const parts = getHonoPath(routeFile);
      const honoPath = `/${parts.map(({ pattern }) => pattern).join('/')}`;
      const handler: Handler = async (c) => {
        const params = c.req.param();
        return await methodHandler(c.req.raw, { params });
      };

      switch (method.toLowerCase()) {
        case 'get':
          api.get(honoPath, handler);
          break;
        case 'post':
          api.post(honoPath, handler);
          break;
        case 'put':
          api.put(honoPath, handler);
          break;
        case 'delete':
          api.delete(honoPath, handler);
          break;
        case 'patch':
          api.patch(honoPath, handler);
          break;
        default:
          break;
      }
    }
  }
}

registerRoutes();

// Hot reload routes in development when API files change
if (import.meta.env.DEV && import.meta.hot) {
  import.meta.hot.accept(() => {
    registerRoutes();
  });
}

export { api, API_BASENAME };
