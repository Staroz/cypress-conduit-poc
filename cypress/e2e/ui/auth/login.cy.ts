import { LoginPage } from "../../../support/pages/login.page";
import { buildUser } from "../../../support/factories/user.factory";

const loginPage = new LoginPage();

describe("UI: Login", () => {
  const user = buildUser();

  before(() => {
    cy.registerViaApi(user);
  });

  beforeEach(() => {
    loginPage.visit();
  });

  it("should display the login form", () => {
    cy.get("form").should("be.visible");
    cy.get(loginPage.emailInput).should("be.visible");
    cy.get(loginPage.passwordInput).should("be.visible");
    cy.get(loginPage.submitButton).should("be.visible");
  });

  it("should login with valid credentials", () => {
    loginPage.loginWith(user.email, user.password);
    cy.url().should("not.include", "/login");
    cy.get(".nav-link").should("contain.text", user.username);
  });

  it("should show error for wrong password", () => {
    loginPage.loginWith(user.email, "wrongpassword123");
    cy.get(loginPage.errorMessages).should("be.visible");
  });

  it("should have a link to register page", () => {
    cy.get(loginPage.registerLink).should("be.visible");
    cy.get(loginPage.registerLink).click();
    cy.url().should("include", "/register");
  });
});
