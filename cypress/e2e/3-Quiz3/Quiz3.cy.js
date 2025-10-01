describe('OrangeHRM - Login & Dashboard Feature', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
  })

  it('TC01 - Valid Login', () => {
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
    cy.get('h6.oxd-text--h6').should('contain.text', 'Dashboard')
  })

  it('TC02 - Invalid Username', () => {
    cy.get('input[name="username"]').type('WrongUser')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('p.oxd-alert-content-text')
      .should('be.visible')
      .and('have.text', 'Invalid credentials')
  })

  it('TC03 - Invalid Password', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('wrongpass')
    cy.get('button[type="submit"]').click()

    cy.get('p.oxd-alert-content-text')
      .should('be.visible')
      .and('have.text', 'Invalid credentials')
  })

  it('TC04 - Usrname Kosong', () => {
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('span.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required')
  })

  it('TC05 - Password Kosong', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.get('span.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required')
  })

  it('TC06 - Username dan Passowrd Kosong', () => {
    cy.get('button[type="submit"]').click()

    cy.get('span.oxd-input-field-error-message')
      .should('have.length', 2)
      .and('contain.text', 'Required')
  })

  //Dashboard Test Case

  it('TC07 - Berhasil Masuk Dashboard', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('h6.oxd-text--h6').should('contain.text', 'Dashboard')
  })

  it('TC08 - Verify Navigation Menus', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('a[href="/web/index.php/admin/viewAdminModule"]').should('be.visible')
    cy.get('a[href="/web/index.php/pim/viewPimModule"]').should('be.visible')
    cy.get('a[href="/web/index.php/leave/viewLeaveModule"]').should('be.visible')
    cy.get('a[href="/web/index.php/time/viewTimeModule"]').should('be.visible')
  })

  it('TC09 - Verify Profile dan Dropdown', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.get('span.oxd-userdropdown-tab').click()
    cy.contains('Logout').should('be.visible')
  })

  it('TC10 - Logout Berhasil', () => {
  Cypress.on('uncaught:exception', () => false)

  cy.get('input[name="username"]').type('Admin')
  cy.get('input[name="password"]').type('admin123')
  cy.get('button[type="submit"]').click()

  cy.get('span.oxd-userdropdown-tab').click()
  cy.contains('Logout').click()

  cy.url().should('include', '/auth/login')
  cy.get('button[type="submit"]').should('be.visible')
})

})