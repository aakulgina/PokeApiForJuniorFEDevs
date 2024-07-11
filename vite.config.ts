import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [react()],
	root: path.resolve(__dirname),
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src'),
			utils: path.resolve(__dirname, 'src/shared/utils'),
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'esnext',
		}
	},
	build: {
		target: 'esnext',
		outDir: 'build',
	}
});
