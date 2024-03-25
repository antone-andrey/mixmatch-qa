declare namespace Cypress {
  interface Chainable {
    dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    login(user: string, password: string): Chainable<JQuery<HTMLElement>>;
  }
}
