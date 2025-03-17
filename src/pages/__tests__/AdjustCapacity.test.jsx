import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EngineerProvider } from '../../context/EngineerContext';
import AdjustCapacity from '../AdjustCapacity';

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <EngineerProvider>
        {component}
      </EngineerProvider>
    </BrowserRouter>
  );
};

describe('AdjustCapacity Page', () => {
  it('renders the adjust capacity page', () => {
    renderWithProviders(<AdjustCapacity />);
    
    // Check for main elements
    expect(screen.getByText('Adjust Engineer Capacity')).toBeInTheDocument();
    expect(screen.getByText('Update Engineer Utilization')).toBeInTheDocument();
  });

  it('displays engineer cards with correct information', () => {
    renderWithProviders(<AdjustCapacity />);
    
    // Check for engineer cards
    const engineerCards = screen.getAllByRole('article');
    expect(engineerCards).toHaveLength(3); // Based on sample data
    
    // Check first engineer details
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('allows adjusting engineer utilization', async () => {
    renderWithProviders(<AdjustCapacity />);
    
    // Find the utilization input for the first engineer
    const utilizationInput = screen.getAllByRole('spinbutton')[0];
    
    // Change the utilization value
    fireEvent.change(utilizationInput, {
      target: { value: '85' },
    });
    
    // Check if the value was updated
    expect(utilizationInput.value).toBe('85');
  });

  it('validates utilization input range', async () => {
    renderWithProviders(<AdjustCapacity />);
    
    // Find the utilization input for the first engineer
    const utilizationInput = screen.getAllByRole('spinbutton')[0];
    
    // Try to set invalid values
    fireEvent.change(utilizationInput, {
      target: { value: '101' },
    });
    expect(utilizationInput.value).toBe('100');
    
    fireEvent.change(utilizationInput, {
      target: { value: '-1' },
    });
    expect(utilizationInput.value).toBe('0');
  });

  it('saves changes and navigates back', async () => {
    renderWithProviders(<AdjustCapacity />);
    
    // Find the save button
    const saveButton = screen.getByText('Save Changes');
    
    // Click save
    fireEvent.click(saveButton);
    
    // Check navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/team-capacity');
    });
  });

  it('cancels changes and navigates back', () => {
    renderWithProviders(<AdjustCapacity />);
    
    // Find the cancel button
    const cancelButton = screen.getByText('Cancel');
    
    // Click cancel
    fireEvent.click(cancelButton);
    
    // Check navigation
    expect(mockNavigate).toHaveBeenCalledWith('/team-capacity');
  });

  it('displays current utilization in progress bars', () => {
    renderWithProviders(<AdjustCapacity />);
    
    // Check utilization bars
    const utilizationBars = screen.getAllByRole('progressbar');
    expect(utilizationBars).toHaveLength(3);
    
    // Check specific utilization bars
    expect(utilizationBars[0]).toHaveStyle({ backgroundColor: '#EF4444' }); // 80%
    expect(utilizationBars[1]).toHaveStyle({ backgroundColor: '#F59E0B' }); // 70%
    expect(utilizationBars[2]).toHaveStyle({ backgroundColor: '#10B981' }); // 75%
  });

  it('updates progress bar color based on utilization', async () => {
    renderWithProviders(<AdjustCapacity />);
    
    // Find the utilization input for the first engineer
    const utilizationInput = screen.getAllByRole('spinbutton')[0];
    const progressBar = screen.getAllByRole('progressbar')[0];
    
    // Change utilization to different ranges
    fireEvent.change(utilizationInput, {
      target: { value: '90' },
    });
    expect(progressBar).toHaveStyle({ backgroundColor: '#EF4444' }); // Red for high
    
    fireEvent.change(utilizationInput, {
      target: { value: '60' },
    });
    expect(progressBar).toHaveStyle({ backgroundColor: '#10B981' }); // Green for low
  });
}); 