const { neon } = require('@neondatabase/serverless');

const url = 'postgresql://neondb_owner:npg_D5N1MTEcgwsr@ep-patient-recipe-am771qfj-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const sql = neon(url);

async function init() {
  console.log('--- Initializing Database Schema (CommonJS) ---');
  
  try {
    await sql(`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        budget VARCHAR(50),
        configuration VARCHAR(100),
        message TEXT,
        status VARCHAR(20) DEFAULT 'nouveau',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await sql(`
      CREATE TABLE IF NOT EXISTS offers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        title_en text,
        title_ar text,
        description text,
        description_en text,
        description_ar text,
        price varchar(50) NOT NULL,
        surface varchar(50),
        rooms varchar(50),
        type varchar(50),
        features text,
        images jsonb DEFAULT '[]'::jsonb,
        active boolean DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await sql(`
      CREATE TABLE IF NOT EXISTS models (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        display_id varchar(10) NOT NULL,
        title text NOT NULL,
        title_en text,
        description text,
        description_en text,
        images jsonb DEFAULT '[]'::jsonb,
        specs jsonb DEFAULT '[]'::jsonb,
        active boolean DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await sql(`
      CREATE TABLE IF NOT EXISTS gallery (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        src text NOT NULL,
        title text,
        title_en text,
        description text,
        description_en text,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await sql(`
      CREATE TABLE IF NOT EXISTS carousel (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        src text NOT NULL,
        title text,
        subtitle text,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await sql(`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database Initialization Complete.');
  } catch (err) {
    console.error('SQL Error:', err);
  }
}

init();
