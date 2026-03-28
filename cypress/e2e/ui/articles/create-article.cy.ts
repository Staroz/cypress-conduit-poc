import { EditorPage } from "../../../support/pages/editor.page";
import { buildUser } from "../../../support/factories/user.factory";
import { buildArticle } from "../../../support/factories/article.factory";

const editorPage = new EditorPage();

describe("UI: Create Article", { tags: ["@ui", "@smoke"] }, () => {
  const user = buildUser();

  before(() => {
    cy.registerViaApi(user);
  });

  beforeEach(() => {
    cy.loginViaApi(user.email, user.password);
    editorPage.visit();
    cy.url().should("include", "/editor");
  });

  it("should display the editor form", () => {
    cy.get(editorPage.titleInput).should("be.visible");
    cy.get(editorPage.descriptionInput).should("be.visible");
    cy.get(editorPage.bodyInput).should("be.visible");
    cy.get(editorPage.tagInput).should("be.visible");
  });

  it("should create an article successfully", () => {
    const article = buildArticle();
    cy.intercept("POST", "**/articles").as("createArticle");
    editorPage.createArticle(article.title, article.description, article.body, article.tagList);
    cy.wait("@createArticle").its("response.statusCode").should("be.oneOf", [200, 201, 307]);
    cy.url().should("include", "/article/");
    cy.get("h1").should("contain.text", article.title);
  });
});
