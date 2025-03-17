import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddProject from '../AddProject';

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AddProject Page', () => {
  it('renders the add project form', () => {
    renderWithRouter(<AddProject />);
    
    // Check for main elements
    expect(screen.getByText('Add New Project')).toBeInTheDocument();
    expect(screen.getByText('Create New Project')).toBeInTheDocument();
    
    // Check for form fields
    expect(screen.getByLabelText(/project name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estimated duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stack rank/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderWithRouter(<AddProject />);
    
    // Try to submit empty form
    fireEvent.click(screen.getByText('Add Project'));
    
    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByLabelText(/project name/i)).toBeInvalid();
      expect(screen.getByLabelText(/description/i)).toBeInvalid();
      expect(screen.getByLabelText(/start date/i)).toBeInvalid();
      expect(screen.getByLabelText(/end date/i)).toBeInvalid();
      expect(screen.getByLabelText(/estimated duration/i)).toBeInvalid();
      expect(screen.getByLabelText(/stack rank/i)).toBeInvalid();
    });
  });

  it('submits form with valid data', async () => {
    renderWithRouter(<AddProject />);
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'Test Project' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2024-04-01' },
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2024-05-01' },
    });
    fireEvent.change(screen.getByLabelText(/estimated duration/i), {
      target: { value: '4' },
    });
    fireEvent.change(screen.getByLabelText(/stack rank/i), {
      target: { value: '1' },
    });
    
    // Submit form
    fireEvent.click(screen.getByText('Add Project'));
    
    // Check navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/planning');
    });
  });

  it('cancels form submission', () => {
    renderWithRouter(<AddProject />);
    
    // Click cancel button
    fireEvent.click(screen.getByText('Cancel'));
    
    // Check navigation
    expect(mockNavigate).toHaveBeenCalledWith('/planning');
  });

  it('validates date range', async () => {
    renderWithRouter(<AddProject />);
    
    // Set end date before start date
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2024-05-01' },
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2024-04-01' },
    });
    
    // Try to submit
    fireEvent.click(screen.getByText('Add Project'));
    
    // Check for validation
    await waitFor(() => {
      expect(screen.getByLabelText(/end date/i)).toBeInvalid();
    });
  });
}); 