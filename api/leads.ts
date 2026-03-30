import { neon } from '@neondatabase/serverless';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const getDb = () => {
  const url = process.env.NEON_DATABASE_URL;
  if (!url) throw new Error('NEON_DATABASE_URL is not set');
  return neon(url);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const sql = getDb();

    // GET /api/leads — list all leads
    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
      return res.status(200).json(rows);
    }

    // POST /api/leads — insert a new lead
    if (req.method === 'POST') {
      const { name, email, phone, budget, configuration, message, status } = req.body;
      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'name, email, phone are required' });
      }
      const rows = await sql`
        INSERT INTO leads (name, email, phone, budget, configuration, message, status, created_at, updated_at)
        VALUES (${name}, ${email}, ${phone}, ${budget || ''}, ${configuration || ''}, ${message || ''}, ${status || 'nouveau'}, NOW(), NOW())
        RETURNING *
      `;
      return res.status(201).json(rows[0]);
    }

    // PATCH /api/leads — update status or notes
    if (req.method === 'PATCH') {
      const { id, status, notes } = req.body;
      if (!id) return res.status(400).json({ error: 'id is required' });

      if (status !== undefined) {
        await sql`UPDATE leads SET status = ${status}, updated_at = NOW() WHERE id = ${id}`;
      }
      if (notes !== undefined) {
        await sql`UPDATE leads SET notes = ${notes}, updated_at = NOW() WHERE id = ${id}`;
      }
      return res.status(200).json({ success: true });
    }

    // DELETE /api/leads?id=xxx
    if (req.method === 'DELETE') {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ error: 'id is required' });
      await sql`DELETE FROM leads WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    console.error('[API/leads]', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
