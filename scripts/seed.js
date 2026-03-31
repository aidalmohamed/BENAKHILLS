import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || process.env.NEON_DATABASE_URL);

async function seed() {
  console.log('--- Seeding database ---');

  const models = [
    {
      display_id: "01",
      title: "Configuration 5 Chambres",
      title_en: "5 Bedroom Configuration",
      description: "Cette première configuration offre 5 chambres spacieuses, dont une suite au rez-de-chaussée, idéale pour recevoir ou pour profiter d'un espace de vie de plain-pied. À l'étage, 4 belles chambres lumineuses complètent la partie nuit, offrant confort et intimité.",
      images: ["/assets/19.png", "/assets/20.png", "/assets/3.png"],
      specs: [
        { label: "Chambres", value: "5" },
        { label: "Rez-de-chaussée", value: "Suite Parentale" },
      ]
    }
    // Add others if needed
  ];

  for (const m of models) {
    await sql`
      INSERT INTO models (display_id, title, title_en, description, images, specs)
      VALUES (${m.display_id}, ${m.title}, ${m.title_en}, ${m.description}, ${JSON.stringify(m.images)}, ${JSON.stringify(m.specs)})
      ON CONFLICT DO NOTHING
    `;
  }

  console.log('Seed finished.');
}

seed().catch(console.error);
