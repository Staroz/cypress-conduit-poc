import { ProfilePage } from "../../../support/pages/profile.page";
import { buildUser } from "../../../support/factories/user.factory";
import { buildArticle } from "../../../support/factories/article.factory";

const profilePage = new ProfilePage();

describe("UI: User Profile", { tags: ["@ui", "@regression"] }, () => {
  const user = buildUser();

  before(() => {
    cy.registerViaApi(user);
    cy.loginViaApi(user.email, user.password);
    cy.createArticleViaApi(buildArticle());
  });

  beforeEach(() => {
    cy.loginViaApi(user.email, user.password);
    profilePage.visit(user.username);
  });

  it("should display the user profile", () => {
    cy.get(profilePage.username).should("contain.text", user.username);
  });

  it("should display user articles", () => {
    cy.get(profilePage.articlePreviews).should("have.length.greaterThan", 0);
  });
});
