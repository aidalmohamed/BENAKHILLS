import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const envLocal = fs.readFileSync('.env.local', 'utf8');
const dbUrlMatch = envLocal.match(/DATABASE_URL="([^"]+)"/);
const dbUrl = dbUrlMatch ? dbUrlMatch[1] : null;

if (!dbUrl) {
    console.error("No DB URL");
    process.exit(1);
}

const sql = neon(dbUrl);

async function run() {
    console.log("🧐 Checking Offers Table...");
    const data = await sql`SELECT id, title, price FROM offers ORDER BY id ASC`;
    console.log(JSON.stringify(data, null, 2));
}

run();
