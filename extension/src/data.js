export const FIRST_NAMES = [
  'Adriana', 'Aline', 'Amanda', 'André', 'Beatriz', 'Bruno', 'Camila', 'Carlos',
  'Daniel', 'Débora', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Isabela',
  'João', 'Juliana', 'Larissa', 'Lucas', 'Mariana', 'Mateus', 'Natália',
  'Paulo', 'Rafael', 'Renata', 'Ricardo', 'Sabrina', 'Thiago', 'Vanessa', 'Vinícius'
];

export const LAST_NAMES = [
  'Almeida', 'Alves', 'Barbosa', 'Cardoso', 'Carvalho', 'Castro', 'Costa',
  'Dias', 'Ferreira', 'Gomes', 'Lima', 'Martins', 'Mendes', 'Monteiro',
  'Moraes', 'Moreira', 'Nascimento', 'Oliveira', 'Pereira', 'Ramos',
  'Rocha', 'Rodrigues', 'Santana', 'Santos', 'Silva', 'Souza', 'Teixeira'
];

export const BROKERS = [
  ['ALVORADA CORRETORA DE SEGUROS LTDA', '18426'],
  ['BRASIL CENTRAL CORRETORA DE SEGUROS LTDA', '30715'],
  ['CONFIANÇA PRIME CORRETORA DE SEGUROS LTDA', '52904'],
  ['HORIZONTE CORRETORA DE SEGUROS LTDA', '64138'],
  ['NACIONAL SUL CORRETORA DE SEGUROS LTDA', '79251'],
  ['PONTO CERTO CORRETORA DE SEGUROS LTDA', '43680']
];

export const VALID_DDDS = [
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28',
  '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47',
  '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68',
  '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87',
  '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'
];

// Catálogo local de referência. Cada modelo expõe três configurações de ano,
// totalizando mais de 30 combinações coerentes para os testes.
export const VEHICLES = [
  { brand: 'GM - Chevrolet', model: 'Corsa Sed. Premium 1.4 8V ECONOFLEX 4p', fipe: '004342-7', years: [[2011, 2012], [2010, 2011], [2009, 2010]] },
  { brand: 'GM - Chevrolet', model: 'Onix Hatch LT 1.0 8V FlexPower 5p Mec.', fipe: '004424-5', years: [[2019, 2020], [2018, 2019], [2017, 2018]] },
  { brand: 'Fiat', model: 'UNO MILLE 1.0 Fire/ F.Flex/ ECONOMY 4p', fipe: '001162-2', years: [[2012, 2013], [2011, 2012], [2010, 2011]] },
  { brand: 'Fiat', model: 'Palio ATTRACTIVE 1.0 EVO Fire Flex 8v 5p', fipe: '001373-0', years: [[2016, 2017], [2015, 2016], [2014, 2015]] },
  { brand: 'Volkswagen', model: 'Gol Trendline 1.0 T.Flex 8V 5p', fipe: '005361-9', years: [[2017, 2018], [2016, 2017], [2015, 2016]] },
  { brand: 'Volkswagen', model: 'T-Cross 1.0 TSI Flex 12V 5p Aut.', fipe: '005496-8', years: [[2022, 2023], [2021, 2022], [2020, 2021]] },
  { brand: 'Ford', model: 'Ka 1.0 SE/SE Plus TiVCT Flex 5p', fipe: '003421-2', years: [[2019, 2020], [2018, 2019], [2017, 2018]] },
  { brand: 'Honda', model: 'Civic Sedan LXS 1.8/1.8 Flex 16V Aut. 4p', fipe: '014052-7', years: [[2015, 2016], [2014, 2015], [2013, 2014]] },
  { brand: 'Hyundai', model: 'HB20 Comfort 1.0 Flex 12V Mec.', fipe: '015088-0', years: [[2018, 2019], [2017, 2018], [2016, 2017]] },
  { brand: 'Renault', model: 'SANDERO Expression Flex 1.0 12V 5p', fipe: '025243-7', years: [[2019, 2020], [2018, 2019], [2017, 2018]] },
  { brand: 'Toyota', model: 'Corolla GLi 1.8 Flex 16V Aut.', fipe: '002111-3', years: [[2019, 2020], [2018, 2019], [2017, 2018]] }
];

export const CLAIM_REPORTS = [
  'Colisão traseira no semáforo',
  'Veículo atingido por granizo',
  'Alagamento danificou o motor',
  'Furto ocorrido no estacionamento',
  'Para-brisa quebrado por uma pedra',
  'Batida lateral em cruzamento',
  'Dano na porta ao estacionar',
  'Retrovisor atingido por motocicleta',
  'Colisão frontal em baixa velocidade',
  'Queda de galho sobre o veículo',
  'Raspão na lateral em garagem',
  'Veículo danificado em enchente'
];

export const REFERENCES = [
  'Próximo à praça central',
  'Ao lado da farmácia',
  'Em frente ao supermercado',
  'Próximo ao posto de combustível',
  'Ao lado da escola municipal',
  'Em frente à agência bancária',
  'Próximo ao terminal de ônibus',
  'Ao lado do centro comercial',
  'Próximo à unidade de saúde',
  'Em frente à padaria'
];

export const ADDRESS_SEARCH_SEEDS = [
  ['SP', 'São Paulo', 'Paulista'], ['SP', 'Campinas', 'Brasil'], ['RJ', 'Rio de Janeiro', 'Copacabana'],
  ['RJ', 'Niterói', 'Amaral'], ['MG', 'Belo Horizonte', 'Afonso Pena'], ['MG', 'Uberlândia', 'Brasil'],
  ['ES', 'Vitória', 'Reta da Penha'], ['PR', 'Curitiba', 'Brasil'], ['PR', 'Londrina', 'Paraná'],
  ['SC', 'Florianópolis', 'Madre Benvenuta'], ['RS', 'Porto Alegre', 'Ipiranga'], ['RS', 'Caxias do Sul', 'Júlio'],
  ['BA', 'Salvador', 'Sete de Setembro'], ['PE', 'Recife', 'Boa Viagem'], ['CE', 'Fortaleza', 'Santos Dumont'],
  ['RN', 'Natal', 'Salgado Filho'], ['PB', 'João Pessoa', 'Epitácio Pessoa'], ['AL', 'Maceió', 'Fernandes Lima'],
  ['SE', 'Aracaju', 'Beira Mar'], ['MA', 'São Luís', 'Holandeses'], ['PA', 'Belém', 'Nazaré'],
  ['AM', 'Manaus', 'Djalma Batista'], ['RO', 'Porto Velho', 'Carlos Gomes'], ['AC', 'Rio Branco', 'Brasil'],
  ['RR', 'Boa Vista', 'Ville Roy'], ['AP', 'Macapá', 'Fab'], ['GO', 'Goiânia', 'Anhanguera'],
  ['MT', 'Cuiabá', 'Miguel Sutil'], ['MS', 'Campo Grande', 'Afonso Pena'], ['DF', 'Brasília', 'W3']
];

// Fallback local revisável. O número do imóvel é sempre gerado separadamente.
export const FALLBACK_ADDRESSES = [
  ['Praça da Sé', 'Sé', 'São Paulo', 'SP', '01001000'],
  ['Avenida Paulista', 'Bela Vista', 'São Paulo', 'SP', '01310100'],
  ['Rua Vinte e Cinco de Março', 'Centro', 'São Paulo', 'SP', '01021000'],
  ['Avenida Atlântica', 'Copacabana', 'Rio de Janeiro', 'RJ', '22021001'],
  ['Rua Visconde de Pirajá', 'Ipanema', 'Rio de Janeiro', 'RJ', '22410003'],
  ['Avenida Afonso Pena', 'Centro', 'Belo Horizonte', 'MG', '30130009'],
  ['Avenida João Pinheiro', 'Centro', 'Belo Horizonte', 'MG', '30130180'],
  ['Avenida Rondon Pacheco', 'Saraiva', 'Uberlândia', 'MG', '38408050'],
  ['Avenida Sete de Setembro', 'Centro', 'Curitiba', 'PR', '80060070'],
  ['Rua XV de Novembro', 'Centro', 'Curitiba', 'PR', '80020310'],
  ['Avenida Ipiranga', 'Praia de Belas', 'Porto Alegre', 'RS', '90160093'],
  ['Avenida Borges de Medeiros', 'Centro Histórico', 'Porto Alegre', 'RS', '90020021'],
  ['Avenida Beira-Mar Norte', 'Centro', 'Florianópolis', 'SC', '88015120'],
  ['Avenida Sete de Setembro', 'Dois de Julho', 'Salvador', 'BA', '40060001'],
  ['Avenida Tancredo Neves', 'Caminho das Árvores', 'Salvador', 'BA', '41820020'],
  ['Avenida Boa Viagem', 'Boa Viagem', 'Recife', 'PE', '51011000'],
  ['Avenida Agamenon Magalhães', 'Santo Amaro', 'Recife', 'PE', '50050160'],
  ['Avenida Santos Dumont', 'Aldeota', 'Fortaleza', 'CE', '60150160'],
  ['Avenida Senador Salgado Filho', 'Lagoa Nova', 'Natal', 'RN', '59075000'],
  ['Avenida Epitácio Pessoa', 'Tambaú', 'João Pessoa', 'PB', '58039000'],
  ['Avenida Fernandes Lima', 'Farol', 'Maceió', 'AL', '57057000'],
  ['Avenida Nazaré', 'Nazaré', 'Belém', 'PA', '66035000'],
  ['Avenida Djalma Batista', 'Chapada', 'Manaus', 'AM', '69050010'],
  ['Avenida Brasil', 'Centro', 'Rio Branco', 'AC', '69900078'],
  ['Avenida FAB', 'Centro', 'Macapá', 'AP', '68900073'],
  ['Avenida Anhanguera', 'Setor Central', 'Goiânia', 'GO', '74043010'],
  ['Avenida Historiador Rubens de Mendonça', 'Bosque da Saúde', 'Cuiabá', 'MT', '78050000'],
  ['Avenida Afonso Pena', 'Centro', 'Campo Grande', 'MS', '79002070'],
  ['Avenida W3 Sul', 'Asa Sul', 'Brasília', 'DF', '70300000'],
  ['Avenida Ville Roy', 'Centro', 'Boa Vista', 'RR', '69301000']
].map(([street, district, city, state, cep]) => ({ street, district, city, state, cep }));
