import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const site = path.join(root, 'dist-wiki');
const checks = [
  ['organization fair value', '/wiki/organization-fair-value/'],
  ['share pool', '/wiki/shares-and-share-pool/'],
  ['dilution', '/wiki/follow-on-funding-and-dilution/'],
  ['loans', '/wiki/loans-and-credit-book/'],
  ['credit rating', '/wiki/credit-ratings/'],
  ['SPUs', '/wiki/rare-metals-and-spus/'],
  ['directives', '/wiki/directives/'],
  ['cannot colonize', '/wiki/troubleshooting-colonization/'],
  ['Solis Battery', '/wiki/solis-battery/'],
  ['shield integrity', '/wiki/shield-integrity/'],
  ['fleet power', '/wiki/fleet-power/'],
  ['3200 power', '/wiki/fleet-power/'],
  ['Noctmarks', '/wiki/noctium-and-noctmarks/'],
  ['Astraean', '/wiki/astraean/'],
  ['Varkon', '/wiki/varkon/'],
  ['Veil', '/wiki/veil/'],
  ['cheese', '/strategy/advanced-tactics-and-edge-cases/']
];

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const file = path.join(site, pathname.replace(/^\/+/, ''));
  if (!file.startsWith(site) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404).end();
    return;
  }
  response.setHeader('Content-Type', file.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream');
  fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
try {
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  const pagefind = await import(pathToFileURL(path.join(site, 'pagefind', 'pagefind.js')).href);
  await pagefind.options({ basePath: `http://127.0.0.1:${port}/pagefind/` });
  await pagefind.init();
  for (const [query, expectedPath] of checks) {
    const response = await pagefind.search(query);
    const results = await Promise.all(response.results.slice(0, 20).map((result) => result.data()));
    if (!results.some((result) => new URL(result.url).pathname === expectedPath)) {
      throw new Error(`Pagefind query "${query}" did not return ${expectedPath}.`);
    }
  }
  console.log(`Pagefind query verification passed: ${checks.length} task and terminology searches.`);
} finally {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}
