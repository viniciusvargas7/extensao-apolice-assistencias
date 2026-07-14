# Gerador de Apólices QA

Extensão privada para Chrome que gera dados fictícios de apólices. Ela abre em um painel lateral azul, permite regenerar grupos separadamente e copiar valores individualmente ou por seção.

## Instalação local

1. Obtenha a pasta `extension` ou extraia o arquivo `gerador-apolices-qa.zip`.
2. Abra `chrome://extensions` no Chrome.
3. Ative **Modo do desenvolvedor** no canto superior direito.
4. Clique em **Carregar sem compactação**.
5. Selecione a pasta extraída que contém o arquivo `manifest.json`.
6. Fixe **Gerador de Apólices QA** na barra do Chrome e clique no ícone para abrir o painel.

O ZIP não deve ser selecionado diretamente: ele precisa ser extraído antes. Como a extensão não é publicada na Chrome Web Store, o Chrome pode exibir um aviso sobre extensões em modo de desenvolvedor ao iniciar.

## Compartilhamento

Gere um pacote limpo executando no PowerShell, a partir da raiz do projeto:

```powershell
.\scripts\package-extension.ps1
```

Compartilhe o arquivo `dist/gerador-apolices-qa.zip`. Quem receber deve seguir a instalação local acima. Para atualizar, substitua a pasta extraída e clique em **Atualizar** na página `chrome://extensions`.

## Privacidade e rede

- A extensão não lê páginas, abas, cookies ou histórico.
- Não possui analytics, armazenamento ou código remoto.
- A única conexão permitida é uma consulta HTTPS ao `viacep.com.br` ao gerar um endereço.
- A consulta envia somente UF, cidade e um fragmento de logradouro previamente incluídos no pacote.
- Toda regeneração de endereço tenta primeiro o ViaCEP. Se o serviço estiver indisponível ou demorar mais de cinco segundos, um endereço do catálogo local é usado.
- Número do imóvel e ponto de referência são plausíveis, não confirmados pela API.

Uma bolinha verde na seção **Endereço** indica uma resposta online do ViaCEP; a bolinha vermelha indica uso do catálogo offline.

## Cópia dos dados

O botão **⧉** copia um campo individual. O botão **Copiar seção** copia todos os campos daquele grupo no formato `Rótulo: valor`, um por linha.

## Desenvolvimento e testes

Não é necessário instalar dependências. Requer apenas Node.js 20 ou superior para executar os testes:

```powershell
npm test
npm run check
```

Os testes cobrem validação de CPF, contatos, placas, chassi, coerência veicular, tamanho do relato, catálogo de endereços, respostas e falhas do ViaCEP, timeout, interface e restrições de segurança do manifesto.

## Estrutura

- `extension/`: pacote diretamente carregável pelo Chrome.
- `extension/src/data.js`: catálogos locais e sementes de consulta.
- `extension/src/generators.js`: geração e validação dos dados.
- `extension/src/address-service.js`: integração restrita com ViaCEP e fallback.
- `test/`: testes automatizados, fora do pacote compartilhado.
- `scripts/package-extension.ps1`: criação do ZIP distribuível.

## Limitações intencionais

- CPF, apólice, SUSEP, telefone, e-mail, placa e chassi são estruturalmente válidos, mas não representam registros confirmados.
- O e-mail usa `example.com`; o telefone pode coincidir com um número existente e não deve receber chamadas ou mensagens.
- O catálogo FIPE é uma referência local e deve ser revisado periodicamente se a equipe depender de preços ou nomenclaturas atuais.
- Não há histórico, exportação JSON nem edição manual.
