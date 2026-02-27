const fs = require('fs');
const urls = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1574701148212-8518049c7b2c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1589156288859-f0cb0d82b065?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1543165365-07232ed12fad?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1521146764736-5669326ce5a5?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1508214751196-bfd252d3aa05?w=400&h=400&fit=crop'
];

async function checkUrls() {
    const results = [];
    for (const url of urls) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
            clearTimeout(timeoutId);
            if (!res.ok) {
                results.push(`FAILED_HTTP: ${url} (${res.status})`);
            }
        } catch (e) {
            results.push(`FAILED_ERROR: ${url} (${e.message})`);
        }
    }
    fs.writeFileSync('test_images.out', results.join('\n') + '\nDone\n');
}
checkUrls();
