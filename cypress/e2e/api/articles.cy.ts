import { buildUser } from "../../support/factories/user.factory";
import { buildArticle } from "../../support/factories/article.factory";

describe("API: Articles CRUD", {
  tags: ["@api"]
}, () => {
  const apiUrl = Cypress.env("apiUrl");
  let token: string;

  beforeEach(() => {
    const user = buildUser();
    cy.registerViaApi(user);
    cy.loginViaApi(user.email, user.password).then((loggedInUser) => {
      token = loggedInUser.token!;
    });
  });

  it("should create a new article", () => {
    const article = buildArticle();
    cy.createArticleViaApi(article).then((createdArticle) => {
      expect(createdArticle).to.have.property("slug");
      expect(createdArticle.title).to.equal(article.title);
      expect(createdArticle.description).to.equal(article.description);
      expect(createdArticle.body).to.equal(article.body);
    });
  });

  it("should get an article by slug", () => {
    const article = buildArticle();
    cy.createArticleViaApi(article).then((createdArticle) => {
      cy.request({
        method: "GET",
        url: `${apiUrl}/articles/${createdArticle.slug}`,
        headers: { Authorization: `Token ${token}` },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.article.title).to.equal(article.title);
      });
    });
  });

  it("should update an article", () => {
    const article = buildArticle();
    const updatedTitle = "Updated: " + article.title;
    cy.createArticleViaApi(article).then((createdArticle) => {
      cy.request({
        method: "PUT",
        url: `${apiUrl}/articles/${createdArticle.slug}`,
        headers: { Authorization: `Token ${token}` },
        body: {
          article: { title: updatedTitle },
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.article.title).to.equal(updatedTitle);
      });
    });
  });

  it("should delete an article", () => {
    const article = buildArticle();
    cy.createArticleViaApi(article).then((createdArticle) => {
      cy.deleteArticleViaApi(createdArticle.slug!).then((response) => {
        expect(response.status).to.be.oneOf([200, 204]);
      });

      cy.request({
        method: "GET",
        url: `${apiUrl}/articles/${createdArticle.slug}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
  });

  it("should list articles", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/articles`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.articles).to.be.an("array");
      expect(response.body).to.have.property("articlesCount");
    });
  });
});
