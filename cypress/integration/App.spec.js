/// <reference types="cypress" />

describe('<App />', () => {
    it('<App /> Verify initial screen', () => {

        /* used data-cy because the recomedantion of good practices in cypress documentation. 
        But with the attributes that were already created with data-testid its ok */

        cy.visit('/');

        // check if text/elements exists (not recommended approach)
        cy.contains('h1','Veterinarian appointments');
        // check if text/elements exists (recommended approach)
        cy.get('[data-cy=title]')
            .invoke('text')
            .should('equal', 'Veterinarian appointments');

        // check the form exists
        cy.get('[data-cy=form-appointments]')
            .should('exist');

        // check inputs
        cy.get('[data-cy=pet-input]')
            .should('exist');
        cy.get('[data-cy=owner-input]')
            .should('exist');
        cy.get('[data-cy=date-input]')
            .should('exist')
            .should('have.prop', 'type')
            .should('equal', 'date');
        cy.get('[data-cy=time-input]')
            .should('exist')
            .should('have.prop', 'type')
            .should('equal', 'time');
        cy.get('[data-cy=symptom-input]')
            .should('exist');

        // check button
        cy.get('[data-testid=btn-submit]')
            .should('exist')
            .should('have.text', 'Add Appointment')

        cy.get('[data-cy=vet-link]')
            .should('exist')
            .should('have.attr', 'href')
            .should('eq', 'http://web.applapobla.es/stores/s/232/clinica-veterinaria-poblavet?lang=es');
        
            
    })
})