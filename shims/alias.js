const Module = require('module');
const path = require('path');

const origResolve = Module._resolveFilename;

Module._resolveFilename = function(request, parent, isMain, options) {
  if (request === '@tailwindcss/postcss') {
    try {
      // Prefer a real installed @tailwindcss/postcss
      return origResolve.call(this, request, parent, isMain, options);
    } catch (e) {
      try {
        // Fallback to resolving `tailwindcss` from project root
        return origResolve.call(this, 'tailwindcss', parent, isMain, options);
      } catch (e2) {
        // Last resort: point to a no-op module bundled with the project
        return path.join(process.cwd(), 'shims', 'noop-postcss.js');
      }
    }
  }
  return origResolve.call(this, request, parent, isMain, options);
};
