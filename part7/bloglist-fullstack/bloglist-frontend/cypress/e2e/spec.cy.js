describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user1 = {
      name: 'minad',
      username: 'admin',
      password: 'ad_min'
    }

    const user2 = {
      name: 'test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user1)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('ad_min')
      cy.get('#login-button').click()
      cy.contains('minad logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
    cy.get('#username').type('admin')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong username or password')

    })
  })

  describe('Blogs', function() {
    it('User can like a blog', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('ad_min')
      cy.get('#login-button').click()

      cy.contains('new blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.contains('create').click()

      cy.contains('view').click()

      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('User can delete their blog', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('ad_min')
      cy.get('#login-button').click()

      cy.contains('new blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.contains('create').click()

      cy.contains('view').click()

      cy.contains('remove').click()

      cy.contains('testurl').should('not.exist')
    })

    it('User cannot delete other users blog', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('ad_min')
      cy.get('#login-button').click()

      cy.contains('new blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.contains('create').click()

      cy.contains('logout').click()

      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('view').click()

      cy.contains('remove').click()
      cy.contains('testurl')
    })
  })
})
