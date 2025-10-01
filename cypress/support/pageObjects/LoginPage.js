class LoginPage {
    // Selectors
  getUsernameInput() {
    return cy.get('input[name="username"]');
  }

  getPasswordInput() {
    return cy.get('input[name="password"]');
  }

  getLoginButton() {
    return cy.get('button[type="submit"]');
  }

  getErrorMessage() {
    return cy.get('p.oxd-alert-content-text');
  }

  getRequiredMessage() {
    return cy.get('span.oxd-input-field-error-message');
  }

  getDashboardHeader() {
    return cy.get('h6.oxd-text--h6');
  }

  // Actions
  visit(url) {
    cy.visit(url);
  }

  // Mengisi username
  typeUsername(username) {
    if (username) {
        this.getUsernameInput().type(username);
    }
  }

  // Mengisi password
  typePassword(password) {
    if (password) {
        this.getPasswordInput().type(password);
    }
  }

  // Klik tombol login
  clickLogin() {
    this.getLoginButton().click();
  }

  // Aksi gabungan untuk proses login
  login(username, password) {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }

  // Verifications
  
  verifyLoginSuccess(dashboardText) {
    cy.url().should('include', '/dashboard');
    this.getDashboardHeader().should('contain.text', dashboardText);
  }
  
  verifyInvalidCredentials(errorMessage) {
    this.getErrorMessage().should('be.visible').and('have.text', errorMessage);
  }

  verifyRequiredMessage(requiredMessage) {
    this.getRequiredMessage().should('be.visible').and('contain.text', requiredMessage);
  }
}

export default LoginPage;