import LoginPage from '../../support/pageObjects/LoginPage';

describe('OrangeHRM - Login Feature with POM', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.fixture('loginData').then(function (data) {
      this.data = data;
      loginPage.visit(this.data.url);
    });
  });

  it('TC01 - Valid Login', function () {
    loginPage.login(this.data.validCredentials.username, this.data.validCredentials.password);
    loginPage.verifyLoginSuccess(this.data.dashboardText);
  });

  it('TC02 - Invalid Username', function () {
    loginPage.login(this.data.invalidUsername.username, this.data.invalidUsername.password);
    loginPage.verifyInvalidCredentials(this.data.invalidCredentialsMessage);
  });
  
  it('TC03 - Invalid Password', function () {
    loginPage.login(this.data.invalidPassword.username, this.data.invalidPassword.password);
    loginPage.verifyInvalidCredentials(this.data.invalidCredentialsMessage);
  });

  it('TC04 - Username Kosong', function () {
    loginPage.login(null, this.data.validCredentials.password);
    loginPage.verifyRequiredMessage(this.data.requiredMessage);
  });

  it('TC05 - Password Kosong', function () {
    loginPage.login(this.data.validCredentials.username, null);
    loginPage.verifyRequiredMessage(this.data.requiredMessage);
  });
});