const identityFn = (n) => n;

module.exports = function JestConfig({} = {}, fn = identityFn) {
  return fn({
    moduleNameMapper: {
      "\\.(css)$": "identity-obj-proxy",
      // TODO: add proper config for ftl files
      "\\.(ftl)$": require.resolve("./ftl-mock.js"),
      "\\.(svg)$": require.resolve("./svg-mock.js"),
    },
    transform: {
      "\\.(ts|tsx)$": require.resolve("babel-jest"),
      "^.+\\.svg$": require.resolve("jest-svg-transformer"),
      "^(?!.*\\.(js|jsx|css|json)$)": require.resolve("razzle/config/jest/fileTransform.js"),
    },
    testMatch: [
      `<rootDir>/src/**/__tests__/**/*.(ts|js)?(x)`,
      `<rootDir>/src/**/?(*.)(spec|test).(ts|js)?(x)`,
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "json"],
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  });
};
