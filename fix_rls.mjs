import { createClient } from '@supabase/supabase-js';

const token = 'sbp_94aeed3fe712bdf7ff4a5c4301037568675fd933';
const ref = 'ychwhxkxsxmuvabxlyjn';

async function run() {
    const query = `
    DROP POLICY IF EXISTS "profiles: select" ON profiles;
    CREATE POLICY "profiles: select" ON profiles FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "profiles: insert" ON profiles;
    CREATE POLICY "profiles: insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
  `;

    const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    const data = await res.json();
    console.log("Response:", data);
}
run();
