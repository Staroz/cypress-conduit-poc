import { buildUser } from "../../support/factories/user.factory";
import { buildArticle } from "../../support/factories/article.factory";

describe("API: Favorites", { tags: ["@api", "@regression"] }, () => {
  const apiUrl = Cypress.env("apiUrl");
  let token: string;
  let articleSlug: string;

  beforeEach(() => {
    const user = buildUser();
    cy.registerViaApi(user);
    cy.loginViaApi(user.email, user.password).then((loggedInUser) => {
      token = loggedInUser.token!;
    });
    cy.createArticleViaApi(buildArticle()).then((article) => {
      articleSlug = article.slug!;
    });
  });

  it("should favorite an article", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/articles/${articleSlug}/favorite`,
      headers: { Authorization: `Token ${token}` },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.article.favorited).to.equal(true);
      expect(response.body.article.favoritesCount).to.equal(1);
    });
  });

  it("should unfavorite an article", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/articles/${articleSlug}/favorite`,
      headers: { Authorization: `Token ${token}` },
    }).then(() => {
      cy.request({
        method: "DELETE",
        url: `${apiUrl}/articles/${articleSlug}/favorite`,
        headers: { Authorization: `Token ${token}` },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.article.favorited).to.equal(false);
        expect(response.body.article.favoritesCount).to.equal(0);
      });
    });
  });
});
