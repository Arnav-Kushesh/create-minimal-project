describe('Start Minimal Critical Flows', () => {
    it('loads the homepage for a normal user', () => {
        cy.visit('/');
        cy.contains('create-minimal-project');
        cy.contains('Posts');
        // Ensure data loads from API
        cy.contains('Loading amazing content...').should('exist');
        cy.wait(3000); // Wait for API response
        cy.contains('Loading amazing content...').should('not.exist');
    });

    it('loads a post page', () => {
        cy.visit('/post/1');
        cy.contains('Loading amazing content...').should('exist');
        cy.wait(3000);
        cy.contains('Loading amazing content...').should('not.exist');
    });

    it('shows 404 for unknown routes', () => {
        cy.visit('/some-nonexistent-page');
        cy.contains('404');
    });

    it('health check endpoint works', () => {
        cy.request('http://localhost:3001/api/health').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'ok');
        });
    });
});
