import { neon } from '@neondatabase/serverless';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const getDb = () => {
  const url = process.env.NEON_DATABASE_URL;
  if (!url) throw new Error('NEON_DATABASE_URL is not set');
  return neon(url);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const sql = getDb();

    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS gallery (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        src TEXT NOT NULL,
        title TEXT,
        title_en TEXT,
        description TEXT,
        description_en TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // GET /api/gallery — list all gallery items
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM gallery ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    // POST /api/gallery — add a new gallery item
    if (req.method === 'POST') {
      const { src, title, title_en, desc, description_en } = req.body;
      if (!src) return res.status(400).json({ error: 'src is required' });

      const rows = await sql`
        INSERT INTO gallery (src, title, title_en, description, description_en)
        VALUES (${src}, ${title || ''}, ${title_en || ''}, ${desc || ''}, ${description_en || ''})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    // DELETE /api/gallery?id=xxx
    if (req.method === 'DELETE') {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ error: 'id is required' });
      await sql`DELETE FROM gallery WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('[API/gallery]', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
