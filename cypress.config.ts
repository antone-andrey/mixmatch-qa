import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    apiUrl: "https://petstore.swagger.io/v2",
  },
  e2e: {
    baseUrl: "http://www.automationpractice.pl/",
    supportFile: 'cypress/support/commands.ts',
    specPattern: 'cypress/e2e/**/*.spec.ts',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
