import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../extension/', import.meta.url);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  }));
  return nested.flat();
}

test('manifesto restringe rede e permissões ao necessário', async () => {
  const manifest = JSON.parse(await readFile(new URL('manifest.json', root), 'utf8'));
  assert.deepEqual(manifest.permissions, ['sidePanel']);
  assert.deepEqual(manifest.host_permissions, ['https://viacep.com.br/*']);
  assert.match(manifest.content_security_policy.extension_pages, /connect-src https:\/\/viacep\.com\.br/);
  assert.equal('content_scripts' in manifest, false);
  assert.equal(manifest.action.default_icon['128'], 'icons/chemical-process.png');
});

test('pacote não referencia outros recursos HTTP externos', async () => {
  const files = (await walk(fileURLToPath(root))).filter((file) => /\.(?:js|json|html|css)$/.test(file));
  const urls = [];
  for (const file of files) {
    const content = await readFile(file, 'utf8');
    urls.push(...content.matchAll(/https?:\/\/[^'"\s<;]+/g));
  }
  for (const match of urls) assert.match(match[0], /^https:\/\/viacep\.com\.br(?:\/|$)/);
});

test('interface contém seções, campos novos e ações de regeneração', async () => {
  const html = await readFile(new URL('sidepanel.html', root), 'utf8');
  const script = await readFile(new URL('sidepanel.js', root), 'utf8');
  for (const section of ['policy', 'insured', 'address', 'vehicle', 'claim']) {
    assert.match(html, new RegExp(`data-section="${section}"`));
    assert.match(html, new RegExp(`data-refresh="${section}"`));
  }
  assert.match(script, /Referencia/);
  assert.match(script, /RelatoDano/);
  assert.match(script, /navigator\.clipboard\.writeText/);
  assert.doesNotMatch(script, /chrome\.scripting\.executeScript/);
  assert.equal((html.match(/data-copy-section=/g) ?? []).length, 5);
});
