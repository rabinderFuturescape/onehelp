import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EscalationRuleCard } from '../EscalationRuleCard';

describe('EscalationRuleCard', () => {
  const mockRule = {
    id: 'rule1',
    name: 'Test Rule',
    description: 'Test Description',
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
  };
  
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the rule card with correct information', () => {
    render(
      <EscalationRuleCard
        rule={mockRule}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    expect(screen.getByText('Test Rule')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText(/Time threshold: 60 minutes/i)).toBeInTheDocument();
  });
  
  it('calls onEdit when edit button is clicked', () => {
    render(
      <EscalationRuleCard
        rule={mockRule}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Edit rule'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockRule);
  });
  
  it('calls onDelete when delete button is clicked', () => {
    render(
      <EscalationRuleCard
        rule={mockRule}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Delete rule'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockRule);
  });
  
  it('expands to show tiers when expand button is clicked', () => {
    render(
      <EscalationRuleCard
        rule={mockRule}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    // Initially, tiers should not be visible
    expect(screen.queryByText('Tier 1')).not.toBeInTheDocument();
    
    // Click expand button
    fireEvent.click(screen.getByLabelText('Expand'));
    
    // Now tiers should be visible
    expect(screen.getByText('Tier 1')).toBeInTheDocument();
    expect(screen.getByText('Tier 2')).toBeInTheDocument();
    expect(screen.getByText('SLA: 4 hours')).toBeInTheDocument();
    expect(screen.getByText('SLA: 8 hours')).toBeInTheDocument();
  });
});
