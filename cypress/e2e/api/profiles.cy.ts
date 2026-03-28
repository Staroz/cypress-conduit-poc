import { buildUser } from "../../support/factories/user.factory";

describe("API: Profiles", { tags: ["@api", "@regression"] }, () => {
  const apiUrl = Cypress.env("apiUrl");
  let token: string;
  let username: string;

  beforeEach(() => {
    const user = buildUser();
    cy.registerViaApi(user);
    cy.loginViaApi(user.email, user.password).then((loggedInUser) => {
      token = loggedInUser.token!;
      username = loggedInUser.username;
    });
  });

  it("should get own profile", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/profiles/${username}`,
      headers: { Authorization: `Token ${token}` },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.profile.username).to.equal(username);
      expect(response.body.profile).to.have.property("bio");
      expect(response.body.profile).to.have.property("image");
      expect(response.body.profile).to.have.property("following");
    });
  });

  it("should get current user details", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/user`,
      headers: { Authorization: `Token ${token}` },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.user.username).to.equal(username);
      expect(response.body.user).to.have.property("email");
      expect(response.body.user).to.have.property("token");
    });
  });

  it("should update user bio", () => {
    const newBio = "Updated bio for testing";
    cy.request({
      method: "PUT",
      url: `${apiUrl}/user`,
      headers: { Authorization: `Token ${token}` },
      body: {
        user: { bio: newBio },
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.user.bio).to.equal(newBio);
      expect(response.body.user.username).to.equal(username);
    });
  });

  it("should fail to get user without auth", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/user`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([401, 422]);
    });
  });
});
