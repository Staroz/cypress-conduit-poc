describe("Global Feed", { tags: ["@ui", "@smoke"] }, () => {

  it("should load articles from the real API", () => {
    cy.intercept("GET", "**/articles*").as("getArticles");
    cy.visit("/");
    cy.wait("@getArticles").its("response.statusCode").should("equal", 200);
    cy.get(".article-preview").should("have.length.greaterThan", 0);
  });

  it("should receive a valid tags list from the API", () => {
    cy.intercept("GET", "**/tags").as("getTags");
    cy.visit("/");
    cy.wait("@getTags")
      .its("response.body.tags")
      .should("be.an", "array")
      .and("have.length.greaterThan", 0);
  });

  it("should display stubbed articles from fixture", () => {
    cy.intercept("GET", "**/articles*", { fixture: "articles-stub.json" }).as("stubbedArticles");
    cy.visit("/");
    cy.wait("@stubbedArticles");
    cy.get(".article-preview").should("have.length", 2);
    cy.get(".article-preview").first().should("contain.text", "Stubbed Article One");
    cy.get(".article-preview").last().should("contain.text", "Stubbed Article Two");
  });

  it("should handle API error gracefully", { tags: ["@regression"] }, () => {
    cy.on("uncaught:exception", () => false);
    cy.intercept("GET", "**/articles**", { statusCode: 500, body: {} }).as("serverError");
    cy.visit("/");
    cy.wait("@serverError");
    cy.get(".banner").should("be.visible");
  });
});
