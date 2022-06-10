const path = require('path');
const express = require('express');
const app = express();
const distPath = 'build';
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, distPath)));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, `${distPath}/index.html`));
});

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
