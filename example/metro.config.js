const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  watchFolders: [path.resolve(__dirname, '..')],
});
