import { createClient } from '@supabase/supabase-js';
import process from 'process';

process.loadEnvFile('./.env.local');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const WORK_TOPICS = [
    "Tecnologia, Dados & IA",
    "Saúde & Cuidados Continuados",
    "Construção Civil & Engenharia",
    "Turismo, Hotelaria & Restauração",
    "Indústria, Production & Manufatura",
    "Logística, Transportes & Armazém",
    "Comércio, Vendas & Retalho",
    "Administrativo, Gestão & RH",
    "Limpeza, Segurança & Serviços",
    "Educação & Formação Profissional",
    "Artes, Design & Multimédia",
    "Agricultura, Pesca & Pecuária",
    "Apoio Social & Terceiro Setor",
    "Energia & Sustentabilidade",
    "Trabalho Remoto & Freelancing"
];

const PT_LOCATIONS = [
    "Lisboa", "Porto", "Braga", "Setúbal", "Faro", "Coimbra", "Aveiro", "Remoto", "Leiria", "Santarém", "Viseu", "Évora"
];

const JOB_SOURCES = [
    "www.alertaemprego.pt",
    "http://cantinhodoemprego.pt/",
    "https://www.emprego.pt/",
    "https://emprego.sapo.pt/",
    "https://emprego.trovit.pt/",
    "https://pt.indeed.com/",
    "https://www.itjobs.pt/",
    "https://www.net-empregos.com/",
    "https://www.olx.pt/emprego/",
    "https://pt.linkedin.com/",
    "https://www.glassdoor.com/Job/portugal",
    "https://pt.jooble.org/"
];

const getSourceName = (url) => {
    try {
        const domain = url.replace('https://', '').replace('http://', '').replace('www.', '').split(/[/?#]/)[0];
        const parts = domain.split('.');
        const name = parts.length >= 2 ? parts[0] : domain;
        return name.charAt(0).toUpperCase() + name.slice(1);
    } catch {
        return "Fonte Externa";
    }
};

const generateMockJobs = () => {
    const titlesByCategory = {
        "Tecnologia, Dados & IA": ["Engenheiro de Dados", "Fullstack Developer", "Especialista em Cibersegurança", "Analista de Sistemas", "Prompt Engineer"],
        "Saúde & Cuidados Continuados": ["Enfermeiro de Urgência", "Técnico de Auxiliar de Saúde", "Fisioterapeuta", "Médico Dentista", "Assistente de Apoio Domiciliário"],
        "Construção Civil & Engenharia": ["Chefe de Equipa de Pedreiros", "Engenheiro Eletrotécnico", "Operador de Grua", "Encarregado de Obra", "Técnico de AVAC"],
        "Turismo, Hotelaria & Restauração": ["Recepcionista Bilíngue", "Sub-chefe de Cozinha", "Empregado de Andares", "Barman", "Gestor de Alojamento Local"],
        "Indústria, Production & Manufatura": ["Operador de Linha de Produção", "Técnico de Manutenção", "Soldador Certificado", "Operador de CNC", "Responsável de Turno"],
        "Logística, Transportes & Armazém": ["Motorista de Pesados C+E", "Fiel de Armazém", "Gestor de Operações Logísticas", "Operador de Empilhador", "Estafeta de Logística Urbana"],
        "Comércio, Vendas & Retalho": ["Store Manager", "Assistente de Vendas", "Caixa de Supermercado", "Promotor Comercial", "Merchandiser"],
        "Administrativo, Gestão & RH": ["Técnico Administrativo", "Contabilista Junior", "Recrutador Especializado", "Secretariado de Direção", "Gestor de Projetos"],
        "Limpeza, Segurança & Serviços": ["Técnico de Limpeza Especializada", "Vigilante Certificado", "Jardineiro", "Auxiliar de Manutenção Predial", "Pest Control Specialist"],
        "Educação & Formação Profissional": ["Formador de Línguas", "Educador de Infância", "Tutor Académico", "Coordenador Pedagógico"],
        "Artes, Design & Multimédia": ["Graphic Designer", "Video Editor", "Content Creator", "UX Designer"],
        "Agricultura, Pesca & Pecuária": ["Trabalhador Agrícola", "Técnico Agrícola", "Operador de Máquinas Florestais"],
        "Apoio Social & Terceiro Setor": ["Assistente Social", "Mediador Intercultural", "Técnico de ONGs"],
        "Energia & Sustentabilidade": ["Técnico de Painéis Solares", "Gestor de Eficiência Energética", "Técnico Ambiental"],
        "Trabalho Remoto & Freelancing": ["Virtual Assistant", "Customer Success Representative", "Tradutor Freelance"]
    };

    const allJobs = [];

    WORK_TOPICS.forEach((topic) => {
        const titles = titlesByCategory[topic] || ["Profissional Qualificado", "Colaborador Operacional", "Especialista Setorial"];

        for (let i = 0; i < 8; i++) {
            const sourceUrl = JOB_SOURCES[Math.floor(Math.random() * JOB_SOURCES.length)];

            let tags = [];
            if (i === 0) tags.push("Urgente");
            if (i === 7) tags.push("Remoto");

            allJobs.push({
                title: titles[i % titles.length],
                location: PT_LOCATIONS[Math.floor(Math.random() * PT_LOCATIONS.length)],
                source_name: getSourceName(sourceUrl),
                source_url: sourceUrl.startsWith('http') ? sourceUrl : `https://${sourceUrl}`,
                tags: tags,
                category: "Emprego & Oportunidades",
                work_topic: topic
            });
        }
    });

    return allJobs.sort(() => Math.random() - 0.5);
};

async function seed() {
    const { count, error } = await supabase.from('job_posts').select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error checking DB:', error);
        return;
    }

    if (count === 0) {
        console.log('Inserting seed data into job_posts...');
        const jobs = generateMockJobs();

        // Inserir os dados na tabela (inserimos em batches para evitar limites)
        const BATCH_SIZE = 50;
        for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
            const batch = jobs.slice(i, i + BATCH_SIZE);
            const { error: insertError } = await supabase.from('job_posts').insert(batch);

            if (insertError) {
                console.error('Insert error in batch:', insertError);
            } else {
                console.log(`Inserted batch ${i / BATCH_SIZE + 1}...`);
            }
        }

        console.log('Seeded job_posts successfully!');
    } else {
        console.log(`Database already seeded with ${count} job_posts.`);
    }
}

seed();
