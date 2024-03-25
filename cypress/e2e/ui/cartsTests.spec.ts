import { Home } from "../utils/homePage";
import { Cart } from "../utils/cart";

const homePage = Home;
const cart = Cart;
const baseUrl = `${Cypress.config("baseUrl")}`;
const testAccount = "aaa@test.com";
const testPassword = "password";
const searchItems = [
  { product: "blouse", itemNumber: 1, title: "Blouse", price: "$27" },
];
const productInStock = "In stock";

describe("Add products to the cart", () => {
  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get("#header_logo").should("be.visible");
    cy.get(".login").as("signInNav").should("be.visible");
    cy.get("@signInNav").click();
    cy.login(testAccount, testPassword);
    cy.visit(baseUrl);
  });

  afterEach(() => {
    cy.get('.logout[title="Log me out"]').click({ force: true });
  });

  it("Cart modal", () => {
    homePage.searchBar().clear().type(searchItems[0].product);
    homePage.searchBarSubmit().click();
    cy.get(".product_img_link").click();
    cy.get('[itemprop="name"]').should("contain", searchItems[0].title);
    homePage.changeProductColor("White");
    cy.get("span#availability_value").should("contain", productInStock);
    cy.get("#add_to_cart").click();
    cart.modal.success_message().should("be.visible");
    cart.modal.product_img().should("be.visible");
    cart.modal.continue_shopping_button().should("be.visible");
    cart.modal.proceed_to_checkout().should("be.visible");
    cart.modal.closeModal().should("be.visible");
    cart.modal.product_price().should("contain", searchItems[0].price);
    cart.modal.product_title().should("contain", searchItems[0].title);
  });

  it("Checkout cart", () => {
    homePage.searchBar().clear().type(searchItems[0].product);
    homePage.searchBarSubmit().click();
    cy.get(".product_img_link").click();
    cy.get('[itemprop="name"]').should("contain", searchItems[0].title);
    homePage.changeProductColor("White");
    cy.get("span#availability_value").should("contain", productInStock);
    cy.get("#add_to_cart").click();
    cart.modal.proceed_to_checkout().should("be.visible").click();
    cart.checkoutCart.product_price().should("contain", searchItems[0].price);
    cart.checkoutCart.product_title().should("contain", searchItems[0].title);
    cart.checkoutCart
      .cart_quantity_input()
      .should("have.value", searchItems[0].itemNumber);
    cart.checkoutCart.product_image().should("be.visible");
    cart.checkoutCart.product_delete().should("be.visible");
    cart.checkoutCart.cart_total().should("contain", searchItems[0].price);
  });

  it("Change quantity in the cart", () => {
    homePage.searchBar().clear().type(searchItems[0].product);
    homePage.searchBarSubmit().click();
    cy.get(".product_img_link").click();
    cy.get('[itemprop="name"]').should("contain", searchItems[0].title);
    homePage.changeProductColor("White");
    cy.get("span#availability_value").should("contain", productInStock);
    cy.get("#add_to_cart").click();
    cart.modal.proceed_to_checkout().should("be.visible").click();
    cart.checkoutCart.product_price().should("contain", searchItems[0].price);

    cart.checkoutCart.increase_quantity().should("be.visible").click();
    cart.checkoutCart.cart_quantity_input().should("have.value", 2);
    cart.checkoutCart.decrease_quantity().should("be.visible").click();
    cart.checkoutCart
      .cart_quantity_input()
      .should("have.value", searchItems[0].itemNumber);
    cart.checkoutCart.decrease_quantity().should("be.visible").click();
    cy.contains(".alert-warning", "Your shopping cart is empty.").should(
      "be.visible"
    );
  });

  it("Remove product from cart by decreasing to 0", () => {
    homePage.searchBar().clear().type(searchItems[0].product);
    homePage.searchBarSubmit().click();
    cy.get(".product_img_link").click();
    cy.get('[itemprop="name"]').should("contain", searchItems[0].title);
    homePage.changeProductColor("White");
    cy.get("span#availability_value").should("contain", productInStock);
    cy.get("#add_to_cart").click();
    cart.modal.proceed_to_checkout().should("be.visible").click();
    cart.checkoutCart
      .cart_quantity_input()
      .should("have.value", searchItems[0].itemNumber);
    cart.checkoutCart.decrease_quantity().should("be.visible").click();
    cy.contains(".alert-warning", "Your shopping cart is empty.").should(
      "be.visible"
    );
  });

  it("Remove product from cart using delete buton", () => {
    homePage.searchBar().clear().type(searchItems[0].product);
    homePage.searchBarSubmit().click();
    cy.get(".product_img_link").click();
    cy.get('[itemprop="name"]').should("contain", searchItems[0].title);
    homePage.changeProductColor("White");
    cy.get("span#availability_value").should("contain", productInStock);
    cy.get("#add_to_cart").click();
    cart.modal.proceed_to_checkout().should("be.visible").click();
    cart.checkoutCart
      .cart_quantity_input()
      .should("have.value", searchItems[0].itemNumber);
    cart.checkoutCart.product_delete().click();
    cy.contains(".alert-warning", "Your shopping cart is empty.").should(
      "be.visible"
    );
  });
});
