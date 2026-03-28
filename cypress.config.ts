import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "mochawesome-report",
    overwrite: false,
    html: false,
    json: true,
    timestamp: "mmddyyyy_HHMMss",
  },
  allowCypressEnv: true,
  e2e: {
    baseUrl: "https://demo.realworld.show",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    env: {
      apiUrl: "https://api.realworld.show/api",
    },
    expose: {
      grepFilterSpecs: true,
      grepOmitFiltered: true,
    },
    setupNodeEvents(_on, config) {
      const { plugin } = require("@cypress/grep/plugin");
      plugin(config);
      return config;
    },
  },
});
