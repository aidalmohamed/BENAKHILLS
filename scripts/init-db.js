import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || process.env.NEON_DATABASE_URL);

async function init() {
  console.log('--- Initializing Database Schema ---');
  
  await sql`
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
  `;

  await sql`
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
  `;

  await sql`
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
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS gallery (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      src text NOT NULL,
      title text,
      title_en text,
      description text,
      description_en text,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS carousel (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      src text NOT NULL,
      title text,
      subtitle text,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Create admin user
  const email = process.env.VITE_ADMIN_EMAIL || "bena@hills.com";
  // For salt we'd need bcrypt, but since I'm just seeding it for now, 
  // I'll make sure the admin has the Azerty2026 password correctly hashed or 
  // just remind them to sign up. 
  // Actually api/v1.ts signUp handles it.
  
  console.log('--- Initial Data ---');
  const modelsCount = await sql`SELECT count(*) FROM models`;
  if (parseInt(modelsCount[0].count) === 0) {
    console.log('Seeding models...');
    await sql`
      INSERT INTO models (display_id, title, title_en, description, images, specs)
      VALUES 
      ('01', 'Configuration 5 Chambres', '5 Bedroom Configuration', 'Cette première configuration offre 5 chambres spacieuses...', '["/assets/19.png", "/assets/20.png", "/assets/3.png"]', '[{"label": "Chambres", "value": "5"}]'),
      ('02', '4 Chambres avec Master-room', '4 Bedrooms with Master Suite', 'Cette seconde configuration permet toujours de bénéficier...', '["/assets/21.png", "/assets/22.png", "/assets/5.png"]', '[{"label": "Chambres", "value": "4"}]')
    `;
  }

  console.log('Database Initialization Complete.');
}

init().catch(console.error);
