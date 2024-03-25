import { Home } from "../utils/homePage";

const homePage = Home;
const baseUrl = `${Cypress.config("baseUrl")}`;
const testAccount = "aaa@test.com";
const testPassword = "password";
const oneItemSearch = [
  { product: "blouse", itemNumber: 1, title: "Blouse", price: "$27" },
  {
    product: "FADED",
    itemNumber: 1,
    title: "Faded Short Sleeve T-shirts",
    price: "$17",
  },
];

const multipleItems = [
    { product: "dress", itemNumber: 7 },
  ];

const productNotAvailable =
  "This product is no longer in stock with those attributes but is available with others.";
const productInStock = "";

describe("Search for products", () => {
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get("#header_logo").should("be.visible");
    cy.get(".login").as("signInNav").should("be.visible");
    cy.get("@signInNav").click();
    cy.login(testAccount, testPassword);
    cy.visit(baseUrl);
  });

  it("Search for different products with one item", () => {
    oneItemSearch.forEach(({ product, itemNumber, title, price }) => {
      homePage.searchBar().clear().type(product);
      homePage.searchBarSubmit().click();
      cy.get(".product_img_link").as("item");
      cy.get("@item").should("be.visible").and("have.length", itemNumber);
      cy.get(".product-container .product-name").should("contain", title);
      cy.get("span.product-price").should("contain", price);
    });
  });

  it("Search for different products with multiple items", () => {
    multipleItems.forEach(({ product, itemNumber }) => {
      homePage.searchBar().clear().type(product);
      homePage.searchBarSubmit().click();
      cy.get(".product_img_link").as("item");
      cy.get("@item").should("be.visible").and("have.length", itemNumber);
      cy.get('span.heading-counter').should('contain.text', `${itemNumber} results have been found.`)      
    });
  });

  it("Change product availability status", () => {
    homePage.searchBar().clear().type(oneItemSearch[0].product);
    homePage.searchBarSubmit().click();
    cy.get(".product_img_link").click();
    cy.get('[itemprop="name"]').should("contain", oneItemSearch[0].title);
    cy.get("span#availability_value").should("contain", productNotAvailable);
    homePage.changeProductColor("White");
    cy.get("span#availability_value").should("contain", productInStock);
  });
});
