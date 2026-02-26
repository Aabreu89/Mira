import fs from 'fs';
const token = 'sbp_94aeed3fe712bdf7ff4a5c4301037568675fd933';
const ref = 'ychwhxkxsxmuvabxlyjn';

async function run() {
    const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: `SELECT policyname, qual, with_check, cmd FROM pg_policies WHERE tablename = 'profiles';` })
    });
    const data = await res.json();
    fs.writeFileSync('rls_out.json', JSON.stringify(data, null, 2));
}
run();
