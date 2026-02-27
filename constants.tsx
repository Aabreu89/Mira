
import React from 'react';

export const COLORS = {
  primary: '#f97316', // MIRA Orange
  secondary: '#4A707A', // MIRA Blue
  accent: '#eab308', // MIRA Yellow
  success: '#22c55e', // MIRA Green
  pastel: {
    orange: '#FFF1E6',
    yellow: '#FEFAE0',
    blue: '#E0F2FE',
    green: '#DCFCE7',
  }
};

export const MIRA_LOGO_URL = '/logo-mira.png';

export const OFFICIAL_SOURCES = [
  { name: "AIMA", url: "https://aima.gov.pt", category: "Imigração e Regularização", id: "aima" },
  { name: "IEFP", url: "https://iefp.pt", category: "Emprego e Formação", id: "iefp" },
  { name: "ACT", url: "https://act.gov.pt", category: "Condições de Trabalho", id: "act" },
  { name: "Segurança Social", url: "https://seg-social.pt", category: "Apoios Sociais", id: "seg_social" },
  { name: "IHRU", url: "https://ihru.pt", category: "Habitação", id: "ihru" },
  { name: "Portal das Finanças", url: "https://portaldasfinancas.gov.pt", category: "Finanças e NIF", id: "financas" },
  { name: "SNS", url: "https://sns.gov.pt", category: "Saúde", id: "sns" },
  { name: "DGES", url: "https://dges.gov.pt", category: "Educação e Diplomas", id: "dges" },
  { name: "IRN", url: "https://irn.justica.gov.pt", category: "Registos e Nacionalidade", id: "irn" },
  { name: "ACM", url: "https://acm.gov.pt", category: "Integração e Direitos Humanos", id: "acm" },
  { name: "IOM Portugal", url: "https://portugal.iom.int", category: "Refugiados e Migração", id: "oim" },
  { name: "UNHCR Portugal", url: "https://help.unhcr.org/portugal", category: "Refúgio e Proteção", id: "acnur" },
  { name: "DRE", url: "https://dre.pt", category: "Legislação", id: "dre" },
  { name: "dados.gov.pt", url: "https://dados.gov.pt", category: "Dados Públicos", id: "dadosgov" },
  { name: "ANQEP", url: "https://anqep.gov.pt", category: "Formação Profissional", id: "anqep" },
  { name: "justica.gov.pt", url: "https://justica.gov.pt", category: "Serviços Jurídicos", id: "justica" },
  { name: "Casa do Brasil de Lisboa", url: "https://casadobrasildelisboa.pt", category: "ONGs / Comunidade Brasileira", id: "casa_brasil" }
];

export const MIRA_LOGO = (
  <img
    src="/logo-mira.png"
    alt="MIRA Logo"
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
);

export const PREDEFINED_AVATARS = [
  // Existentes
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&h=400&fit=crop",
  // Árabes
  "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1618498082410-b4aa22193b9e?w=400&h=400&fit=crop",
  // Asiáticos
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1491349174775-aaaefdd81942?w=400&h=400&fit=crop",
  // Indígenas / Latino-Americanos
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
  // Indianos
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&seed=ind1",
  "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1589156228580-8cf37e2e3237?w=400&h=400&fit=crop",
  // Latinos
  "https://images.unsplash.com/photo-1595956553066-fe24a8c33395?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&h=400&fit=crop",
  // Europeus (eslavos, mediterrânicos, nórdicos)
  "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1543165365-07232ed12fad?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
  // Negros / Africanos
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1574701148212-8518049c7b2c?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1589156288859-f0cb0d82b065?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop",
];
