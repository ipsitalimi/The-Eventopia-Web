import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

export default {
	appDirectory: './src/app',
	ssr: true,
	// Do not prerender: the Node Hono adapter calls serve() in production,
	// which hangs the build when the server entry is evaluated for prerender.
	presets: [vercelPreset()],
} satisfies Config;
