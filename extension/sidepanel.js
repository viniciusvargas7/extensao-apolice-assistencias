import { AddressService } from './src/address-service.js';
import { generateClaim, generateInsured, generatePolicy, generateVehicle } from './src/generators.js';

export const FIELD_DEFINITIONS = {
  policy: [['Apolice', 'Apólice'], ['Corretor', 'Corretor'], ['Susep', 'SUSEP']],
  insured: [['Segurado', 'Segurado'], ['CpfCnpj', 'CPF'], ['Email', 'E-mail'], ['Ddi', 'DDI'], ['Ddd', 'DDD'], ['Telefone', 'Telefone']],
  address: [['Endereco', 'Endereço'], ['Numero', 'Número'], ['Bairro', 'Bairro'], ['Cidade', 'Cidade'], ['Uf', 'UF'], ['Cep', 'CEP'], ['Referencia', 'Referência']],
  vehicle: [['Modelo', 'Modelo'], ['Marca', 'Marca'], ['Chassi', 'Chassi'], ['Placa', 'Placa'], ['AnoModelo', 'Ano modelo'], ['AnoFabricacao', 'Ano fabricação'], ['Fipe', 'FIPE']],
  claim: [['RelatoDano', 'Relato do dano']]
};

const state = { policy: {}, insured: {}, address: {}, vehicle: {}, claim: {} };
const addressService = new AddressService();
let addressRequestId = 0;
let toastTimer;

function fieldRow(key, label, value) {
  const row = document.createElement('div');
  row.className = 'field-row';

  const labelElement = document.createElement('span');
  labelElement.className = 'field-label';
  labelElement.textContent = label;

  const valueElement = document.createElement('span');
  valueElement.className = 'field-value';
  valueElement.dataset.value = key;
  valueElement.textContent = value == null ? '—' : String(value);

  const copyButton = document.createElement('button');
  copyButton.className = 'copy-button';
  copyButton.type = 'button';
  copyButton.textContent = '⧉';
  copyButton.title = `Copiar ${label.toLowerCase()}`;
  copyButton.setAttribute('aria-label', `Copiar ${label.toLowerCase()}`);
  copyButton.addEventListener('click', () => copyValue(label, value));

  row.append(labelElement, valueElement, copyButton);
  return row;
}

export function renderSection(section) {
  const container = document.querySelector(`[data-fields="${section}"]`);
  container.replaceChildren(...FIELD_DEFINITIONS[section].map(([key, label]) => fieldRow(key, label, state[section][key])));
}

function renderAllSyncSections() {
  for (const section of ['policy', 'insured', 'vehicle', 'claim']) renderSection(section);
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch {
    showToast('Não foi possível copiar para a área de transferência.');
  }
}

async function copyValue(label, value) {
  await copyText(String(value ?? ''), `${label} copiado.`);
}

export async function copySection(section) {
  const content = FIELD_DEFINITIONS[section]
    .map(([key, label]) => `${label}: ${state[section][key] ?? ''}`)
    .join('\n');
  await copyText(content, 'Seção copiada.');
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
}

function setAddressLoading(loading) {
  const button = document.querySelector('[data-refresh="address"]');
  const allButton = document.querySelector('#generate-all');
  const main = document.querySelector('#sections');
  button.disabled = loading;
  allButton.disabled = loading;
  button.textContent = loading ? 'Consultando…' : 'Regenerar';
  main.setAttribute('aria-busy', String(loading));
  if (loading) updateAddressStatus('loading');
}

function updateAddressStatus(source) {
  const status = document.querySelector('#address-status');
  const text = status.querySelector('.status-text');
  status.classList.toggle('loading', source === 'loading');
  status.classList.toggle('online', source === 'viacep');
  status.classList.toggle('offline', source === 'offline');
  text.textContent = source === 'loading'
    ? 'Verificando conexão com o ViaCEP…'
    : source === 'viacep'
      ? 'Online · endereço do ViaCEP'
      : 'Offline · catálogo local';
}

export async function regenerateAddress() {
  const requestId = ++addressRequestId;
  setAddressLoading(true);
  try {
    const address = await addressService.generate();
    if (requestId !== addressRequestId) return;
    state.address = address;
    renderSection('address');
    updateAddressStatus(address.source);
  } finally {
    if (requestId === addressRequestId) setAddressLoading(false);
  }
}

export function regenerateSection(section) {
  if (section === 'address') return regenerateAddress();
  const generators = {
    policy: generatePolicy,
    insured: generateInsured,
    vehicle: generateVehicle,
    claim: generateClaim
  };
  state[section] = generators[section]();
  renderSection(section);
  return Promise.resolve();
}

export async function generateAll() {
  state.policy = generatePolicy();
  state.insured = generateInsured();
  state.vehicle = generateVehicle();
  state.claim = generateClaim();
  renderAllSyncSections();
  await regenerateAddress();
}

document.querySelector('#generate-all').addEventListener('click', generateAll);
document.querySelectorAll('[data-refresh]').forEach((button) => {
  button.addEventListener('click', () => regenerateSection(button.dataset.refresh));
});
document.querySelectorAll('[data-copy-section]').forEach((button) => {
  button.addEventListener('click', () => copySection(button.dataset.copySection));
});

generateAll();
