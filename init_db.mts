import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
if (!url) {
  console.error("No DATABASE_URL found.");
  process.exit(1);
}

const sql = neon(url);

async function main() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        budget TEXT,
        configuration TEXT,
        message TEXT,
        status TEXT DEFAULT 'nouveau',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        notes TEXT
      );
    `;
    console.log("Table 'leads' verified/created successfully.");
  } catch (err) {
    console.error("Error creating table leads:", err);
  }
}

main();
