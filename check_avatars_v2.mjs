
import { PREDEFINED_AVATARS } from './constants.tsx';

async function checkAvatars() {
    console.log(`Checking ${PREDEFINED_AVATARS.length} avatars...`);
    const broken = [];

    for (const url of PREDEFINED_AVATARS) {
        try {
            const resp = await fetch(url, { method: 'HEAD', timeout: 5000 });
            if (!resp.ok) {
                broken.push(url);
                console.log(`❌ BROKEN: ${url} (Status: ${resp.status})`);
            } else {
                // console.log(`✅ OK: ${url}`);
            }
        } catch (e) {
            broken.push(url);
            console.log(`❌ ERROR: ${url} (${e.message})`);
        }
    }

    console.log('\n--- Summary ---');
    console.log(`Total checked: ${PREDEFINED_AVATARS.length}`);
    console.log(`Total broken: ${broken.length}`);
    if (broken.length > 0) {
        console.log('Broken URLs:');
        broken.forEach(url => console.log(url));
    }
}

checkAvatars();
