import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditProject from '../EditProject';
import { projectService } from '../../services/projectService';

// Mock the projectService
vi.mock('../../services/projectService', () => ({
  projectService: {
    getProject: vi.fn(),
    updateProject: vi.fn()
  }
}));

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' })
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('EditProject', () => {
  const mockProject = {
    id: 1,
    name: 'Test Project',
    description: 'Test Description',
    start_date: '2024-04-01',
    end_date: '2024-05-15',
    estimated_weeks: 6.5,
    stack_rank: 1,
    status: 'in-progress'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    projectService.getProject.mockResolvedValue(mockProject);
  });

  it('renders the edit project form', async () => {
    renderWithRouter(<EditProject />);

    // Check for loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the form to load
    await waitFor(() => {
      expect(screen.getByText('Update Project Details')).toBeInTheDocument();
    });

    // Check if form fields are populated with project data
    expect(screen.getByLabelText(/project name/i)).toHaveValue('Test Project');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Test Description');
    expect(screen.getByLabelText(/start date/i)).toHaveValue('2024-04-01');
    expect(screen.getByLabelText(/end date/i)).toHaveValue('2024-05-15');
    expect(screen.getByLabelText(/estimated duration/i)).toHaveValue('6.5');
    expect(screen.getByLabelText(/stack rank/i)).toHaveValue('1');
    expect(screen.getByLabelText(/status/i)).toHaveValue('in-progress');
  });

  it('handles form submission successfully', async () => {
    projectService.updateProject.mockResolvedValue({ ...mockProject, name: 'Updated Project' });
    renderWithRouter(<EditProject />);

    // Wait for the form to load
    await waitFor(() => {
      expect(screen.getByText('Update Project Details')).toBeInTheDocument();
    });

    // Update project name
    const nameInput = screen.getByLabelText(/project name/i);
    fireEvent.change(nameInput, { target: { value: 'Updated Project' } });

    // Submit the form
    const submitButton = screen.getByText(/update project/i);
    fireEvent.click(submitButton);

    // Check if updateProject was called with correct data
    await waitFor(() => {
      expect(projectService.updateProject).toHaveBeenCalledWith('1', {
        name: 'Updated Project',
        description: 'Test Description',
        start_date: '2024-04-01',
        end_date: '2024-05-15',
        estimated_weeks: 6.5,
        stack_rank: 1,
        status: 'in-progress'
      });
    });

    // Check if navigation occurred
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });

  it('handles error when fetching project', async () => {
    projectService.getProject.mockRejectedValue(new Error('Failed to fetch project'));
    renderWithRouter(<EditProject />);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to load project details')).toBeInTheDocument();
    });
  });

  it('handles error when updating project', async () => {
    projectService.updateProject.mockRejectedValue(new Error('Failed to update project'));
    renderWithRouter(<EditProject />);

    // Wait for the form to load
    await waitFor(() => {
      expect(screen.getByText('Update Project Details')).toBeInTheDocument();
    });

    // Submit the form
    const submitButton = screen.getByText(/update project/i);
    fireEvent.click(submitButton);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to update project')).toBeInTheDocument();
    });
  });

  it('validates date inputs', async () => {
    renderWithRouter(<EditProject />);

    // Wait for the form to load
    await waitFor(() => {
      expect(screen.getByText('Update Project Details')).toBeInTheDocument();
    });

    // Set end date before start date
    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);
    
    fireEvent.change(startDateInput, { target: { value: '2024-05-15' } });
    fireEvent.change(endDateInput, { target: { value: '2024-04-01' } });

    // Submit the form
    const submitButton = screen.getByText(/update project/i);
    fireEvent.click(submitButton);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText('End date must be after start date')).toBeInTheDocument();
    });
  });

  it('navigates back to projects page when cancel is clicked', async () => {
    renderWithRouter(<EditProject />);

    // Wait for the form to load
    await waitFor(() => {
      expect(screen.getByText('Update Project Details')).toBeInTheDocument();
    });

    // Click cancel button
    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    // Check if navigation occurred
    expect(mockNavigate).toHaveBeenCalledWith('/projects');
  });
}); 