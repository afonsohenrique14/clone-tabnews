const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
});

const nextJest = require("next/jest");
/** @type {import('jest').Config} */

const createJestConfig = nextJest({ dir: "./" });

const config = {
  moduleDirectories: ["node_modules", "<rootDir>"],
};

const jestConfig = createJestConfig(config);

module.exports = jestConfig;
