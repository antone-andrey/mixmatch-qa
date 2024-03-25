import { Registration } from "../utils/registration";
import { generateRandomNumber } from "../utils/helpers";

const url = `${Cypress.config("baseUrl")}`;
const signInPage = Registration.signInPage;
const registrationPage = Registration.accountCreationForm;
const testAccount = "aaa@test.com";
const testPassword = "password";

describe("Test the user registration flow", () => {
  beforeEach(() => {
    cy.visit(url);
    cy.get("#header_logo").should("be.visible");
    cy.get(".login").as("sign in").should("be.visible");
    cy.get("@sign in").click();
  });

  it("Registration and login forms", () => {
    Object.values(signInPage).forEach((el) => {
      el().should("be.visible");
    });
  }),
    it("Type wrong email format", () => {
      signInPage.email_create().type("random-email");
      signInPage.submitCreateButton().should("be.enabled").click();
      cy.get("#create_account_error").should("be.visible");
      cy.get("li").contains("Invalid email address.").should("be.visible");
    }),
    it("Register a new account", () => {
      const firstName = "Andrei";
      const lastName = "Antone";
      const fullName = firstName + " " + lastName;
      let randomNumber = generateRandomNumber();
      const email = `correct-email${randomNumber}@yahoo.com`;
      signInPage.email_create().type(email);
      signInPage.submitCreateButton().should("be.enabled").click();
      cy.url().should("contain", "#account-creation");
      cy.contains("h3", "Your personal information").should("be.visible");
      registrationPage.genderMale().click();
      registrationPage.first_name().type(firstName);
      registrationPage.last_name().type(lastName);
      registrationPage.email_validate().as("email").should("be.visible");
      cy.get("@email").should("have.value", email);
      registrationPage.password().type("password");
      registrationPage.birthdayDay().select("22");
      registrationPage.birthdayMonth().select("1");
      registrationPage
        .birthdayYear()
        .select("1995")
        .should("have.value", "1995");
      registrationPage.newsletterCheckbox().click();
      registrationPage.submitButton().click();
      Registration.userRegisteredWithSuccess(fullName);
    }),
    it('Login with success', () => {
        signInPage.email_login().type(testAccount);
        signInPage.password().type(testPassword);
        signInPage.submitLogin().click();
        cy.url().should("contain", "my-account");
        cy.contains('p.info-account', 'Welcome to your account. Here you can manage all of your personal information and orders.');
    });
});
