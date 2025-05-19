const express = require('express');
const cors = require('cors');
const app = express();
const scores = [];

app.use(cors());
app.use(express.json());

app.post('/submit-score', (req, res) => {
  const { name, score } = req.body;
  if (typeof name === 'string' && typeof score === 'number') {
    scores.push({ name, score });
    res.status(200).json({ message: 'Score saved!' });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Optional: Leaderboard
app.get('/leaderboard', (req, res) => {
  const top = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.json(top);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
