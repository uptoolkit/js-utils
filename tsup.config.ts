import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'], // Entry point(s)
    format: ['esm', 'cjs'], // Output both ESM and CJS formats
    dts: true,              // Generate TypeScript declaration files (.d.ts)
    sourcemap: true,        // Include source maps for debugging
    clean: true,            // Clean output directory before building
    splitting: true,        // Enable code splitting for better tree shaking
    minify: false,          // Disable minification (enable if needed)
    external: ['react']     // Mark dependencies like 'react' as external
});
