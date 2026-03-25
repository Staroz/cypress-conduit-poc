import { RegisterPage } from "../../../support/pages/register.page";
import { buildUser } from "../../../support/factories/user.factory";

const registerPage = new RegisterPage();

describe("UI: Register", () => {

  beforeEach(() => {
    registerPage.visit();
  });

  it("should display the register form", () => {
    cy.get("form").should("be.visible");
    cy.get(registerPage.usernameInput).should("be.visible");
    cy.get(registerPage.emailInput).should("be.visible");
    cy.get(registerPage.passwordInput).should("be.visible");
  });

  it("should register a new user", () => {
    const user = buildUser();
    registerPage.registerWith(user.username, user.email, user.password);
    cy.url().should("not.include", "/register");
    cy.get(".nav-link").should("contain.text", user.username);
  });

  it("should have a link to login page", () => {
    cy.get(registerPage.loginLink).should("be.visible");
    cy.get(registerPage.loginLink).click();
    cy.url().should("include", "/login");
  });
});
