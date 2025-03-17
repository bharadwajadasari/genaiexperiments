import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Planning from '../Planning';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Planning Page', () => {
  it('renders the planning page', () => {
    renderWithRouter(<Planning />);
    
    // Check for main elements
    expect(screen.getByText('Planning')).toBeInTheDocument();
    expect(screen.getByText('Quarterly Planning')).toBeInTheDocument();
  });

  it('displays planning overview section', () => {
    renderWithRouter(<Planning />);
    
    // Check for planning overview section
    expect(screen.getByText('Planning Overview')).toBeInTheDocument();
    expect(screen.getByText('Total Projects')).toBeInTheDocument();
    expect(screen.getByText('Active Projects')).toBeInTheDocument();
    expect(screen.getByText('Team Capacity')).toBeInTheDocument();
  });

  it('displays correct project statistics', () => {
    renderWithRouter(<Planning />);
    
    // Check project statistics
    expect(screen.getByText('3')).toBeInTheDocument(); // Total Projects
    expect(screen.getByText('2')).toBeInTheDocument(); // Active Projects
    expect(screen.getByText('75%')).toBeInTheDocument(); // Team Capacity
  });

  it('displays project timeline section', () => {
    renderWithRouter(<Planning />);
    
    // Check for project timeline section
    expect(screen.getByText('Project Timeline')).toBeInTheDocument();
    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Feature B')).toBeInTheDocument();
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
  });

  it('displays quick actions section', () => {
    renderWithRouter(<Planning />);
    
    // Check for quick actions
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getByText('Add New Project')).toBeInTheDocument();
    expect(screen.getByText('View All Projects')).toBeInTheDocument();
    expect(screen.getByText('Adjust Team Capacity')).toBeInTheDocument();
  });

  it('navigates to add project page when clicking add new project', () => {
    renderWithRouter(<Planning />);
    
    const addProjectButton = screen.getByText('Add New Project');
    expect(addProjectButton).toHaveAttribute('href', '/add-project');
  });

  it('navigates to projects page when clicking view all projects', () => {
    renderWithRouter(<Planning />);
    
    const viewProjectsButton = screen.getByText('View All Projects');
    expect(viewProjectsButton).toHaveAttribute('href', '/projects');
  });

  it('navigates to adjust capacity page when clicking adjust team capacity', () => {
    renderWithRouter(<Planning />);
    
    const adjustCapacityButton = screen.getByText('Adjust Team Capacity');
    expect(adjustCapacityButton).toHaveAttribute('href', '/adjust-capacity');
  });

  it('displays project cards with correct information', () => {
    renderWithRouter(<Planning />);
    
    // Check for project cards
    const projectCards = screen.getAllByRole('article');
    expect(projectCards).toHaveLength(3); // Based on sample data
    
    // Check first project details
    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Implement new user authentication system')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('displays correct status badges with appropriate colors', () => {
    renderWithRouter(<Planning />);
    
    // Check status badges
    const statusBadges = screen.getAllByText(/planned|in progress|completed/i);
    expect(statusBadges).toHaveLength(3);
    
    // Check specific status badges
    expect(screen.getByText('In Progress')).toHaveStyle({ backgroundColor: '#3B82F6' });
    expect(screen.getByText('Planned')).toHaveStyle({ backgroundColor: '#6B7280' });
    expect(screen.getByText('Completed')).toHaveStyle({ backgroundColor: '#10B981' });
  });
}); 