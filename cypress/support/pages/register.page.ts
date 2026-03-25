export class RegisterPage {
  readonly usernameInput = "input[placeholder='Username']";
  readonly emailInput = "input[placeholder='Email']";
  readonly passwordInput = "input[placeholder='Password']";
  readonly submitButton = "button[type='submit']";
  readonly errorMessages = ".error-messages";
  readonly loginLink = "a[href*='login']";

  visit() {
    cy.visit("/register");
    return this;
  }

  fillUsername(username: string) {
    cy.get(this.usernameInput).clear().type(username);
    return this;
  }

  fillEmail(email: string) {
    cy.get(this.emailInput).clear().type(email);
    return this;
  }

  fillPassword(password: string) {
    cy.get(this.passwordInput).clear().type(password);
    return this;
  }

  clickSubmit() {
    cy.get(this.submitButton).click();
    return this;
  }

  registerWith(username: string, email: string, password: string) {
    this.fillUsername(username);
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSubmit();
    return this;
  }
}
