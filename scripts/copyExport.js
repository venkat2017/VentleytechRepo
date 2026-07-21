const fs = require('fs');
const path = require('path');

const candidates = [
  path.resolve('.next', 'output', 'export'),
  path.resolve('out'),
  path.resolve('.next', 'export'),
];

let src = null;
for (const c of candidates) {
  if (fs.existsSync(c)) { src = c; break; }
}
const dest = path.resolve('dist');

if (!src) {
  console.error('Export folder not found. Checked:', candidates.join(', '));
  process.exit(1);
}

function copyRecursiveSync(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  if (typeof fs.cpSync === 'function') {
    fs.cpSync(src, dest, { recursive: true });
  } else {
    copyRecursiveSync(src, dest);
  }
  console.log('Export copied to', dest);
} catch (err) {
  console.error('Failed to copy export:', err);
  process.exit(1);
}
