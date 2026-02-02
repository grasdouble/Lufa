/* global module */
module.exports = function rspackDisableMinimizers() {
  return {
    name: 'rspack-disable-minimizers',
    configureWebpack() {
      return {
        optimization: {
          minimize: false,
          minimizer: [],
        },
      };
    },
  };
};
