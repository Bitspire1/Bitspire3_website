const { spawnSync } = require('child_process');
const path = require('path');

// Conservative environment for low-resource hosts
process.env.UV_THREADPOOL_SIZE = process.env.UV_THREADPOOL_SIZE || '1';
process.env.GOMAXPROCS = process.env.GOMAXPROCS || '1';
process.env.NODE_OPTIONS = process.env.NODE_OPTIONS || '--max-old-space-size=512';

// Preload our alias shim so Next's internal requires are remapped
require(path.join(process.cwd(), 'shims', 'alias.js'));

const nextBin = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next');

console.log('Building with conservative thread settings:', {
  UV_THREADPOOL_SIZE: process.env.UV_THREADPOOL_SIZE,
  GOMAXPROCS: process.env.GOMAXPROCS,
  NODE_OPTIONS: process.env.NODE_OPTIONS,
});

const res = spawnSync(process.execPath, [nextBin, 'build'], { stdio: 'inherit' });
if (res.error) {
  console.error('Build process failed to start:', res.error);
  process.exit(1);
}
process.exit(res.status);
