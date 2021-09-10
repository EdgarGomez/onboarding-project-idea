/// <reference types="cypress" />

describe('<Form />', () => {
    it('<Form /> Validation and alerts', () => {
        cy.visit('/');
        cy.get('[data-testid=btn-submit]').click();

        cy.get('[data-testid=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'All fields are required.');

        cy.get('[data-cy=pet-input]').type('Flash');
        cy.get('[data-cy=owner-input]').type('Edgar');
        cy.get('[data-cy=date-input]').type('2021-12-10');
        cy.get('[data-cy=time-input]').type('10:30');
        cy.get('[data-cy=symptom-input]').type('Barks but is a cat.');

        cy.get('[data-testid=btn-submit]').click();

        cy.get('[data-cy=pet-input]').type('Batman');
        cy.get('[data-cy=date-input]').type('2021-12-10');
        cy.get('[data-cy=time-input]').type('10:30');
        cy.get('[data-cy=symptom-input]').type('The laziest cat in the world.');

        cy.get('[data-testid=btn-submit]').click();

        cy.get('[data-testid=alert]')
            .should('exist')
            .invoke('text')
            .should('equal', 'All fields are required.');
        
        cy.get('[data-cy=owner-input]').type('Marisa');

        cy.get('[data-testid=btn-submit]').click();
    })

    it('<Appointment /> Check appointments and delete theme', () => {
        cy.get('[data-testid=appointment]')
            .should('exist')

        cy.get('[data-testid=appointment] [data-testid=btn-delete]').click({multiple:true})
    })
})