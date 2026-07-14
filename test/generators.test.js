import test from 'node:test';
import assert from 'node:assert/strict';
import { CLAIM_REPORTS, FALLBACK_ADDRESSES, VALID_DDDS, VEHICLES } from '../extension/src/data.js';
import {
  addressFromRecord, generateChassis, generateClaim, generateCpf, generateInsured,
  generatePlate, generatePolicy, generateVehicle, isValidCpf
} from '../extension/src/generators.js';

test('gera CPFs com dígitos verificadores válidos', () => {
  for (let index = 0; index < 5000; index++) assert.equal(isValidCpf(generateCpf()), true);
});

test('gera apólice e SUSEP nos formatos definidos', () => {
  for (let index = 0; index < 500; index++) {
    const policy = generatePolicy();
    assert.match(policy.Apolice, /^\d{11}$/);
    assert.match(policy.Susep, /^\d{5}$/);
    assert.ok(policy.Corretor.endsWith('LTDA'));
  }
});

test('gera segurado e contato válidos', () => {
  for (let index = 0; index < 500; index++) {
    const insured = generateInsured();
    assert.ok(insured.Segurado.length > 5);
    assert.equal(isValidCpf(insured.CpfCnpj), true);
    assert.match(insured.Email, /^[a-z0-9.]+@example\.com$/);
    assert.equal(insured.Ddi, '55');
    assert.ok(VALID_DDDS.includes(insured.Ddd));
    assert.match(insured.Telefone, /^9\d{8}$/);
  }
});

test('gera placas antigas e Mercosul e chassis estruturais', () => {
  let oldPlate = false;
  let mercosulPlate = false;
  for (let index = 0; index < 1000; index++) {
    const plate = generatePlate();
    oldPlate ||= /^[A-Z]{3}\d{4}$/.test(plate);
    mercosulPlate ||= /^[A-Z]{3}\d[A-Z]\d{2}$/.test(plate);
    assert.match(plate, /^(?:[A-Z]{3}\d{4}|[A-Z]{3}\d[A-Z]\d{2})$/);
    assert.match(generateChassis(), /^[A-HJ-NPR-Z0-9]{17}$/);
  }
  assert.equal(oldPlate, true);
  assert.equal(mercosulPlate, true);
});

test('mantém veículo coerente com uma configuração do catálogo', () => {
  assert.ok(VEHICLES.reduce((sum, item) => sum + item.years.length, 0) >= 30);
  for (let index = 0; index < 1000; index++) {
    const generated = generateVehicle();
    const catalog = VEHICLES.find((item) => item.brand === generated.Marca && item.model === generated.Modelo && item.fipe === generated.Fipe);
    assert.ok(catalog);
    assert.ok(catalog.years.some(([manufacture, model]) => manufacture === generated.AnoFabricacao && model === generated.AnoModelo));
    assert.ok(generated.AnoFabricacao <= generated.AnoModelo);
  }
});

test('relatos permanecem na faixa de tamanho definida', () => {
  for (const report of CLAIM_REPORTS) assert.ok(report.length >= 25 && report.length <= 40, `${report}: ${report.length}`);
  for (let index = 0; index < 100; index++) assert.ok(generateClaim().RelatoDano.length >= 25);
});

test('fallback possui ao menos 30 endereços completos', () => {
  assert.ok(FALLBACK_ADDRESSES.length >= 30);
  for (const item of FALLBACK_ADDRESSES) {
    assert.match(item.cep, /^\d{8}$/);
    assert.ok(item.street && item.district && item.city);
    assert.match(item.state, /^[A-Z]{2}$/);
    const address = addressFromRecord(item, 'offline');
    assert.match(address.Numero, /^[1-9]\d{0,3}$/);
    assert.ok(address.Referencia.length > 5);
  }
});
