module.exports = function noop() {
  return function () {
    return function (root) {
      // no-op PostCSS plugin
    };
  };
};
