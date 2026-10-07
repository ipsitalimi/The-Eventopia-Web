import { createHonoServer } from 'react-router-hono-server/node';
import { createApp } from './create-app';

/**
 * Local / Node production entry used by react-router-hono-server.
 * Starts a long-running Node HTTP server in production mode.
 */
const app = createApp();

export default await createHonoServer({
  app,
  defaultLogger: false,
});
