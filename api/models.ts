import { neon } from '@neondatabase/serverless';

const getDb = () => {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  return neon(url);
};

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const sql = getDb();

    // GET /api/models — list all models
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM models ORDER BY display_id ASC`;
      return res.status(200).json(rows);
    }

    // POST /api/models — create a new model
    if (req.method === 'POST') {
      const { display_id, title, title_en, description, description_en, images, specs, active } = req.body;
      if (!title || !display_id) {
        return res.status(400).json({ error: 'title and display_id are required' });
      }
      const rows = await sql`
        INSERT INTO models (display_id, title, title_en, description, description_en, images, specs, active, created_at, updated_at)
        VALUES (
          ${display_id},
          ${title},
          ${title_en || ''},
          ${description || ''},
          ${description_en || ''},
          ${JSON.stringify(images || [])},
          ${JSON.stringify(specs || [])},
          ${active !== undefined ? active : true},
          NOW(), NOW()
        )
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    // PUT /api/models — update a model
    if (req.method === 'PUT') {
      const { id, display_id, title, title_en, description, description_en, images, specs, active } = req.body;
      if (!id) return res.status(400).json({ error: 'id is required' });

      const rows = await sql`
        UPDATE models
        SET
          display_id     = ${display_id},
          title          = ${title},
          title_en       = ${title_en || ''},
          description    = ${description || ''},
          description_en = ${description_en || ''},
          images         = ${JSON.stringify(images || [])},
          specs          = ${JSON.stringify(specs || [])},
          active         = ${active !== undefined ? active : true},
          updated_at     = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
      return res.status(200).json(rows[0]);
    }

    // DELETE /api/models?id=xxx
    if (req.method === 'DELETE') {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ error: 'id is required' });
      await sql`DELETE FROM models WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('[API/models]', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
