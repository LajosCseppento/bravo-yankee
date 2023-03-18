/* eslint-disable node/no-unpublished-require */
// CRACO to save import aliases
const {CracoAliasPlugin} = require('react-app-alias');
const CracoEnvPlugin = require('craco-plugin-env');
const packageJson = require('./package.json');

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {},
    },
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {
          REACT_APP_PACKAGE_NAME: packageJson.name,
          REACT_APP_PACKAGE_VERSION: packageJson.version,
        },
      },
    },
  ],
};
