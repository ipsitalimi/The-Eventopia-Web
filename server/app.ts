import { createRequestHandler } from 'react-router';
import { createApp } from '../__create/create-app';

// Virtual module provided by React Router at build time
// @ts-expect-error - resolved by @react-router/dev during SSR build
import * as build from 'virtual:react-router/server-build';

/**
 * Vercel-compatible server entry.
 * Exports a Web Fetch handler (no Node listen/serve side effects).
 * Preserves the same Hono middleware + /api routes as the local server.
 */
const app = createApp();

const handler = createRequestHandler(build);

app.all('*', (c) => handler(c.req.raw));

export default app.fetch;
