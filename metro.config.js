const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

const localDir = path.resolve(__dirname, ".local");

const existingBlockList = config.resolver.blockList;
const extraPatterns = [
  new RegExp(`^${escapeRegex(localDir)}.*`),
  /[/\\]\.local[/\\]/,
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

if (Array.isArray(existingBlockList)) {
  config.resolver.blockList = [...existingBlockList, ...extraPatterns];
} else if (existingBlockList instanceof RegExp) {
  config.resolver.blockList = [existingBlockList, ...extraPatterns];
} else {
  config.resolver.blockList = extraPatterns;
}

const originalWatchFolders = config.watchFolders || [];
config.watchFolders = originalWatchFolders.filter(
  (folder) => !folder.startsWith(localDir)
);

module.exports = config;
