const fs = require('fs');
const path = require('path');

for (const file of ['main.js', 'style.css']) {
  const src = path.join(__dirname, file);
  const dest = path.join(__dirname, 'public', file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

