import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AddProject from '../AddProject';
import { projectService } from '../../services/projectService';

// Mock the projectService
vi.mock('../../services/projectService', () => ({
  projectService: {
    createProject: vi.fn()
  }
}));

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AddProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the add project form', () => {
    renderWithRouter(<AddProject />);

    // Check for form elements
    expect(screen.getByText('Project Details')).toBeInTheDocument();
    expect(screen.getByLabelText(/project name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estimated duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stack rank/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const mockProject = {
      id: 1,
      name: 'New Project',
      description: 'New Description',
      start_date: '2024-04-01',
      end_date: '2024-05-15',
      estimated_weeks: 6.5,
      stack_rank: 1,
      status: 'planned'
    };

    projectService.createProject.mockResolvedValue(mockProject);
    renderWithRouter(<AddProject />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'New Project' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'New Description' }
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2024-04-01' }
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2024-05-15' }
    });
    fireEvent.change(screen.getByLabelText(/estimated duration/i), {
      target: { value: '6.5' }
    });
    fireEvent.change(screen.getByLabelText(/stack rank/i), {
      target: { value: '1' }
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'planned' }
    });

    // Submit the form
    const submitButton = screen.getByText(/create project/i);
    fireEvent.click(submitButton);

    // Check if createProject was called with correct data
    await waitFor(() => {
      expect(projectService.createProject).toHaveBeenCalledWith({
        name: 'New Project',
        description: 'New Description',
        start_date: '2024-04-01',
        end_date: '2024-05-15',
        estimated_weeks: 6.5,
        stack_rank: 1,
        status: 'planned'
      });
    });

    // Check if navigation occurred
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('handles error when creating project', async () => {
    projectService.createProject.mockRejectedValue(new Error('Failed to create project'));
    renderWithRouter(<AddProject />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'New Project' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'New Description' }
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2024-04-01' }
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2024-05-15' }
    });
    fireEvent.change(screen.getByLabelText(/estimated duration/i), {
      target: { value: '6.5' }
    });
    fireEvent.change(screen.getByLabelText(/stack rank/i), {
      target: { value: '1' }
    });

    // Submit the form
    const submitButton = screen.getByText(/create project/i);
    fireEvent.click(submitButton);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to create project')).toBeInTheDocument();
    });
  });

  it('validates date inputs', async () => {
    renderWithRouter(<AddProject />);

    // Set end date before start date
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2024-05-15' }
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2024-04-01' }
    });

    // Fill in other required fields
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'New Project' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'New Description' }
    });
    fireEvent.change(screen.getByLabelText(/estimated duration/i), {
      target: { value: '6.5' }
    });
    fireEvent.change(screen.getByLabelText(/stack rank/i), {
      target: { value: '1' }
    });

    // Submit the form
    const submitButton = screen.getByText(/create project/i);
    fireEvent.click(submitButton);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText('End date must be after start date')).toBeInTheDocument();
    });
  });

  it('validates required fields', async () => {
    renderWithRouter(<AddProject />);

    // Try to submit without filling in required fields
    const submitButton = screen.getByText(/create project/i);
    fireEvent.click(submitButton);

    // Check for HTML5 validation messages
    expect(screen.getByLabelText(/project name/i)).toBeInvalid();
    expect(screen.getByLabelText(/description/i)).toBeInvalid();
    expect(screen.getByLabelText(/start date/i)).toBeInvalid();
    expect(screen.getByLabelText(/end date/i)).toBeInvalid();
    expect(screen.getByLabelText(/estimated duration/i)).toBeInvalid();
    expect(screen.getByLabelText(/stack rank/i)).toBeInvalid();
  });

  it('navigates back to projects page when cancel is clicked', () => {
    renderWithRouter(<AddProject />);

    // Click cancel button
    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    // Check if navigation occurred
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('disables submit button while submitting', async () => {
    projectService.createProject.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    renderWithRouter(<AddProject />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'New Project' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'New Description' }
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: '2024-04-01' }
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: '2024-05-15' }
    });
    fireEvent.change(screen.getByLabelText(/estimated duration/i), {
      target: { value: '6.5' }
    });
    fireEvent.change(screen.getByLabelText(/stack rank/i), {
      target: { value: '1' }
    });

    // Submit the form
    const submitButton = screen.getByText(/create project/i);
    fireEvent.click(submitButton);

    // Check if button is disabled and shows loading state
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Creating...');

    // Wait for submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent('Create Project');
    });
  });
});