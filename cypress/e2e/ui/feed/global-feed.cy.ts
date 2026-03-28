import { FeedPage } from "../../../support/pages/feed.page";

const feedPage = new FeedPage();

describe("Global Feed", { tags: ["@ui", "@smoke"] }, () => {

  it("should load articles from the real API", () => {
    cy.intercept("GET", "**/articles*").as("getArticles");
    feedPage.visit();
    cy.wait("@getArticles").its("response.statusCode").should("equal", 200);
    cy.get(feedPage.articlePreviews).should("have.length.greaterThan", 0);
  });

  it("should receive a valid tags list from the API", () => {
    cy.intercept("GET", "**/tags").as("getTags");
    feedPage.visit();
    cy.wait("@getTags")
      .its("response.body.tags")
      .should("be.an", "array")
      .and("have.length.greaterThan", 0);
  });

  it("should display stubbed articles from fixture", () => {
    cy.intercept("GET", "**/articles*", { fixture: "articles-stub.json" }).as("stubbedArticles");
    feedPage.visit();
    cy.wait("@stubbedArticles");
    cy.get(feedPage.articlePreviews).should("have.length", 2);
    cy.get(feedPage.articlePreviews).first().should("contain.text", "Stubbed Article One");
    cy.get(feedPage.articlePreviews).last().should("contain.text", "Stubbed Article Two");
  });

  it("should handle API error gracefully", { tags: ["@regression"] }, () => {
    cy.on("uncaught:exception", () => false);
    cy.intercept("GET", "**/articles**", { statusCode: 500, body: {} }).as("serverError");
    feedPage.visit();
    cy.wait("@serverError");
    cy.get(feedPage.banner).should("be.visible");
  });
});
