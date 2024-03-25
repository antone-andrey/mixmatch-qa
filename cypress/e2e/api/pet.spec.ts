import { Status } from "../../fixtures/PET_POST";

const apiPet = `${Cypress.env("apiUrl")}/pet`;
const petUrl =
  '"https://media.istockphoto.com/id/1482199015/ro/fotografie/fericit-puppy-galez-corgi-14-s%C4%83pt%C4%83m%C3%A2ni-c%C3%A2ine-winking-g%C3%A2f%C3%A2ind-%C8%99i-%C8%99edin%C8%9Ba-izolat-pe-alb.jpg?s=1024x1024&w=is&k=20&c=6xPCoa2I3sl052C-roYDxVyKIbP7eelpC0Ggah-BLw8="';
let petID: number;

describe("Everthing about pets", () => {
  before(() => {
    cy.request("GET", "/");
  });
  context("GET pets", () => {
    it("Get Pets by status available", () => {
      cy.request({
        method: "GET",
        url: `${apiPet}/findByStatus`,
        qs: {
          status: Status.available,
        },
        headers: {
            api_key: "special-key",
          },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body[0].status).to.eq("available");
      });
    });

    it("Get Pets by status pending", () => {
      cy.request({
        method: "GET",
        url: `${apiPet}/findByStatus`,
        qs: {
          status: Status.pending,
        },
        headers: {
            api_key: "special-key",
          },
      }).then((response) => {
        console.log("response is" + response);
        expect(response.status).to.eq(200);
        expect(response.body[0].status).to.eq("pending");
      });
    });

    it("Get Pets by status sold", () => {
      cy.request({
        method: "GET",
        url: `${apiPet}/findByStatus`,
        qs: {
          status: Status.sold,
        },
      }).then((response) => {
        console.log("response is" + response);
        expect(response.status).to.eq(200);
        expect(response.body[0].status).to.eq("sold");
      });
    });

    it("Get Pets by id", () => {
        petID = 5;
        cy.request({
            method: "POST",
            url: "https://petstore.swagger.io/v2/pet",
            failOnStatusCode: false,
            body: {
              id: petID,
              categories: {
                id: 2,
                name: "Big dogs",
              },
              tags: [
                {
                  id: 2,
                  name: "tag",
                },
              ],
              name: "Diana",
              phoUrls: [petUrl],
              status: Status.available,
            },
            headers: {
              api_key: "special-key",
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq("Diana");
            expect(response.body.status).to.eq("available");
          });

        cy.request({
          method: "GET",
          url: `${apiPet}/${petID}`,
        }).then((response) => {
          console.log("response is" + response);
          expect(response.status).to.eq(200);
          expect(response.body.name).to.eq("Diana");
          expect(response.body.id).to.eq(petID);
        });
      });
  });

  context("NEGATIVE - error 404", () => {
        it("Get Pets by id fails with 404 error with id 0", () => {
            cy.request({
                method: "GET",
                url: `${apiPet}/0`,
                failOnStatusCode: false,
              }).then((response) => {
                expect(response.status).to.eq(404);
              });
    })
  })

  context("POST /pet", () => {
    it("Add a new pet", () => {
      cy.request({
        method: "POST",
        url: "https://petstore.swagger.io/v2/pet",
        failOnStatusCode: false,
        body: {
          id: 1,
          categories: {
            id: 2,
            name: "Big dogs",
          },
          tags: [
            {
              id: 2,
              name: "tag",
            },
          ],
          name: "Lia",
          phoUrls: [petUrl],
          status: Status.available,
        },
        headers: {
          api_key: "special-key",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq("Lia");
        expect(response.body.status).to.eq("available");
      });
    });

    it("Something bad happened error 500 code", () => {
      cy.request({
        method: "POST",
        url: "https://petstore.swagger.io/v2/pet",
        failOnStatusCode: false,
        body: {
          id: "invalidId",
          name: "pet",
          status: Status.available,
        },
        headers: {
          api_key: "special-key",
        },
      }).then((response) => {
        const expectedMessage = "something bad happened";
        const statusText = "Internal Server Error"
        expect(response.status).to.eq(500);
        expect(response.statusText).to.contain(statusText);
        expect(response.body.message).to.contain(expectedMessage);
      });
    });

    it("Add a new pet with missing inputs", () => {
      cy.request({
        method: "POST",
        url: "https://petstore.swagger.io/v2/pet",
        failOnStatusCode: false,
        body: {
          categories: {
            id: 2,
            name: "Big dogs",
          },
          tags: [
            {
              id: 2,
              name: "tag",
            },
          ],
          phoUrls: [petUrl],
        },
        headers: {
          api_key: "special-key",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.not.exist;
        expect(response.body.status).to.not.exist;
      });
    });

    context("PUT /pet", () => {
      it("Update an existing pet", () => {
        cy.request({
          method: "PUT",
          url: "https://petstore.swagger.io/v2/pet",
          failOnStatusCode: false,
          body: {
            id: 1,
            categories: {
              id: 2,
              name: "Small dogs",
            },
            tags: [
              {
                id: 2,
                name: "tag",
              },
            ],
            name: "Maya",
            phoUrls: [petUrl],
            status: Status.pending,
          },
          headers: {
            api_key: "special-key",
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.name).to.eq("Maya");
          expect(response.body.status).to.eq("pending");
          expect(response.body.id).to.eq(1);
        });
      });

      it("NEGATIVE: Update a pet with invalid url", () => {
        cy.request({
          method: "PUT",
          url: "https://petstore.swagger.io/v2/per",
          failOnStatusCode: false,
          body: {
            id: 33,
            categories: {
              id: 2,
              name: "Small dogs",
            },
            tags: [
              {
                id: 2,
                name: "tag",
              },
            ],
            name: "asdad",
            phoUrls: [petUrl],
            status: Status.pending,
          },
          headers: {
            api_key: "special-key",
          },
        }).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
    });
  });
});
