import { ArticlePage } from "../../../support/pages/article.page";
import { buildUser } from "../../../support/factories/user.factory";
import { buildArticle } from "../../../support/factories/article.factory";

const articlePage = new ArticlePage();

describe("UI: Comments", { tags: ["@ui", "@regression"] }, () => {
  const user = buildUser();
  let articleSlug: string;

  before(() => {
    cy.registerViaApi(user);
  });

  beforeEach(() => {
    cy.loginViaApi(user.email, user.password);
    cy.createArticleViaApi(buildArticle()).then((article) => {
      articleSlug = article.slug!;
    });
  });

  it("should add a comment to an article", () => {
    articlePage.visit(articleSlug);
    cy.intercept("POST", "**/comments").as("addComment");
    articlePage.addComment("This is a test comment from the UI");
    cy.wait("@addComment");
    cy.get(articlePage.commentList).should("contain.text", "This is a test comment from the UI");
  });
});
