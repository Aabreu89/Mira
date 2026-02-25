
import React from 'react';

export const COLORS = {
  primary: '#f97316', // MIRA Orange
  secondary: '#0ea5e9', // MIRA Blue
  accent: '#eab308', // MIRA Yellow
  success: '#22c55e', // MIRA Green
  pastel: {
    orange: '#FFF1E6',
    yellow: '#FEFAE0',
    blue: '#E0F2FE',
    green: '#DCFCE7',
  }
};

export const MIRA_LOGO_URL = 'https://raw.githubusercontent.com/lucide-react/lucide/main/icons/shield-check.svg';

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
  <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mira_official_gradient" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f97316" />
        <stop offset="1" stopColor="#0ea5e9" />
      </linearGradient>
      <filter id="mira_institutional_shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
        <feOffset dx="0" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* Clean Rounded Background Container */}
    <rect x="10" y="10" width="180" height="180" rx="60" fill="white" stroke="#f1f5f9" strokeWidth="2" />
    <rect x="20" y="20" width="160" height="160" rx="52" fill="url(#mira_official_gradient)" fillOpacity="0.03" />
    
    {/* Stylized M / Compass / Community Shield */}
    <g filter="url(#mira_institutional_shadow)">
      {/* The "M" for Mira - Refined as two merging paths of support */}
      <path 
        d="M55 145V65L100 110L145 65V145" 
        stroke="url(#mira_official_gradient)" 
        strokeWidth="18" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Guidance Star / Spark of Intelligence */}
      <path 
        d="M100 35L104 47L116 51L104 55L100 67L96 55L84 51L96 47L100 35Z" 
        fill="#eab308"
      />
      
      {/* Decorative Supporting Arc */}
      <path 
        d="M45 100C45 69.6243 69.6243 45 100 45C130.376 45 155 69.6243 155 100" 
        stroke="#0ea5e9" 
        strokeWidth="3" 
        strokeDasharray="1 10" 
        strokeLinecap="round" 
        opacity="0.4"
      />
    </g>

    {/* Subtle Institutional Border Line */}
    <circle cx="100" cy="100" r="88" stroke="url(#mira_official_gradient)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" />
  </svg>
);
