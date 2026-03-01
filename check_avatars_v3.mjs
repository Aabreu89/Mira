
import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('urls_to_check.json', 'utf8'));

async function check() {
    console.log(`Checking ${urls.length} URLs...`);
    const broken = [];

    for (const url of urls) {
        try {
            const resp = await fetch(url, { method: 'HEAD', timeout: 5000 });
            if (!resp.ok) {
                broken.push(url);
                console.log(`❌ BROKEN: ${url} (Status: ${resp.status})`);
            }
        } catch (e) {
            broken.push(url);
            console.log(`❌ ERROR: ${url} (${e.message})`);
        }
    }

    console.log('\n--- Summary ---');
    console.log(`Total checked: ${urls.length}`);
    console.log(`Total broken: ${broken.length}`);
    if (broken.length > 0) {
        broken.forEach(url => console.log(url));
    }
}

check();
