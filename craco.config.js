// CRACO to save import aliases
// eslint-disable-next-line node/no-unpublished-require
const {CracoAliasPlugin} = require('react-app-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {},
    },
  ],
};
