describe('VotePath Application E2E Tests', () => {
    beforeEach(() => {
        // Visit the local server URL. 
        // Note: You must have the app running (e.g. `npx serve .`) before running cypress
        cy.visit('/');
    });

    it('displays the main dashboard correctly', () => {
        cy.get('h1').should('contain', 'VotePath');
        cy.get('h2').should('contain', 'Understand Your');
        cy.get('.dash-card').should('have.length', 4);
    });

    it('navigates to the timeline via the dashboard card', () => {
        cy.get('.dash-card[href="#timeline"]').click();
        cy.url().should('include', '#timeline');
        cy.get('h2').should('contain', 'Election Timeline');
        cy.get('.timeline-node').should('have.length', 6);
    });

    it('changes the persona and saves it', () => {
        // Click first-time voter persona
        cy.get('.persona-btn[data-id="first-time"]').click();
        
        // Assert UI updates
        cy.get('.persona-greeting-box').should('contain', 'First-Time Voter');
        
        // Assert localStorage updates
        cy.window().then((win) => {
            expect(win.localStorage.getItem('votePath_persona')).to.eq('first-time');
        });
    });

    it('navigates to settings and saves a mock API key', () => {
        cy.get('.sidebar-nav a[href="#settings"]').click();
        cy.url().should('include', '#settings');
        
        // Type a dummy key
        cy.get('#api-key-input').type('test_gemini_key_123');
        cy.get('#save-api-key').click();
        
        // Should show success message
        cy.get('#api-status-msg').should('contain', 'Saved');
        
        // Assert localStorage updates
        cy.window().then((win) => {
            expect(win.localStorage.getItem('votePath_geminiApiKey')).to.eq('test_gemini_key_123');
        });
    });

    it('handles assistant fallback mode when no API key is provided', () => {
        // Clear localStorage to ensure no key is set
        cy.clearLocalStorage();
        cy.visit('/#assistant');
        
        // Assert warning banner exists
        cy.get('.warning-banner').should('contain', 'Fallback mode');
        
        // Test fallback response
        cy.get('#assistant-input').type('how to register{enter}');
        cy.get('.assistant-message .msg-bubble').last().should('contain', 'register');
    });

    it('navigates backwards correctly using browser history', () => {
        cy.visit('/');
        cy.get('.dash-card[href="#timeline"]').click();
        cy.url().should('include', '#timeline');
        
        // Go back
        cy.go('back');
        cy.url().should('not.include', '#timeline');
        cy.get('h1').should('contain', 'VotePath');
    });
});
