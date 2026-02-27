import { createClient } from '@supabase/supabase-js';
import process from 'process';

process.loadEnvFile('./.env.local');
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const MOCK_SERVICES = [
    // AIMA
    { title: "AIMA - Loja de Lisboa", category: "Documentos & Regularização", lat: 38.73, lng: -9.15, address: "Av. António Augusto de Aguiar 20, Lisboa", city: "Lisboa" },

    // CNAIM
    { title: "CNAIM Lisboa", category: "Comunidade & Solidariedade", lat: 38.72, lng: -9.13, address: "Rua Álvaro Coutinho 14, Lisboa", city: "Lisboa" },

    // IEFP
    { title: "IEFP Lisboa - Picoas", category: "Emprego & Oportunidades", lat: 38.73, lng: -9.14, address: "Rua Viriato 7, Lisboa", city: "Lisboa", email: "picoas@iefp.pt" },
    { title: "IEFP Porto - Centro de Emprego", category: "Emprego & Oportunidades", lat: 41.15, lng: -8.61, address: "Rua do Rosário 135, Porto", city: "Porto" },
    { title: "IEFP Faro - Centro de Emprego", category: "Emprego & Oportunidades", lat: 37.02, lng: -7.93, address: "Rua de S. Luis, Faro", city: "Faro" },
    { title: "IEFP Coimbra - Centro de Emprego", category: "Emprego & Oportunidades", lat: 40.20, lng: -8.41, address: "Rua do Brasil, Coimbra", city: "Coimbra" },
    { title: "IEFP Braga - Centro de Emprego", category: "Emprego & Oportunidades", lat: 41.55, lng: -8.42, address: "Rua do Caires, Braga", city: "Braga" },
    { title: "IEFP Aveiro - Centro de Emprego", category: "Emprego & Oportunidades", lat: 40.64, lng: -8.65, address: "Rua de Cabo Verde, Aveiro", city: "Aveiro" },

    // HOSPITAIS E CENTROS DE SAÚDE
    { title: "Hospital de Santa Maria (CHULN)", category: "Saúde & Bem-Estar", lat: 38.74, lng: -9.16, address: "Av. Prof. Egas Moniz, Lisboa", city: "Lisboa", type: "Hospital" },
    { title: "Hospital de São João (Porto)", category: "Saúde & Bem-Estar", lat: 41.18, lng: -8.60, address: "Alameda Prof. Hernâni Monteiro, Porto", city: "Porto", type: "Hospital" },
    { title: "Centro de Saúde de Arroios (SNS)", category: "Saúde & Bem-Estar", lat: 38.73, lng: -9.13, address: "Rua Ferreira da Silva, Lisboa", city: "Lisboa", type: "Centro de Saúde" },
    { title: "Centro de Saúde de Paranhos (Porto)", category: "Saúde & Bem-Estar", lat: 41.17, lng: -8.60, address: "Rua de Paranhos, Porto", city: "Porto", type: "Centro de Saúde" },
    { title: "Hospital de Faro (CHUA)", category: "Saúde & Bem-Estar", lat: 37.02, lng: -7.92, address: "Rua Leão Penedo, Faro", city: "Faro", type: "Hospital" },

    // ONGS E ASSOCIAÇÕES
    { title: "Casa do Brasil de Lisboa", category: "Comunidade & Solidariedade", lat: 38.71, lng: -9.14, address: "Rua da Luz Soriano 42, Lisboa", city: "Lisboa", email: "casadobrasildelisboa@gmail.com" },
    { title: "AAEIF - Apoio ao Imigrante", category: "Comunidade & Solidariedade", lat: 38.72, lng: -9.15, address: "Lisboa Centro", city: "Lisboa" },
    { title: "JRS Portugal - Serviço Jesuíta aos Refugiados", category: "Comunidade & Solidariedade", lat: 38.75, lng: -9.16, address: "Estrada da Buraca 8-12, Lisboa", city: "Lisboa" },
    { title: "Solidariedade Imigrante", category: "Comunidade & Solidariedade", lat: 38.71, lng: -9.13, address: "Rua da Madalena 8, Lisboa", city: "Lisboa" }
];

async function seed() {
    const { data, error } = await supabase.from('map_alerts').select('id');
    if (error) {
        console.error('Error fetching existing data:', error);
        return;
    }

    if (data.length === 0) {
        console.log('Inserting seed data into map_alerts...');
        const insertData = MOCK_SERVICES.map(s => {
            const { lat, lng, type, email, ...rest } = s;
            const contactInfo = {};
            if (type) contactInfo.type = type;
            if (email) contactInfo.email = email;
            return {
                ...rest,
                coordinates: `POINT(${lng} ${lat})`,
                contact_info: contactInfo
            };
        });
        const { error: insertError } = await supabase.from('map_alerts').insert(insertData);
        if (insertError) console.error('Insert error:', insertError);
        else console.log('Seeded successfully!');
    } else {
        console.log(`Database already seeded with ${data.length} services.`);
    }
}
seed();
