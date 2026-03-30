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
      CREATE TABLE IF NOT EXISTS carousel (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        src TEXT NOT NULL,
        title TEXT,
        title_en TEXT,
        subtitle TEXT,
        subtitle_en TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // GET /api/carousel — list all carousel items
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM carousel ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    // POST /api/carousel — add a new carousel item
    if (req.method === 'POST') {
      const { src, title, title_en, subtitle, subtitle_en } = req.body;
      if (!src) return res.status(400).json({ error: 'src is required' });

      const rows = await sql`
        INSERT INTO carousel (src, title, title_en, subtitle, subtitle_en)
        VALUES (${src}, ${title || ''}, ${title_en || ''}, ${subtitle || ''}, ${subtitle_en || ''})
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    // DELETE /api/carousel?id=xxx
    if (req.method === 'DELETE') {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ error: 'id is required' });
      await sql`DELETE FROM carousel WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('[API/carousel]', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
