async function enableActionClick() {
  await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
}

chrome.runtime.onInstalled.addListener(() => {
  enableActionClick().catch((error) => console.error('Não foi possível configurar o painel:', error));
});

chrome.runtime.onStartup.addListener(() => {
  enableActionClick().catch((error) => console.error('Não foi possível configurar o painel:', error));
});
