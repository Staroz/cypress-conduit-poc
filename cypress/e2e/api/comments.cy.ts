import { buildUser } from "../../support/factories/user.factory";
import { buildArticle } from "../../support/factories/article.factory";

describe("API: Comments", () => {
  const apiUrl = Cypress.env("apiUrl");
  let token: string;
  let articleSlug: string;

  beforeEach(() => {
    const user = buildUser();
    cy.registerViaApi(user);
    cy.loginViaApi(user.email, user.password).then((loggedInUser) => {
      token = loggedInUser.token!;
    });
    cy.createArticleViaApi(buildArticle()).then((article) => {
      articleSlug = article.slug!;
    });
  });

  it("should add a comment to an article", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/articles/${articleSlug}/comments`,
      headers: { Authorization: `Token ${token}` },
      body: {
        comment: { body: "This is a test comment" },
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body.comment).to.have.property("id");
      expect(response.body.comment.body).to.equal("This is a test comment");
    });
  });

  it("should get comments for an article", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/articles/${articleSlug}/comments`,
      headers: { Authorization: `Token ${token}` },
      body: {
        comment: { body: "Comment to retrieve" },
      },
    }).then(() => {
      cy.request({
        method: "GET",
        url: `${apiUrl}/articles/${articleSlug}/comments`,
        headers: { Authorization: `Token ${token}` },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.comments).to.be.an("array");
        expect(response.body.comments.length).to.be.greaterThan(0);
      });
    });
  });

  it("should delete a comment", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/articles/${articleSlug}/comments`,
      headers: { Authorization: `Token ${token}` },
      body: {
        comment: { body: "Comment to delete" },
      },
    }).then((response) => {
      const commentId = response.body.comment.id;
      cy.request({
        method: "DELETE",
        url: `${apiUrl}/articles/${articleSlug}/comments/${commentId}`,
        headers: { Authorization: `Token ${token}` },
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.be.oneOf([200, 204]);
      });
    });
  });
});
