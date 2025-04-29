import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable, Column } from '../DataTable';

// Mock the Button component
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, variant, size }: { children: React.ReactNode; onClick?: () => void; variant?: string; size?: string }) => (
    <button data-testid={`button-${variant || 'default'}-${size || 'default'}`} onClick={onClick}>
      {children}
    </button>
  ),
}));

describe('DataTable', () => {
  // Test data
  type TestItem = {
    id: string;
    name: string;
    status: string;
  };

  const testItems: TestItem[] = [
    { id: '1', name: 'Item 1', status: 'active' },
    { id: '2', name: 'Item 2', status: 'inactive' },
  ];

  const columns: Column<TestItem>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item) => item.name,
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => item.status,
    },
  ];

  const mockHandlers = {
    onView: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the table with correct columns and data', () => {
    render(
      <DataTable
        items={testItems}
        columns={columns}
        {...mockHandlers}
        keyExtractor={(item) => item.id}
      />
    );

    // Check column headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check data rows
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('inactive')).toBeInTheDocument();
  });

  it('calls the appropriate handler when action buttons are clicked', () => {
    render(
      <DataTable
        items={testItems}
        columns={columns}
        {...mockHandlers}
        keyExtractor={(item) => item.id}
      />
    );

    // Get all view, edit, and delete buttons
    const viewButtons = screen.getAllByTestId('button-ghost-icon');
    
    // Click the first item's view button
    fireEvent.click(viewButtons[0]);
    expect(mockHandlers.onView).toHaveBeenCalledWith(testItems[0]);

    // Click the first item's edit button
    fireEvent.click(viewButtons[1]);
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(testItems[0]);

    // Click the first item's delete button
    fireEvent.click(viewButtons[2]);
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(testItems[0]);
  });

  it('applies custom row class names', () => {
    const { container } = render(
      <DataTable
        items={testItems}
        columns={columns}
        {...mockHandlers}
        keyExtractor={(item) => item.id}
        getRowClassName={(item) => item.status === 'inactive' ? 'bg-gray-100' : ''}
      />
    );

    // Get all rows (excluding header row)
    const rows = container.querySelectorAll('tbody tr');
    
    // First row should not have the bg-gray-100 class
    expect(rows[0].className).not.toContain('bg-gray-100');
    
    // Second row should have the bg-gray-100 class
    expect(rows[1].className).toContain('bg-gray-100');
  });

  it('renders without action buttons when handlers are not provided', () => {
    render(
      <DataTable
        items={testItems}
        columns={columns}
        keyExtractor={(item) => item.id}
      />
    );

    // Action buttons should not be rendered
    expect(screen.queryAllByTestId('button-ghost-icon')).toHaveLength(0);
  });

  it('renders only specified action buttons', () => {
    render(
      <DataTable
        items={testItems}
        columns={columns}
        onView={mockHandlers.onView}
        keyExtractor={(item) => item.id}
        actionButtons={{ view: true, edit: false, delete: false }}
      />
    );

    // Only view buttons should be rendered (2 items = 2 buttons)
    expect(screen.getAllByTestId('button-ghost-icon')).toHaveLength(2);
  });
});

describe('DataTable helper functions', () => {
  it('getPriorityColor returns the correct class for each priority', () => {
    const { getPriorityColor } = require('../DataTable');
    
    expect(getPriorityColor('low')).toBe('bg-green-100 text-green-800');
    expect(getPriorityColor('medium')).toBe('bg-blue-100 text-blue-800');
    expect(getPriorityColor('high')).toBe('bg-orange-100 text-orange-800');
    expect(getPriorityColor('urgent')).toBe('bg-red-100 text-red-800');
    expect(getPriorityColor('unknown')).toBe('bg-gray-100 text-gray-800');
  });

  it('getStatusColor returns the correct class for each status', () => {
    const { getStatusColor } = require('../DataTable');
    
    expect(getStatusColor('open')).toBe('bg-blue-100 text-blue-800');
    expect(getStatusColor('in_progress')).toBe('bg-yellow-100 text-yellow-800');
    expect(getStatusColor('resolved')).toBe('bg-green-100 text-green-800');
    expect(getStatusColor('closed')).toBe('bg-gray-100 text-gray-800');
    expect(getStatusColor('reopened')).toBe('bg-purple-100 text-purple-800');
    expect(getStatusColor('unknown')).toBe('bg-gray-100 text-gray-800');
  });

  it('formatDate formats dates correctly', () => {
    const { formatDate } = require('../DataTable');
    
    // Mock Date.prototype.toLocaleDateString to return a consistent value
    const originalToLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = jest.fn(() => 'Jan 1, 2023');
    
    expect(formatDate('2023-01-01')).toBe('Jan 1, 2023');
    expect(formatDate(new Date('2023-01-01'))).toBe('Jan 1, 2023');
    
    // Restore original method
    Date.prototype.toLocaleDateString = originalToLocaleDateString;
  });

  it('getStatusLabel returns the correct label for each status', () => {
    const { getStatusLabel } = require('../DataTable');
    
    expect(getStatusLabel('in_progress')).toBe('In Progress');
    expect(getStatusLabel('open')).toBe('Open');
    expect(getStatusLabel('closed')).toBe('Closed');
  });
});
