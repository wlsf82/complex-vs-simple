describe('Complexity vs. simplicity', () => {
  beforeEach(() => {
    // Arrange
    cy.visit('./src/index.html')
    cy.get('img[src="./sampleImg.png"]')
      .should('exist')
      .and('be.visible')
  })

  context('Complex', () => {
    it('scenario 1', () => {
      // Act
      cy.get('button[id="btn-img"]')
        .click()
      // Assert
      cy.get('img[src="./sampleImg.png"]')
        .should('not.exist')
      cy.get('img[src="./empty.png"]')
        .should('exist')
      cy.get('img[src="./empty.png"]')
        .should('be.visible')
    })

    it('scenario 2', () => {
      // Act
      cy.get('[id="btn-img"]')
        .click()
      // Assert
      cy.get('img[src="./sampleImg.png"]')
        .should('not.exist')
      cy.get('img[src="./empty.png"]')
        .as('emptyImg')
        .should('exist')
      cy.get('@emptyImg')
        .should('be.visible')
    })

    it('scenario 3', () => {
      // Act
      cy.get('[id="btn-img"]')
        .click()
      // Assert
      cy.get('div[class="img"]')
        .find('img')
        .should('have.attr', 'src', './empty.png')
    })
  })

  context('Simple', () => {
    beforeEach(() => {
      // Act
      cy.get('#btn-img').click()
    })

    it('scenario 1', () => {
      // Assert
      cy.get('img[src="./sampleImg.png"]')
        .should('not.exist')
      cy.get('img[src="./empty.png"]')
        .should('exist')
        .and('be.visible')
    })

    it('scenario 2', () => {
      // Assert
      cy.get('img[src="./sampleImg.png"]')
        .should('not.exist')
      cy.get('img[src="./empty.png"]')
        .should('be.visible')
    })

    it('scenario 3', () => {
      // Assert
      cy.get('div.img img')
        .should('have.attr', 'src', './empty.png')
    })

    it('scenario 4', () => {
      // Assert
      cy.get('img')
        .should('have.attr', 'src', './empty.png')
    })
  })
})
