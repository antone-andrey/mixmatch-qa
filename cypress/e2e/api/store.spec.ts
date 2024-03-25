import { faker } from "@faker-js/faker";
let orderID: number;

describe("Access to pet store orders", () => {
  context("POST /store/order", () => {
    it("Place an order for a pet", () => {
      let date = faker.date.anytime();
      orderID = 1;
      cy.request({
        method: "POST",
        url: `https://petstore.swagger.io/v2/store/order`,
        failOnStatusCode: false,
        body: {
          id: orderID,
          petId: 5,
          quantity: 1,
          shipDate: date,
          status: "placed",
          complete: true,
        },
        headers: {
          api_key: "special-key",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.contain("placed");
        expect(response.body.petId).to.eq(5);
      });
    });
  });

  context("GET order by ID", () => {
    it("Find purchase order by ID", () => {
      cy.request({
        method: "GET",
        url: `https://petstore.swagger.io/v2/store/order/${orderID}`,
        failOnStatusCode: false,
        headers: {
            api_key: "special-key",
          },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(orderID);
      });
    });

    it("Negative: Find purchase order by not found ID", () => {
        cy.request({
          method: "GET",
          url: `https://petstore.swagger.io/v2/store/order/0`,
          failOnStatusCode: false,
          headers: {
            api_key: "special-key",
          },
        }).then((response) => {
          expect(response.status).to.eq(404);
          expect(response.statusText).to.eq("Not Found");
        });
      });

      it("Negative: Find purchase order by invalid ID", () => {
        cy.request({
          method: "GET",
          url: `https://petstore.swagger.io/v2/store/order/`,
          failOnStatusCode: false,
          headers: {
            api_key: "special-key",
          },
        }).then((response) => {
          expect(response.status).to.eq(405);
          expect(response.statusText).to.eq("Method Not Allowed");
        });
      });
  });
});
