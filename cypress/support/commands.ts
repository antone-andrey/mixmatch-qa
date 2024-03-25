Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add("login", (user: string, password: string) => {
  cy.get('#email').type(user);
  cy.get('[data-validate="isPasswd"]#passwd').type(password);
  cy.get("#SubmitLogin").click();
  cy.url().should("contain", "my-account");
});