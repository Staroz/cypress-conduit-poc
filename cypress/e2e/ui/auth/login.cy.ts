describe("Login Page", 
  () => {
  beforeEach (()=> {
    cy.visit("/login")
  })

  it("should display the login form", ()=> {
    cy.get("form").should("be.visible");
    cy.get("input[placeholder='Email']").should("be.visible");
    cy.get("input[placeholder='Password']").should("be.visible");

  })
  it("should show error for invalid credentials", ()=> {
    cy.fixture("users").then((users)=> {
      cy.get("input[placeholder='Email']").type(users.invalidUser.email);                           
      cy.get("input[placeholder='Password']").type(users.invalidUser.password);                     
      cy.get("button[type='submit']").click();  
      cy.get(".error-messages").should("be.visible"); 
    })
  })
  it("should have a link to register page", ()=> {
    cy.get("a[href*='register']").should("be.visible"); 
  })

})