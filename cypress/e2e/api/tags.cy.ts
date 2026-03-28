describe("API: Tags", { tags: ["@api", "@smoke"] }, () => {
  const apiUrl = Cypress.env("apiUrl");

  it("should return a list of tags", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/tags`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.tags).to.be.an("array");
      expect(response.body.tags.length).to.be.greaterThan(0);
    });
  });
});
