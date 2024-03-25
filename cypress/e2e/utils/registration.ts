export const Registration = {
  accountCreationForm: {
    genderMale: (): Cypress.Chainable => cy.get("#uniform-id_gender1"),
    genderFemale: (): Cypress.Chainable => cy.get("#uniform-id_gender2"),
    first_name: (): Cypress.Chainable => cy.get("#customer_firstname"),
    last_name: (): Cypress.Chainable => cy.get("#customer_lastname"),
    password: (): Cypress.Chainable => cy.get("#passwd"),
    email_validate: (): Cypress.Chainable => cy.get("#email"),
    birthdayDay: (): Cypress.Chainable => cy.get("#days"),
    birthdayMonth: (): Cypress.Chainable => cy.get("#months"),
    birthdayYear: (): Cypress.Chainable => cy.get("#years"),
    newsletterCheckbox: (): Cypress.Chainable => cy.get("#uniform-newsletter"),
    submitButton: (): Cypress.Chainable => cy.get("#submitAccount"),
  },
  signInPage: {
    createAccountForm: (): Cypress.Chainable => cy.get("#create-account_form"),
    email_create: (): Cypress.Chainable => cy.get("#email_create"),
    submitCreateButton: (): Cypress.Chainable => cy.get("#SubmitCreate"),
    loginForm: (): Cypress.Chainable => cy.get("#login_form"),
    email_login: (): Cypress.Chainable => cy.get("#email"),
    password: (): Cypress.Chainable =>
      cy.get('[data-validate="isPasswd"]#passwd'),
    submitLogin: (): Cypress.Chainable => cy.get("#SubmitLogin"),
    lostPassword: (): Cypress.Chainable => cy.get(".lost_password"),
  },

  userRegisteredWithSuccess: (name: string): void => {
    cy.get("p.alert-success").contains("Your account has been created.");
    cy.get('.logout[title="Log me out"]').should("be.visible");
    cy.get('.account span').should('have.text', name);
  },
};
