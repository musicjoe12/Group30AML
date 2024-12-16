module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // Use babel-jest for transforming JS/TS/JSX files
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios|antd|@mui|rc-.+)/)", // Ensure Jest transforms ES modules
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    "\\.(jpg|jpeg|png|svg|gif|webp|ico)$": "<rootDir>/__mocks__/fileMock.js", // Mock static files
  },
  testEnvironment: "jsdom", // Simulate a browser environment
  moduleFileExtensions: ["js", "jsx", "json", "node"], // Recognize these extensions
};
