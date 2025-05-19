const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // this will come from Render's dashboard
  ssl: { rejectUnauthorized: false } // Required for Render Postgres
});

app.post('/submit-score', async (req, res) => {
  const { name, score } = req.body;
  if (typeof name === 'string' && typeof score === 'number') {
    try {
      await pool.query('INSERT INTO scores(name, score) VALUES($1, $2)', [name, score]);
      res.json({ message: 'Score saved!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'DB insert failed' });
    }
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const result = await pool.query('SELECT name, score FROM scores ORDER BY score DESC LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
