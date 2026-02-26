
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
  { name: "justica.gov.pt", url: "https://justica.gov.pt", category: "Serviços Jurídicos", id: "justica" }
];

export const MIRA_LOGO = (
  <img
    src="/logo-mira.png"
    alt="MIRA Logo"
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
);
