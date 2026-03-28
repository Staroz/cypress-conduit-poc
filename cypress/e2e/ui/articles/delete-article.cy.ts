import { ArticlePage } from "../../../support/pages/article.page";
import { buildUser } from "../../../support/factories/user.factory";
import { buildArticle } from "../../../support/factories/article.factory";

const articlePage = new ArticlePage();

describe("UI: Delete Article", { tags: ["@ui", "@regression"] }, () => {
  const user = buildUser();
  let articleSlug: string;

  before(() => {
    cy.registerViaApi(user);
  });

  beforeEach(() => {
    cy.loginViaApi(user.email, user.password);
    cy.createArticleViaApi(buildArticle()).then((article) => {
      expect(article.slug).to.exist;
      articleSlug = article.slug!;
    });
  });

  it("should delete an article", () => {
    articlePage.visit(articleSlug);
    cy.intercept("DELETE", "**/articles/*").as("deleteArticle");
    articlePage.clickDelete();
    cy.wait("@deleteArticle");
    cy.url().should("not.include", "/article/");
  });
});
