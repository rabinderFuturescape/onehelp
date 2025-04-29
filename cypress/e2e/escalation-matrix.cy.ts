describe('Escalation Matrix', () => {
  beforeEach(() => {
    // Mock the authentication
    cy.window().then((win) => {
      win.localStorage.setItem('auth-storage', JSON.stringify({
        state: {
          user: {
            id: 'admin-user',
            email: 'admin@example.com',
            firstName: 'Admin',
            lastName: 'User',
            fullName: 'Admin User',
            role: 'admin',
          },
          token: 'mock-token',
          isAuthenticated: true,
        },
      }));
    });

    // Mock API responses
    cy.intercept('GET', '/v1/escalation-rules', {
      statusCode: 200,
      body: [
        {
          id: 'rule1',
          name: 'High Priority Issues',
          description: 'Escalation rule for high priority issues',
          priority: 'high',
          timeThresholdMinutes: 60,
          tiers: [
            {
              id: 'tier1',
              level: 1,
              assigneeRoleId: 'role1',
              slaHours: 4,
            },
            {
              id: 'tier2',
              level: 2,
              assigneeRoleId: 'role2',
              slaHours: 8,
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    }).as('getEscalationRules');

    cy.intercept('GET', '/v1/roles', {
      statusCode: 200,
      body: [
        { id: 'role1', name: 'Support Agent' },
        { id: 'role2', name: 'Team Lead' },
        { id: 'role3', name: 'Manager' },
      ],
    }).as('getRoles');

    cy.intercept('POST', '/v1/escalation-rules', {
      statusCode: 201,
      body: {
        id: 'new-rule',
        name: 'New Test Rule',
        description: 'New test rule description',
        priority: 'medium',
        timeThresholdMinutes: 120,
        tiers: [
          {
            id: 'new-tier1',
            level: 1,
            assigneeRoleId: 'role1',
            slaHours: 4,
          },
          {
            id: 'new-tier2',
            level: 2,
            assigneeRoleId: 'role2',
            slaHours: 8,
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }).as('createEscalationRule');

    cy.intercept('PUT', '/v1/escalation-rules/rule1', {
      statusCode: 200,
      body: {
        id: 'rule1',
        name: 'Updated Rule',
        description: 'Updated description',
        priority: 'high',
        timeThresholdMinutes: 90,
        tiers: [
          {
            id: 'tier1',
            level: 1,
            assigneeRoleId: 'role1',
            slaHours: 6,
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }).as('updateEscalationRule');

    cy.intercept('DELETE', '/v1/escalation-rules/rule1', {
      statusCode: 204,
    }).as('deleteEscalationRule');

    // Visit the escalation matrix page
    cy.visit('/settings/escalation');
  });

  it('displays the escalation rules', () => {
    cy.wait('@getEscalationRules');
    
    cy.contains('h1', 'Escalation Matrix').should('be.visible');
    cy.contains('High Priority Issues').should('be.visible');
    cy.contains('Escalation rule for high priority issues').should('be.visible');
    cy.contains('High').should('be.visible');
  });

  it('creates a new escalation rule', () => {
    cy.wait('@getEscalationRules');
    
    // Click the "Add New Rule" button
    cy.contains('button', 'Add New Rule').click();
    
    // Fill in the form
    cy.get('input[id="name"]').type('New Test Rule');
    cy.get('input[id="description"]').type('New test rule description');
    cy.get('select[id="priority"]').select('medium');
    cy.get('input[id="timeThresholdMinutes"]').clear().type('120');
    
    // Select a role for the first tier
    cy.get('select[id="tiers.0.assigneeRoleId"]').select('Support Agent');
    
    // Add a second tier
    cy.contains('button', 'Add Tier').click();
    
    // Select a role for the second tier
    cy.get('select[id="tiers.1.assigneeRoleId"]').select('Team Lead');
    cy.get('input[id="tiers.1.slaHours"]').clear().type('8');
    
    // Submit the form
    cy.contains('button', 'Create Rule').click();
    
    // Wait for the API call
    cy.wait('@createEscalationRule');
    
    // Verify the rule was added
    cy.contains('New Test Rule').should('be.visible');
  });

  it('edits an existing escalation rule', () => {
    cy.wait('@getEscalationRules');
    
    // Click the edit button on the rule
    cy.get('button[aria-label="Edit rule"]').click();
    
    // Update the form
    cy.get('input[id="name"]').clear().type('Updated Rule');
    cy.get('input[id="description"]').clear().type('Updated description');
    cy.get('input[id="timeThresholdMinutes"]').clear().type('90');
    
    // Update the SLA hours
    cy.get('input[id="tiers.0.slaHours"]').clear().type('6');
    
    // Remove the second tier if it exists
    if (cy.get('button[aria-label="Remove"]').length > 1) {
      cy.get('button[aria-label="Remove"]').eq(1).click();
    }
    
    // Submit the form
    cy.contains('button', 'Update Rule').click();
    
    // Wait for the API call
    cy.wait('@updateEscalationRule');
    
    // Verify the rule was updated
    cy.contains('Updated Rule').should('be.visible');
    cy.contains('Updated description').should('be.visible');
  });

  it('deletes an escalation rule', () => {
    cy.wait('@getEscalationRules');
    
    // Click the delete button on the rule
    cy.get('button[aria-label="Delete rule"]').click();
    
    // Confirm deletion
    cy.contains('button', 'Delete').click();
    
    // Wait for the API call
    cy.wait('@deleteEscalationRule');
    
    // Verify the rule was deleted
    cy.contains('No escalation rules found.').should('be.visible');
  });
});
