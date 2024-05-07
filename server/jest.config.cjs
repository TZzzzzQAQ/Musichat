// jest.config.cjs
module.exports = {
  transform: {
    // Transform files with a 'js' or 'jsx' extension
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: 'node', // use 'node' if you're not using a browser environment
};
