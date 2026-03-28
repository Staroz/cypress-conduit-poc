import { buildUser } from "../../support/factories/user.factory";

describe("API: Authentication", { tags: ["@api", "@smoke"] }, () => {

  it("should register a new user", () => {
    const user = buildUser();
    cy.registerViaApi(user).then((registeredUser) => {
      expect(registeredUser).to.have.property("token");
      expect(registeredUser.email).to.equal(user.email);
      expect(registeredUser.username).to.equal(user.username);
    });
  });

  it("should login with registered user", () => {
    const user = buildUser();
    cy.registerViaApi(user).then(() => {
      cy.loginViaApi(user.email, user.password).then((loggedInUser) => {
        expect(loggedInUser).to.have.property("token");
        expect(loggedInUser.email).to.equal(user.email);
      });
    });
  });

  it("should return error for required field missing", { tags: ["@regression"] }, () => {
    const user = buildUser({ username: "" });
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/users`,
      body: {
        user
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(422);
      expect(response.body.errors).to.have.property("username");
      expect(response.body.errors.username[0]).to.eq("can't be blank");
    });
  });
});
