const resolveRequire = (name) => {
  try {
    // Prefer resolving from project root's node_modules when possible
    return require(require.resolve(name, { paths: [process.cwd()] }));
  } catch (e) {
    // Fallback to normal require (may resolve from global next's context)
    return require(name);
  }
};

module.exports = {
  plugins: [
    // Tailwind PostCSS plugin (Tailwind v4 uses `@tailwindcss/postcss`)
    (() => {
      try {
        const p = resolveRequire('@tailwindcss/postcss');
        return p();
      } catch (e) {
        // If the additional plugin isn't available, skip it so build can continue
        return () => {};
      }
    })(),
    // core tailwind and autoprefixer
    (() => {
      try {
        const t = resolveRequire('tailwindcss');
        return t();
      } catch (e) {
        return () => {};
      }
    })(),
    (() => {
      try {
        const a = resolveRequire('autoprefixer');
        return a();
      } catch (e) {
        return () => {};
      }
    })(),
  ],
};
