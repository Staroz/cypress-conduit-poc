import { defineConfig } from "cypress";

  export default defineConfig({
    e2e: {
      baseUrl: 'https://demo.realworld.show',
      specPattern: 'cypress/e2e/**/*.cy.ts',
      supportFile: 'cypress/support/e2e.ts',
      viewportWidth: 1280,
      viewportHeight: 720,
      defaultCommandTimeout: 10000,
      requestTimeout: 10000,
      env: {
        apiUrl: 'https://api.realworld.show/api',
      },
    },
  });
