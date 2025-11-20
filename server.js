const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// Handle client-side routing - always serve index.html for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
