/// <reference types="cypress" />

describe('Reqres API Automation', () => {

  it('1. GET - List of users', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.page).to.equal(2);
    });
  });

  it('2. GET - Single user', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.data.id).to.equal(2);
    });
  });

  it('3. GET - Return 401 for a non-existent user', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401);
    });
  });

  it('4. POST - Create a new user', () => {
    const newUser = { name: 'Daffa Zayyan', job: 'QA Engineer' };
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: { 
        'x-api-key': "reqres-free-v1"
      },
      body: newUser
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.name).to.equal(newUser.name);
      expect(response.body.job).to.equal(newUser.job);
    });
  });

  it('5. PUT - Update an existing user', () => {
    const updatedUser = { name: 'Daffa Zayyan Updated', job: 'Senior QA' };
    cy.request({
      method: 'PUT',
      url: 'https://reqres.in/api/users/2',
      headers: { 
        'x-api-key': "reqres-free-v1"
      },
      body: updatedUser
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal(updatedUser.name);
    });
  });
  
  it('6. PATCH - Partially update an existing user', () => {
    const partialUpdate = { job: 'Lead QA' };
    cy.request({
      method: 'PATCH',
      url: 'https://reqres.in/api/users/2',
      headers: { 
        'x-api-key': "reqres-free-v1"
      },
      body: partialUpdate
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.job).to.equal(partialUpdate.job);
    });
  });

  it('7. DELETE - Delete a user', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: { 
        'x-api-key': "reqres-free-v1"
      },
    }).then((response) => {
      expect(response.status).to.equal(204);
    });
  });

  it('8. POST - Register Successful', () => {
    const userCredentials = { email: 'nopal.zyn@reqres.in', password: 'pistol' };
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/register',
      headers: { 
        'x-api-key': "reqres-free-v1"
      },
      body: userCredentials
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('9. POST - Login Unsuccessful', () => {
    const userCredentials = { email: 'dapa@zyn' };
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/login',
      headers: { 
        'x-api-key': "reqres-free-v1"
      },
      body: userCredentials,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error', 'Missing password');
    });
  });
});