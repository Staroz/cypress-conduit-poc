Cypress.Commands.add("loginViaApi", (email: string, password: string) => {
  const apiUrl = Cypress.env("apiUrl");
  return cy.request({
    method: "POST",
    url: `${apiUrl}/users/login`,
    body: { user: { email, password } },
  }).then((response) => {
    const { user } = response.body;
    window.localStorage.setItem("jwtToken", user.token);
    Cypress.env("authToken", user.token);
    return user;
  });
});

Cypress.Commands.add("registerViaApi", (user: User) => {
  const apiUrl = Cypress.env("apiUrl");
  return cy.request({
    method: "POST",
    url: `${apiUrl}/users`,
    body: {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    },
  }).then((response) => response.body.user);
});
