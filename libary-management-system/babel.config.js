module.exports = {
  presets: [
    "@babel/preset-env", // Transform ES6+ to ES5
    "@babel/preset-react", // JSX support
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // Support async/await
  ],
};
