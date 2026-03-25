export class LoginPage {
  readonly emailInput = "input[placeholder='Email']";
  readonly passwordInput = "input[placeholder='Password']";
  readonly submitButton = "button[type='submit']";
  readonly errorMessages = ".error-messages";
  readonly registerLink = "a[href*='register']";

  visit() {
    cy.visit("/login");
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

  submit() {
    cy.get(this.submitButton).click();
    return this;
  }

  loginWith(email: string, password: string) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
    return this;
  }
}
