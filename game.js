fetch('https://your-node-server.com/submit-score', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, score })
});
