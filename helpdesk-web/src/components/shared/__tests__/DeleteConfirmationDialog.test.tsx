import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeleteConfirmationDialog } from '../DeleteConfirmationDialog';

// Mock the Dialog component from headlessui
jest.mock('@headlessui/react', () => ({
  Transition: ({ children }: { children: React.ReactNode }) => children,
  Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the Dialog component from our UI library
jest.mock('@/components/ui/Dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog">{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-content">{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2 data-testid="dialog-title">{children}</h2>,
  DialogDescription: ({ children }: { children: React.ReactNode }) => <p data-testid="dialog-description">{children}</p>,
}));

// Mock the Button component
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, variant }: { children: React.ReactNode; onClick?: () => void; variant?: string }) => (
    <button data-testid={`button-${variant || 'default'}`} onClick={onClick}>
      {children}
    </button>
  ),
}));

describe('DeleteConfirmationDialog', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item?',
    isDeleting: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with provided props', () => {
    render(<DeleteConfirmationDialog {...mockProps} />);

    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Delete Item');
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'Are you sure you want to delete this item?'
    );
    expect(screen.getByTestId('button-destructive')).toHaveTextContent('Delete');
    expect(screen.getByTestId('button-outline')).toHaveTextContent('Cancel');
  });

  it('calls onConfirm when Delete button is clicked', () => {
    render(<DeleteConfirmationDialog {...mockProps} />);

    fireEvent.click(screen.getByTestId('button-destructive'));
    expect(mockProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(<DeleteConfirmationDialog {...mockProps} />);

    fireEvent.click(screen.getByTestId('button-outline'));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('disables the Cancel button when isDeleting is true', () => {
    render(<DeleteConfirmationDialog {...mockProps} isDeleting={true} />);

    expect(screen.getByTestId('button-outline')).toBeDisabled();
  });
});
