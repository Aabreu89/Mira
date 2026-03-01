import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Simple .env.local parser
function getEnv() {
    try {
        const content = fs.readFileSync('.env.local', 'utf8');
        const lines = content.split('\n');
        const env = {};
        lines.forEach(line => {
            const parts = line.split('=');
            if (parts.length === 2) {
                env[parts[0].trim()] = parts[1].trim();
            }
        });
        return env;
    } catch (e) {
        console.error('Could not read .env.local');
        return {};
    }
}

const env = getEnv();
const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const MOCK_USERS = [
    { name: 'Gabriel Silva', email: 'gabriel.silva@exemplo.pt', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Elena Santos', email: 'elena.santos@exemplo.pt', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Ricardo Dias', email: 'ricardo.dias@exemplo.pt', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
    { name: 'Sofia Costa', email: 'sofia.costa@exemplo.pt', avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' }
];

const MOCK_POSTS = [
    { title: 'Dúvida sobre Agendamento AIMA', content: 'Alguém conseguiu agendar para Porto recentemente? As vagas parecem esgotadas.', category: 'Residência e Legalização' },
    { title: 'Dicas de Aluguel em Lisboa', content: 'Cuidado com anúncios no Marketplace, muitos são burla. Peçam sempre para ver a casa antes de pagar caução.', category: 'Habitação' },
    { title: 'Empresas que contratam imigrantes', content: 'A área de hotelaria em Albufeira está com muita procura agora que o verão se aproxima.', category: 'Emprego e Formação' },
    { title: 'Acesso ao SNS para recém-chegados', content: 'Fui ao centro de saúde hoje e consegui o número de utente apenas com o NIF e passaporte.', category: 'Saúde (SNS)' },
    { title: 'Eventos culturais da comunidade', content: 'Teremos uma festa de ritmos brasileiros em Arroios no próximo sábado. Todos convidados!', category: 'Histórias & Vozes Migrantes' }
];

async function seed() {
    console.log('Starting seed...');

    for (const mockUser of MOCK_USERS) {
        const randomAuthorId = crypto.randomUUID();

        // Create Profile
        const { error: profError } = await supabase.from('profiles').upsert([
            { id: randomAuthorId, name: mockUser.name, email: mockUser.email, avatar_url: mockUser.avatar_url, role: 'member' }
        ], { onConflict: 'id' });

        if (profError) {
            console.warn(`Could not insert profile for ${mockUser.name}:`, profError.message);
        }

        const post = MOCK_POSTS[Math.floor(Math.random() * MOCK_POSTS.length)];
        const { error: postError } = await supabase.from('posts').insert([
            {
                author_id: randomAuthorId,
                title: post.title,
                content: post.content,
                category: post.category,
                validation_status: 'validated',
                reports: Math.floor(Math.random() * 5) // Add some reports for moderation testing
            }
        ]);

        if (postError) {
            console.error(`Error inserting post for ${mockUser.name}:`, postError.message);
        } else {
            console.log(`Inserted post from ${mockUser.name}`);
        }
    }

    console.log('Seed finished.');
}

seed();
