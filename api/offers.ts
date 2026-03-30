import { neon } from '@neondatabase/serverless';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const getDb = () => {
  const url = process.env.NEON_DATABASE_URL;
  if (!url) throw new Error('NEON_DATABASE_URL is not set');
  return neon(url);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const sql = getDb();

    // GET /api/offers — list all offers
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM offers ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    // POST /api/offers — create a new offer
    if (req.method === 'POST') {
      const { title, title_en, title_ar, description, description_en, description_ar, price, surface, rooms, type, features, images, active } = req.body;
      if (!title) {
        return res.status(400).json({ error: 'title is required' });
      }
      const rows = await sql`
        INSERT INTO offers (title, title_en, title_ar, description, description_en, description_ar, price, surface, rooms, type, features, images, active, created_at, updated_at)
        VALUES (
          ${title},
          ${title_en || ''},
          ${title_ar || ''},
          ${description || ''},
          ${description_en || ''},
          ${description_ar || ''},
          ${price || ''},
          ${surface || ''},
          ${rooms || ''},
          ${type || 'villa'},
          ${features || ''},
          ${JSON.stringify(images || [])},
          ${active !== undefined ? active : true},
          NOW(), NOW()
        )
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    // PUT /api/offers — update an offer
    if (req.method === 'PUT') {
      const { id, title, title_en, title_ar, description, description_en, description_ar, price, surface, rooms, type, features, images, active } = req.body;
      if (!id) return res.status(400).json({ error: 'id is required' });

      const rows = await sql`
        UPDATE offers
        SET
          title          = ${title},
          title_en       = ${title_en || ''},
          title_ar       = ${title_ar || ''},
          description    = ${description || ''},
          description_en = ${description_en || ''},
          description_ar = ${description_ar || ''},
          price          = ${price || ''},
          surface        = ${surface || ''},
          rooms          = ${rooms || ''},
          type           = ${type || 'villa'},
          features       = ${features || ''},
          images         = ${JSON.stringify(images || [])},
          active         = ${active !== undefined ? active : true},
          updated_at     = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
      return res.status(200).json(rows[0]);
    }

    // DELETE /api/offers?id=xxx
    if (req.method === 'DELETE') {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ error: 'id is required' });
      await sql`DELETE FROM offers WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('[API/offers]', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
