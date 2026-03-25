Cypress.Commands.add("createArticleViaApi", (article: Article) => {
  const apiUrl = Cypress.env("apiUrl");
  const token = window.localStorage.getItem("jwtToken");
  return cy.request({
    method: "POST",
    url: `${apiUrl}/articles`,
    headers: {
      Authorization: `Token ${token}`,
    },
    body: { article },
  }).then((response) => response.body.article);
});

Cypress.Commands.add("deleteArticleViaApi", (slug: string) => {
  const apiUrl = Cypress.env("apiUrl");
  const token = window.localStorage.getItem("jwtToken");
  return cy.request({
    method: "DELETE",
    url: `${apiUrl}/articles/${slug}`,
    headers: {
      Authorization: `Token ${token}`,
    },
  });
});
