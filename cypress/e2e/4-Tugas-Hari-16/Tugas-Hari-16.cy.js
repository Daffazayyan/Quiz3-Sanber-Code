describe('OrangeHRM - Login & Dashboard Feature', () => {

  beforeEach(() => {
    cy.intercept('GET', '**/dashboard/branding').as('getBranding');
    cy.intercept('GET', '**/orangehrm-logo.png').as('getLogo');
    cy.intercept('GET', '**/app.js').as('getAppJS');

    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  it('TC01 - Valid Login (Intercept API Login Sukses)', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302)

    cy.url().should('include', '/dashboard')
    cy.get('h6.oxd-text--h6').should('contain.text', 'Dashboard')
  })

  it('TC02 - Invalid Username (Intercept API Login Gagal)', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidLogin')

    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidLogin').its('response.statusCode').should('eq', 302)

    cy.get('p.oxd-alert-content-text')
      .should('be.visible')
      .and('have.text', 'Invalid credentials')
  })

  it('TC03 - Invalid Password', () => {
    cy.intercept('POST', '**/auth/validate').as('invalidPass');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.get('p.oxd-alert-content-text')
      .should('be.visible')
      .and('have.text', 'Invalid credentials');
  });

  it('TC04 - Username Kosong (Intercept API Branding)', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('span.oxd-input-field-error-message').should('be.visible');
  });

  it('TC05 - Password Kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('span.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required');
  });

  it('TC06 - Username dan Passowrd Kosong', () => {
    cy.get('button[type="submit"]').click();

    cy.get('span.oxd-input-field-error-message')
      .should('have.length', 2)
      .and('contain.text', 'Required');
  });

  it('TC07 - Berhasil Masuk Dashboard (Intercept API Dashboard)', () => {
    cy.intercept('GET', '**/dashboard/employees/action-summary').as('getDashboardActions')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('h6.oxd-text--h6').should('contain.text', 'Dashboard')

    cy.wait('@getDashboardActions').its('response.statusCode').should('eq', 200)
  })

  it('TC08 - Verify Navigation Menus', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.get('a[href*="viewAdminModule"]').should('be.visible');
    cy.get('a[href*="viewPimModule"]').should('be.visible');
    cy.get('a[href*="viewLeaveModule"]').should('be.visible');
    cy.get('a[href*="viewTimeModule"]').should('be.visible');
  });

  it('TC09 - Verify Profile dan Dropdown (Intercept API Buzz Feed)', () => {
    cy.intercept({
      pathname: '**/buzz/feed',
      query: {
        limit: '5',
      },
    }).as('getBuzzFeed')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@getBuzzFeed').its('response.statusCode').should('eq', 200)

    cy.get('span.oxd-userdropdown-tab').click()
    cy.contains('Logout').should('be.visible')
  })

  it('TC10 - Logout Berhasil', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')

    cy.get('span.oxd-userdropdown-tab').click()
    cy.contains('Logout').click()

    cy.url().should('include', '/auth/login')
    cy.get('button[type="submit"]').should('be.visible')
  })

})