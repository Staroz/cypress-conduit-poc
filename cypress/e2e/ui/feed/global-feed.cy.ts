describe("Global Feed", 
  // {tags: ["@ui", "@smoke"]}, 
  () => {
  beforeEach (()=> {
    cy.visit("/")
  })

  it("should display the app name in the banner", ()=> {
    cy.get(".banner h1").should("be.visible");
  })
  it("should display the global feed tab", ()=> {
    cy.get(".feed-toggle").should("be.visible");
  })
  it("should display a list of articles", ()=> {
    cy.get(".article-preview").should("have.length.greaterThan", 0)
  })
  it("should display popular tags in the sidebar", ()=> {
    cy.get(".tag-list .tag-pill").should("have.length.greaterThan", 0)
  })
})