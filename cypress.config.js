const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Using index.html directly is possible if there is no server running
    // but typically a local server like `npx serve .` should be running on 3000
    baseUrl: "http://localhost:3000",
    supportFile: false
  },
});
