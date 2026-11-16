import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, 'dist');
const ssrDir = path.resolve(distDir, 'ssr');

// Load the SSR bundle produced by vite build --ssr
const ssrEntryPath = path.join(ssrDir, 'entry-server.js');

if (!fs.existsSync(ssrEntryPath)) {
  console.error('SSR bundle not found at', ssrEntryPath);
  console.error('Run: vite build --ssr src/entry-server.tsx --outDir dist/ssr first');
  process.exit(1);
}

const { render } = await import(pathToFileURL(ssrEntryPath).href);

// Read the browser-build template
const templatePath = path.join(distDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// Render /services
console.log('Pre-rendering /services...');
const { html: appHtml, helmet } = render('/services');

// Build the head tags from helmet
const headTags = [
  helmet.title?.toString() ?? '',
  helmet.meta?.toString() ?? '',
  helmet.link?.toString() ?? '',
  helmet.script?.toString() ?? '',
].join('\n  ');

// Replace the fallback title/description in the template with route-specific tags.
// Strategy: remove the existing <title> and homepage <meta name="description"> from
// the template, then inject the helmet tags right before </head>.
let page = template
  // Remove the static fallback title
  .replace(/<title>[^<]*<\/title>/, '')
  // Remove the static fallback meta description
  .replace(/<meta\s+name="description"[^>]*\/?>/, '')
  // Remove the hidden H1 that was added as an SEO workaround
  .replace(/<h1\s+style="position:absolute[^"]*">[^<]*<\/h1>/, '')
  // Inject helmet tags before </head>
  .replace('</head>', `  ${headTags}\n</head>`)
  // Inject rendered app HTML into the root div
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

// Write dist/services/index.html
const outDir = path.join(distDir, 'services');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), page, 'utf-8');

console.log('✓ dist/services/index.html written');
console.log('  Title:', helmet.title?.toString()?.replace(/<[^>]+>/g, '').trim());
console.log('  Canonical:', helmet.link?.toString()?.match(/href="([^"]+)"/)?.[1] ?? '(none)');
