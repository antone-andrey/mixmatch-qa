export const Home = {
  searchBar: (): Cypress.Chainable => cy.get("#search_query_top"),
  searchBarSubmit: (): Cypress.Chainable => cy.get('[name="submit_search"]'),

  changeProductColor: (color: string): void => {
    cy.get(`[name="${color}"]`).click();
  },
};
