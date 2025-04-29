import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EscalationRuleForm } from '../EscalationRuleForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the useRoles hook
jest.mock('@/hooks/useRoles', () => ({
  useRoles: () => ({
    data: [
      { id: 'role1', name: 'Support Agent' },
      { id: 'role2', name: 'Team Lead' },
    ],
    isLoading: false,
  }),
}));

describe('EscalationRuleForm', () => {
  const mockOnSubmit = jest.fn();
  
  const renderComponent = (isSubmitting = false, initialData = undefined) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    
    return render(
      <QueryClientProvider client={queryClient}>
        <EscalationRuleForm
          onSubmit={mockOnSubmit}
          isSubmitting={isSubmitting}
          initialData={initialData}
        />
      </QueryClientProvider>
    );
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the form with default values', () => {
    renderComponent();
    
    expect(screen.getByLabelText(/Rule Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time Threshold/i)).toBeInTheDocument();
    expect(screen.getByText(/Escalation Tiers/i)).toBeInTheDocument();
    expect(screen.getByText(/Tier 1/i)).toBeInTheDocument();
  });
  
  it('allows adding and removing tiers', () => {
    renderComponent();
    
    // Initially there should be one tier
    expect(screen.getByText(/Tier 1/i)).toBeInTheDocument();
    
    // Add a new tier
    fireEvent.click(screen.getByText(/Add Tier/i));
    expect(screen.getByText(/Tier 2/i)).toBeInTheDocument();
    
    // Remove the second tier
    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    fireEvent.click(removeButtons[1]); // Second remove button
    
    // Now there should only be one tier again
    expect(screen.queryByText(/Tier 2/i)).not.toBeInTheDocument();
  });
  
  it('submits the form with valid data', async () => {
    renderComponent();
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Rule Name/i), {
      target: { value: 'Test Rule' },
    });
    
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test Description' },
    });
    
    fireEvent.change(screen.getByLabelText(/Time Threshold/i), {
      target: { value: '120' },
    });
    
    // Select a role for the tier
    fireEvent.change(screen.getByLabelText(/Assignee Role/i), {
      target: { value: 'role1' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Create Rule/i));
    
    // Check if onSubmit was called with the correct data
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test Rule',
      description: 'Test Description',
      timeThresholdMinutes: 120,
      tiers: [expect.objectContaining({
        level: 1,
        assigneeRoleId: 'role1',
        slaHours: 4,
      })],
    }));
  });
  
  it('shows validation errors for required fields', async () => {
    renderComponent();
    
    // Submit the form without filling required fields
    fireEvent.click(screen.getByText(/Create Rule/i));
    
    // Check for validation error messages
    expect(screen.getByText(/Rule name is required/i)).toBeInTheDocument();
  });
});
