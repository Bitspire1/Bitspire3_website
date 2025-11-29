const { spawnSync } = require('child_process');
const path = require('path');

// Force single-threaded mode for hosts that block pthread_create
process.env.UV_THREADPOOL_SIZE = '1';
process.env.GOMAXPROCS = '1';
process.env.NODE_OPTIONS = '--max-old-space-size=512';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.__NEXT_DISABLE_MEMORY_WATCHER = '1';
process.env.NEXT_DISABLE_SWC = '1';

// Preload our alias shim so Next's internal requires are remapped
require(path.join(process.cwd(), 'shims', 'alias.js'));

const nextBin = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next');

console.log('Building with single-threaded mode (no workers):', {
  UV_THREADPOOL_SIZE: process.env.UV_THREADPOOL_SIZE,
  GOMAXPROCS: process.env.GOMAXPROCS,
  NODE_OPTIONS: process.env.NODE_OPTIONS,
  NEXT_DISABLE_SWC: process.env.NEXT_DISABLE_SWC,
});

const res = spawnSync(process.execPath, [nextBin, 'build', '--no-lint'], { 
  stdio: 'inherit',
  env: process.env
});
if (res.error) {
  console.error('Build process failed to start:', res.error);
  process.exit(1);
}
process.exit(res.status);
