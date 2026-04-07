export interface Episode {
  id: number
  title: string
  description?: string
  host: string
  duration: string
  episode: string
  category: string
  gradient: string
  tags: string[]
}

export const featuredEpisode: Episode = {
  id: 1,
  title: 'O podcast que serve inspiração com açúcar',
  description:
    'Prepare-se para uma xícara cheia de inspiração e conhecimento. Um bate-papo super descontraído e animado com empresários e políticos da região.',
  host: 'Podcafé',
  duration: '1h 23min',
  episode: 'EP. 47',
  category: 'Negócios & Política',
  gradient: 'from-indigo-900 via-purple-900 to-blue-950',
  tags: ['Inspiração', 'Negócios', 'Política'],
}

export const categories = [
  {
    id: 'politica',
    title: 'Últimos Episódios',
    episodes: [
      { id: 2,  title: 'Eleições Municipais: O que Esperar', host: 'Podcafé',  duration: '1h 12min', episode: 'EP. 118', category: 'Política', gradient: 'from-blue-900 via-indigo-900 to-slate-950',   tags: ['Eleições'] },
      { id: 3,  title: 'Câmara Municipal em Debate',         host: 'Podcafé',  duration: '58min',     episode: 'EP. 109', category: 'Política', gradient: 'from-slate-900 via-blue-900 to-indigo-950',  tags: ['Câmara'] },
      { id: 4,  title: 'Orçamento Público: Como Funciona',   host: 'Podcafé',  duration: '45min',     episode: 'EP. 97',  category: 'Política', gradient: 'from-indigo-900 via-violet-900 to-blue-950', tags: ['Orçamento'] },
      { id: 5,  title: 'Vereadores da nossa cidade',          host: 'Podcafé',  duration: '1h 5min',   episode: 'EP. 84',  category: 'Política', gradient: 'from-blue-900 via-sky-900 to-indigo-950',   tags: ['Vereadores'] },
      { id: 6,  title: 'Saúde Pública em Pauta',             host: 'Podcafé',  duration: '52min',     episode: 'EP. 76',  category: 'Política', gradient: 'from-cyan-900 via-blue-900 to-indigo-950',  tags: ['Saúde Pública'] },
      { id: 7,  title: 'Infraestrutura e Mobilidade Urbana', host: 'Podcafé',  duration: '49min',     episode: 'EP. 65',  category: 'Política', gradient: 'from-violet-900 via-indigo-900 to-blue-950', tags: ['Infraestrutura'] },
      { id: 8,  title: 'Educação: Desafios e Soluções',      host: 'Podcafé',  duration: '1h 3min',   episode: 'EP. 53',  category: 'Política', gradient: 'from-indigo-900 via-blue-900 to-slate-950',  tags: ['Educação'] },
    ],
  },
  {
    id: 'empreendedorismo',
    title: 'Episódios Mais Ouvidos',
    episodes: [
      { id: 9,  title: 'Abrir um Negócio do Zero',             host: 'Podcafé', duration: '1h 8min',  episode: 'EP. 121', category: 'Empreendedorismo', gradient: 'from-orange-900 via-amber-900 to-yellow-950', tags: ['Negócio'] },
      { id: 10, title: 'Empreendedor Local em Destaque',        host: 'Podcafé', duration: '55min',    episode: 'EP. 115', category: 'Empreendedorismo', gradient: 'from-amber-900 via-orange-900 to-red-950',    tags: ['Local'] },
      { id: 11, title: 'Franquias: Vale a Pena?',               host: 'Podcafé', duration: '48min',    episode: 'EP. 104', category: 'Empreendedorismo', gradient: 'from-yellow-900 via-amber-900 to-orange-950', tags: ['Franquia'] },
      { id: 12, title: 'Marketing para Pequenos Negócios',      host: 'Podcafé', duration: '1h',       episode: 'EP. 92',  category: 'Empreendedorismo', gradient: 'from-orange-900 via-red-900 to-rose-950',     tags: ['Marketing'] },
      { id: 13, title: 'Crédito e Financiamento Empresarial',   host: 'Podcafé', duration: '43min',    episode: 'EP. 81',  category: 'Empreendedorismo', gradient: 'from-red-900 via-orange-900 to-amber-950',    tags: ['Crédito'] },
      { id: 14, title: 'Como Fidelizar Clientes',               host: 'Podcafé', duration: '57min',    episode: 'EP. 70',  category: 'Empreendedorismo', gradient: 'from-amber-900 via-yellow-900 to-lime-950',   tags: ['Clientes'] },
      { id: 15, title: 'Gestão Financeira na Prática',          host: 'Podcafé', duration: '1h 15min', episode: 'EP. 58',  category: 'Empreendedorismo', gradient: 'from-lime-900 via-green-900 to-teal-950',     tags: ['Finanças'] },
    ],
  },
  {
    id: 'entretenimento',
    title: 'Shorts',
    episodes: [
      { id: 16, title: 'Bastidores do Carnaval Local',       host: 'Podcafé', duration: '1h 2min',  episode: 'EP. 119', category: 'Entretenimento', gradient: 'from-pink-900 via-rose-900 to-red-950',      tags: ['Carnaval'] },
      { id: 17, title: 'Festival de Cinema da Cidade',       host: 'Podcafé', duration: '47min',    episode: 'EP. 111', category: 'Entretenimento', gradient: 'from-rose-900 via-pink-900 to-fuchsia-950',   tags: ['Cinema'] },
      { id: 18, title: 'Humor e Comédia Stand-up',           host: 'Podcafé', duration: '1h 18min', episode: 'EP. 100', category: 'Entretenimento', gradient: 'from-fuchsia-900 via-purple-900 to-violet-950',tags: ['Humor'] },
      { id: 19, title: 'Teatro Regional em Alta',            host: 'Podcafé', duration: '44min',    episode: 'EP. 89',  category: 'Entretenimento', gradient: 'from-violet-900 via-fuchsia-900 to-pink-950',  tags: ['Teatro'] },
      { id: 20, title: 'Gastronomia e Sabores Locais',       host: 'Podcafé', duration: '52min',    episode: 'EP. 77',  category: 'Entretenimento', gradient: 'from-orange-900 via-amber-900 to-yellow-950',  tags: ['Gastronomia'] },
      { id: 21, title: 'Influenciadores da Nossa Região',    host: 'Podcafé', duration: '1h 6min',  episode: 'EP. 66',  category: 'Entretenimento', gradient: 'from-pink-900 via-red-900 to-orange-950',      tags: ['Influencer'] },
      { id: 22, title: 'Eventos e Shows do Mês',             host: 'Podcafé', duration: '38min',    episode: 'EP. 55',  category: 'Entretenimento', gradient: 'from-red-900 via-rose-900 to-pink-950',        tags: ['Shows'] },
    ],
  },
  {
    id: 'musica',
    title: 'MulherPodi Cast',
    episodes: [
      { id: 23, title: 'Artistas Locais que Você Precisa Conhecer', host: 'Podcafé', duration: '1h 10min', episode: 'EP. 120', category: 'Música', gradient: 'from-purple-900 via-violet-900 to-indigo-950', tags: ['Artistas'] },
      { id: 24, title: 'Sertanejo: Raízes e Evolução',              host: 'Podcafé', duration: '53min',    episode: 'EP. 113', category: 'Música', gradient: 'from-amber-900 via-orange-900 to-red-950',     tags: ['Sertanejo'] },
      { id: 25, title: 'Funk e Cultura Popular Brasileira',         host: 'Podcafé', duration: '49min',    episode: 'EP. 105', category: 'Música', gradient: 'from-yellow-900 via-lime-900 to-green-950',    tags: ['Funk'] },
      { id: 26, title: 'Bandas Independentes da Região',            host: 'Podcafé', duration: '1h 4min',  episode: 'EP. 94',  category: 'Música', gradient: 'from-teal-900 via-cyan-900 to-blue-950',      tags: ['Bandas'] },
      { id: 27, title: 'Gospel: Fé e Melodia',                      host: 'Podcafé', duration: '46min',    episode: 'EP. 83',  category: 'Música', gradient: 'from-sky-900 via-indigo-900 to-violet-950',   tags: ['Gospel'] },
      { id: 28, title: 'MPB: A Alma do Brasil',                     host: 'Podcafé', duration: '58min',    episode: 'EP. 72',  category: 'Música', gradient: 'from-green-900 via-teal-900 to-cyan-950',     tags: ['MPB'] },
      { id: 29, title: 'Produção Musical do Zero',                  host: 'Podcafé', duration: '1h 20min', episode: 'EP. 61',  category: 'Música', gradient: 'from-violet-900 via-purple-900 to-fuchsia-950',tags: ['Produção'] },
    ],
  },
]

export const top10: Episode[] = [
  { id: 101, title: 'Abrir um Negócio do Zero',                       host: 'Podcafé', duration: '1h 8min',  episode: 'EP. 121', category: 'Empreendedorismo', gradient: 'from-orange-900 via-amber-900 to-yellow-950',  tags: ['Negócio'] },
  { id: 102, title: 'Artistas Locais que Você Precisa Conhecer',      host: 'Podcafé', duration: '1h 10min', episode: 'EP. 120', category: 'Música',           gradient: 'from-purple-900 via-violet-900 to-indigo-950', tags: ['Artistas'] },
  { id: 103, title: 'Eleições Municipais: O que Esperar',             host: 'Podcafé', duration: '1h 12min', episode: 'EP. 118', category: 'Política',         gradient: 'from-blue-900 via-indigo-900 to-slate-950',    tags: ['Eleições'] },
  { id: 104, title: 'Bastidores do Carnaval Local',                   host: 'Podcafé', duration: '1h 2min',  episode: 'EP. 119', category: 'Entretenimento',   gradient: 'from-pink-900 via-rose-900 to-red-950',        tags: ['Carnaval'] },
  { id: 105, title: 'Empreendedor Local em Destaque',                 host: 'Podcafé', duration: '55min',    episode: 'EP. 115', category: 'Empreendedorismo', gradient: 'from-amber-900 via-orange-900 to-red-950',     tags: ['Local'] },
  { id: 106, title: 'Sertanejo: Raízes e Evolução',                   host: 'Podcafé', duration: '53min',    episode: 'EP. 113', category: 'Música',           gradient: 'from-amber-900 via-orange-900 to-red-950',     tags: ['Sertanejo'] },
  { id: 107, title: 'Câmara Municipal em Debate',                     host: 'Podcafé', duration: '58min',    episode: 'EP. 109', category: 'Política',         gradient: 'from-slate-900 via-blue-900 to-indigo-950',    tags: ['Câmara'] },
  { id: 108, title: 'Humor e Comédia Stand-up',                       host: 'Podcafé', duration: '1h 18min', episode: 'EP. 100', category: 'Entretenimento',   gradient: 'from-fuchsia-900 via-purple-900 to-violet-950',tags: ['Humor'] },
  { id: 109, title: 'Marketing para Pequenos Negócios',               host: 'Podcafé', duration: '1h',       episode: 'EP. 92',  category: 'Empreendedorismo', gradient: 'from-orange-900 via-red-900 to-rose-950',      tags: ['Marketing'] },
  { id: 110, title: 'Bandas Independentes da Região',                 host: 'Podcafé', duration: '1h 4min',  episode: 'EP. 94',  category: 'Música',           gradient: 'from-teal-900 via-cyan-900 to-blue-950',      tags: ['Bandas'] },
]
