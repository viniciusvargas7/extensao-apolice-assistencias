import { ADDRESS_SEARCH_SEEDS, FALLBACK_ADDRESSES } from './data.js';
import { addressFromRecord, pick } from './generators.js';

const STATES = new Set(['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']);

function cleanText(value, maxLength = 120) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, maxLength);
}

export function sanitizeViaCepResults(payload) {
  if (!Array.isArray(payload)) return [];
  return payload.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const cep = cleanText(item.cep, 10).replace(/\D/g, '');
    const street = cleanText(item.logradouro);
    const district = cleanText(item.bairro);
    const city = cleanText(item.localidade, 80);
    const state = cleanText(item.uf, 2).toUpperCase();
    if (!/^\d{8}$/.test(cep) || !street || !district || !city || !STATES.has(state)) return [];
    return [{ cep, street, district, city, state }];
  });
}

export class AddressService {
  constructor({ fetchImpl = globalThis.fetch, timeoutMs = 5000, rng = Math.random } = {}) {
    this.fetchImpl = fetchImpl;
    this.timeoutMs = timeoutMs;
    this.rng = rng;
  }

  async generate() {
    const seed = pick(ADDRESS_SEARCH_SEEDS, this.rng);
    try {
      const candidates = await this.#query(seed);
      return addressFromRecord(pick(candidates, this.rng), 'viacep', this.rng);
    } catch {
      return addressFromRecord(pick(FALLBACK_ADDRESSES, this.rng), 'offline', this.rng);
    }
  }

  async #query([state, city, street]) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    const url = `https://viacep.com.br/ws/${state}/${encodeURIComponent(city)}/${encodeURIComponent(street)}/json/`;
    try {
      const response = await this.fetchImpl(url, { signal: controller.signal, cache: 'no-store' });
      if (!response.ok) throw new Error(`ViaCEP respondeu ${response.status}`);
      const candidates = sanitizeViaCepResults(await response.json());
      if (candidates.length === 0) throw new Error('ViaCEP não retornou endereços completos');
      return candidates;
    } finally {
      clearTimeout(timeout);
    }
  }
}
