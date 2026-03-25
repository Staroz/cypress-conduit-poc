import { EditorPage } from "../../../support/pages/editor.page";
import { ArticlePage } from "../../../support/pages/article.page";
import { buildUser } from "../../../support/factories/user.factory";
import { buildArticle } from "../../../support/factories/article.factory";

const editorPage = new EditorPage();
const articlePage = new ArticlePage();

describe("UI: Edit Article", () => {
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

  it("should edit an article title", () => {
    articlePage.visit(articleSlug);
    articlePage.clickEdit();
    const newTitle = "Updated Title " + Date.now();
    cy.get(editorPage.titleInput).should("not.have.value", "");
    editorPage.fillTitle(newTitle);
    editorPage.clickPublish();
    cy.get("h1").should("contain.text", newTitle);
  });
});
