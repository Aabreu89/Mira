const fs = require('fs');

async function checkAvatars() {
    const code = fs.readFileSync('constants.tsx', 'utf8');
    // Match the array PREDEFINED_AVATARS
    const match = code.match(/export const PREDEFINED_AVATARS = \[([\s\S]*?)\];/);
    if (!match) {
        console.error('Could not find PREDEFINED_AVATARS');
        return;
    }

    const urls = [];
    const regex = /"(https:\/\/images\.unsplash\.com\/photo-[^"]+)"/g;
    let m;
    while ((m = regex.exec(match[1])) !== null) {
        urls.push(m[1]);
    }

    console.log(`Checking ${urls.length} URLs...`);

    const broken = [];
    for (let i = 0; i < urls.length; i++) {
        try {
            const res = await fetch(urls[i], { method: 'HEAD' });
            if (!res.ok) {
                console.log(`Broken [${i}]: ${urls[i]} - ${res.status}`);
                broken.push(urls[i]);
            }
        } catch (e) {
            console.log(`Error [${i}]: ${urls[i]} - ${e.message}`);
            broken.push(urls[i]);
        }
    }

    console.log('Script done. Broken count: ' + broken.length);
}

checkAvatars();
