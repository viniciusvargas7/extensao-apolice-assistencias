import test from 'node:test';
import assert from 'node:assert/strict';
import { AddressService, sanitizeViaCepResults } from '../extension/src/address-service.js';

const validPayload = [
  { cep: '01001-000', logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP' },
  { cep: '01310-100', logradouro: 'Avenida Paulista', bairro: 'Bela Vista', localidade: 'São Paulo', uf: 'SP' }
];

test('higieniza e mapeia somente respostas completas', () => {
  const result = sanitizeViaCepResults([
    ...validPayload,
    { cep: 'x', logradouro: '<script>', bairro: 'Centro', localidade: 'X', uf: 'ZZ' },
    null
  ]);
  assert.equal(result.length, 2);
  assert.deepEqual(result[0], { cep: '01001000', street: 'Praça da Sé', district: 'Sé', city: 'São Paulo', state: 'SP' });
});

test('usa resultado válido do ViaCEP', async () => {
  let calls = 0;
  const service = new AddressService({
    rng: () => 0,
    fetchImpl: async (url, options) => {
      calls++;
      assert.match(url, /^https:\/\/viacep\.com\.br\/ws\//);
      assert.ok(options.signal);
      return { ok: true, json: async () => validPayload };
    }
  });
  const result = await service.generate();
  assert.equal(result.source, 'viacep');
  assert.equal(result.Cep, '01001000');
  await service.generate();
  assert.equal(calls, 1, 'consulta repetida deve usar cache em memória');
});

for (const scenario of [
  ['erro HTTP', async () => ({ ok: false, status: 429 })],
  ['JSON inválido', async () => ({ ok: true, json: async () => { throw new SyntaxError('invalid'); } })],
  ['campos incompletos', async () => ({ ok: true, json: async () => [{ cep: '01001000' }] })]
]) {
  test(`usa fallback local em ${scenario[0]}`, async () => {
    const service = new AddressService({ rng: () => 0, fetchImpl: scenario[1] });
    const result = await service.generate();
    assert.equal(result.source, 'offline');
    assert.match(result.Cep, /^\d{8}$/);
  });
}

test('aplica timeout e usa fallback sem repetir a chamada', async () => {
  let calls = 0;
  const service = new AddressService({
    timeoutMs: 10,
    rng: () => 0,
    fetchImpl: (_url, { signal }) => new Promise((_resolve, reject) => {
      calls++;
      signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    })
  });
  const result = await service.generate();
  assert.equal(result.source, 'offline');
  assert.equal(calls, 1);
});
