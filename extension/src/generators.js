import {
  BROKERS, CLAIM_REPORTS, FIRST_NAMES, LAST_NAMES, REFERENCES, VALID_DDDS, VEHICLES
} from './data.js';

export const pick = (items, rng = Math.random) => items[Math.floor(rng() * items.length)];
export const randomDigit = (rng = Math.random) => Math.floor(rng() * 10);

export function randomDigits(length, rng = Math.random) {
  return Array.from({ length }, () => randomDigit(rng)).join('');
}

export function generateCpf(rng = Math.random) {
  let base;
  do { base = randomDigits(9, rng); } while (/^(\d)\1+$/.test(base));

  const calculateDigit = (value, factor) => {
    const sum = [...value].reduce((total, digit) => total + Number(digit) * factor--, 0);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const first = calculateDigit(base, 10);
  const second = calculateDigit(`${base}${first}`, 11);
  return `${base}${first}${second}`;
}

export function isValidCpf(cpf) {
  if (!/^\d{11}$/.test(cpf) || /^(\d)\1+$/.test(cpf)) return false;
  const digits = cpf.slice(0, 9);
  const expected = generateCpfDigits(digits);
  return cpf.endsWith(expected);
}

function generateCpfDigits(base) {
  const digit = (value, factor) => {
    const sum = [...value].reduce((total, item) => total + Number(item) * factor--, 0);
    const remainder = (sum * 10) % 11;
    return String(remainder === 10 ? 0 : remainder);
  };
  const first = digit(base, 10);
  return first + digit(base + first, 11);
}

function normalizeEmailPart(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function generatePolicy(rng = Math.random) {
  const [broker, susep] = pick(BROKERS, rng);
  return { Apolice: randomDigits(11, rng), Corretor: broker, Susep: susep };
}

export function generateInsured(rng = Math.random) {
  const first = pick(FIRST_NAMES, rng);
  const lastOne = pick(LAST_NAMES, rng);
  let lastTwo = pick(LAST_NAMES, rng);
  if (lastTwo === lastOne) lastTwo = pick(LAST_NAMES.filter((name) => name !== lastOne), rng);
  const name = `${first} ${lastOne} ${lastTwo}`;
  const suffix = randomDigits(3, rng);
  return {
    Segurado: name.toUpperCase(),
    CpfCnpj: generateCpf(rng),
    Email: `${normalizeEmailPart(first)}.${normalizeEmailPart(lastOne)}${suffix}@example.com`,
    Ddi: '55',
    Ddd: pick(VALID_DDDS, rng),
    Telefone: `9${randomDigits(8, rng)}`
  };
}

export function generatePlate(rng = Math.random) {
  const letter = () => String.fromCharCode(65 + Math.floor(rng() * 26));
  const letters = `${letter()}${letter()}${letter()}`;
  return rng() < .5
    ? `${letters}${randomDigits(4, rng)}`
    : `${letters}${randomDigit(rng)}${letter()}${randomDigits(2, rng)}`;
}

export function generateChassis(rng = Math.random) {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  return Array.from({ length: 17 }, () => chars[Math.floor(rng() * chars.length)]).join('');
}

export function generateVehicle(rng = Math.random) {
  const vehicle = pick(VEHICLES, rng);
  const [manufactureYear, modelYear] = pick(vehicle.years, rng);
  return {
    Modelo: vehicle.model,
    Marca: vehicle.brand,
    Chassi: generateChassis(rng),
    Placa: generatePlate(rng),
    AnoModelo: modelYear,
    AnoFabricacao: manufactureYear,
    Fipe: vehicle.fipe
  };
}

export function generateReference(rng = Math.random) { return pick(REFERENCES, rng); }
export function generateClaim(rng = Math.random) { return { RelatoDano: pick(CLAIM_REPORTS, rng) }; }

export function addressFromRecord(record, source, rng = Math.random) {
  return {
    Endereco: record.street,
    Numero: String(1 + Math.floor(rng() * 4999)),
    Bairro: record.district,
    Cidade: record.city,
    Uf: record.state,
    Cep: record.cep,
    Referencia: generateReference(rng),
    source
  };
}
