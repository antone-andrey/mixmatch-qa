export const Cart = {
    modal: {
        success_message: (): Cypress.Chainable => cy.contains('h2', 'Product successfully added to your shopping cart'),
        product_img: (): Cypress.Chainable => cy.get('.product-image-container'),
        product_title: (): Cypress.Chainable => cy.get('#layer_cart_product_title'),
        product_quantity: (): Cypress.Chainable => cy.get('#layer_cart_product_quantity'),
        product_price: (): Cypress.Chainable => cy.get('#layer_cart_product_price'),
        continue_shopping_button: (): Cypress.Chainable => cy.get('[title="Continue shopping"]'),
        proceed_to_checkout: (): Cypress.Chainable => cy.get('[title="Proceed to checkout"]'),
        closeModal: (): Cypress.Chainable => cy.get('[title="Close window"]'),
    },
    checkoutCart: {
        cart_quantity: (): Cypress.Chainable => cy.get('.ajax_cart_quantity'),
        product_image: (): Cypress.Chainable => cy.get('.cart_product img'),
        product_title: (): Cypress.Chainable => cy.get('.cart_description .product-name'),
        product_availabilities: (): Cypress.Chainable => cy.get('td.cart_avail .label-success'),
        product_price: (): Cypress.Chainable => cy.get('td.cart_unit li.price'),
        cart_quantity_input: (): Cypress.Chainable => cy.get('.cart_quantity_input'),
        product_delete: (): Cypress.Chainable => cy.get('.cart_quantity_delete'),
        cart_total: (): Cypress.Chainable => cy.get('td.cart_total .price'),
        proceed_to_checkout: (): Cypress.Chainable => cy.get('[title="Proceed to checkout"]'),
        increase_quantity: (): Cypress.Chainable => cy.get('.cart_quantity_up'),
        decrease_quantity: (): Cypress.Chainable => cy.get('.cart_quantity_down'),
    }
}