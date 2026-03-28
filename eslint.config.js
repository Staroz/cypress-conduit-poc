const cypressPlugin = require("eslint-plugin-cypress");

module.exports = [
  {
    files: ["cypress/**/*.ts"],
    plugins: {
      cypress: cypressPlugin,
    },
    languageOptions: {
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        before: "readonly",
        afterEach: "readonly",
        after: "readonly",
        expect: "readonly",
      },
    },
    rules: {
      "cypress/no-unnecessary-waiting": "error",
      "cypress/assertion-before-screenshot": "warn",
      "no-unused-vars": "warn",
    },
  },
];
