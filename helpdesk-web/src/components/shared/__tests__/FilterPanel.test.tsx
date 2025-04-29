import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterPanel, FilterOption } from '../FilterPanel';

// Mock the UI components
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, variant }: { children: React.ReactNode; onClick?: () => void; variant?: string }) => (
    <button data-testid={`button-${variant || 'default'}`} onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/ui/Form', () => ({
  FormField: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="form-field" className={className}>{children}</div>
  ),
  FormLabel: ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label data-testid={`label-${htmlFor}`} htmlFor={htmlFor}>{children}</label>
  ),
  Input: (props: any) => (
    <input
      data-testid={`input-${props.id}`}
      {...props}
    />
  ),
  Select: (props: any) => (
    <select
      data-testid={`select-${props.id}`}
      {...props}
    />
  ),
}));

// Mock the HeroIcons
jest.mock('@heroicons/react/24/outline', () => ({
  FunnelIcon: () => <span data-testid="funnel-icon" />,
  XMarkIcon: () => <span data-testid="xmark-icon" />,
}));

describe('FilterPanel', () => {
  // Test data
  type TestFilters = {
    name?: string;
    status?: string;
    isActive?: boolean;
  };

  const filterOptions: FilterOption[] = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Enter name',
    },
    {
      id: 'status',
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { value: '', label: 'All Statuses' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    },
    {
      id: 'isActive',
      name: 'isActive',
      type: 'checkbox',
      label: 'Active Only',
    },
  ];

  const mockHandlers = {
    onFilterChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with the correct title', () => {
    render(
      <FilterPanel
        filters={{}}
        filterOptions={filterOptions}
        onFilterChange={mockHandlers.onFilterChange}
        title="Test Filters"
      />
    );

    expect(screen.getByText('Test Filters')).toBeInTheDocument();
  });

  it('toggles filter visibility when the show/hide button is clicked', () => {
    render(
      <FilterPanel
        filters={{}}
        filterOptions={filterOptions}
        onFilterChange={mockHandlers.onFilterChange}
      />
    );

    // Initially, the filters should be hidden
    expect(screen.queryByTestId('input-name')).not.toBeInTheDocument();

    // Click the show filters button
    fireEvent.click(screen.getByTestId('button-ghost'));

    // Now the filters should be visible
    expect(screen.getByTestId('input-name')).toBeInTheDocument();
    expect(screen.getByTestId('select-status')).toBeInTheDocument();

    // Click the hide filters button
    fireEvent.click(screen.getByTestId('button-ghost'));

    // The filters should be hidden again
    expect(screen.queryByTestId('input-name')).not.toBeInTheDocument();
  });

  it('calls onFilterChange with updated filters when Apply Filters is clicked', () => {
    render(
      <FilterPanel
        filters={{}}
        filterOptions={filterOptions}
        onFilterChange={mockHandlers.onFilterChange}
        initialExpanded={true}
      />
    );

    // Enter a value in the name input
    fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'Test Name' } });

    // Select a value in the status select
    fireEvent.change(screen.getByTestId('select-status'), { target: { value: 'active' } });

    // Check the checkbox
    fireEvent.click(screen.getByLabelText('Active Only'));

    // Click the Apply Filters button
    fireEvent.click(screen.getByText('Apply Filters'));

    // Check that onFilterChange was called with the correct filters
    expect(mockHandlers.onFilterChange).toHaveBeenCalledWith({
      name: 'Test Name',
      status: 'active',
      isActive: true,
    });
  });

  it('resets filters when Reset button is clicked', () => {
    const initialFilters = {
      name: 'Initial Name',
      status: 'active',
      isActive: true,
    };

    render(
      <FilterPanel
        filters={initialFilters}
        filterOptions={filterOptions}
        onFilterChange={mockHandlers.onFilterChange}
        initialExpanded={true}
      />
    );

    // Click the Reset button
    fireEvent.click(screen.getByText('Reset'));

    // Check that onFilterChange was called with empty filters
    expect(mockHandlers.onFilterChange).toHaveBeenCalledWith({});
  });

  it('renders with initialExpanded=true', () => {
    render(
      <FilterPanel
        filters={{}}
        filterOptions={filterOptions}
        onFilterChange={mockHandlers.onFilterChange}
        initialExpanded={true}
      />
    );

    // The filters should be visible initially
    expect(screen.getByTestId('input-name')).toBeInTheDocument();
  });
});
