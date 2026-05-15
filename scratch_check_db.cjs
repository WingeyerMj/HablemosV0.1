const db = require('./node-backend/src/config/db');

async function check() {
    try {
        console.log('--- home_section_about ---');
        const [aboutRows] = await db.query('SELECT * FROM home_section_about');
        console.log(JSON.stringify(aboutRows, null, 2));

        console.log('\n--- dynamic_sections (about) ---');
        const [dsRows] = await db.query("SELECT * FROM dynamic_sections WHERE slug = 'about'");
        console.log(JSON.stringify(dsRows, null, 2));

        process.exit(0);
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
}

check();
