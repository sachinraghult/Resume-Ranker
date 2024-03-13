module.exports = {
  globals: {
    google: {},
  },
  testEnvironment: "jsdom",
  resetMocks: false,
  setupFiles: ["jest-localstorage-mock"],
  moduleNameMapper: {
    "\\.(css|sass)$": "identity-obj-proxy",
  },
};
