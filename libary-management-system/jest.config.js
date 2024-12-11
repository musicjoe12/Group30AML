module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // Use babel-jest for transforming files
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios|antd|@mui|rc-.+)/)", // Ensure Jest transforms ES modules
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  testEnvironment: "jsdom", // Simulate a browser environment
  moduleFileExtensions: ["js", "jsx", "json", "node"], // Recognize these extensions
};
