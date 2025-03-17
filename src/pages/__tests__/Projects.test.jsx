import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Projects from '../Projects';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Projects Page', () => {
  it('renders the projects page', () => {
    renderWithRouter(<Projects />);
    
    // Check for main elements
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('All Projects')).toBeInTheDocument();
    expect(screen.getByText('Add New Project')).toBeInTheDocument();
  });

  it('displays project cards with correct information', () => {
    renderWithRouter(<Projects />);
    
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
    renderWithRouter(<Projects />);
    
    // Check status badges
    const statusBadges = screen.getAllByText(/planned|in progress|completed/i);
    expect(statusBadges).toHaveLength(3);
    
    // Check specific status badges
    expect(screen.getByText('In Progress')).toHaveStyle({ backgroundColor: '#3B82F6' });
    expect(screen.getByText('Planned')).toHaveStyle({ backgroundColor: '#6B7280' });
    expect(screen.getByText('Completed')).toHaveStyle({ backgroundColor: '#10B981' });
  });

  it('displays correct stack rank badges with appropriate colors', () => {
    renderWithRouter(<Projects />);
    
    // Check stack rank badges
    const stackRankBadges = screen.getAllByText(/#[1-3]/);
    expect(stackRankBadges).toHaveLength(3);
    
    // Check specific stack rank badges
    expect(screen.getByText('#1')).toHaveStyle({ backgroundColor: '#EF4444' });
    expect(screen.getByText('#2')).toHaveStyle({ backgroundColor: '#F59E0B' });
    expect(screen.getByText('#3')).toHaveStyle({ backgroundColor: '#10B981' });
  });

  it('formats project duration correctly', () => {
    renderWithRouter(<Projects />);
    
    // Check duration formatting
    expect(screen.getByText('6.5 weeks')).toBeInTheDocument();
    expect(screen.getByText('4 weeks')).toBeInTheDocument();
    expect(screen.getByText('2 weeks')).toBeInTheDocument();
  });

  it('navigates to add project page when clicking add button', () => {
    renderWithRouter(<Projects />);
    
    const addButton = screen.getByText('Add New Project');
    expect(addButton).toHaveAttribute('href', '/add-project');
  });

  it('displays project action buttons', () => {
    renderWithRouter(<Projects />);
    
    // Check for action buttons on each project card
    const editButtons = screen.getAllByText('Edit');
    const viewButtons = screen.getAllByText('View Details');
    
    expect(editButtons).toHaveLength(3);
    expect(viewButtons).toHaveLength(3);
  });

  it('sorts projects by stack rank', () => {
    renderWithRouter(<Projects />);
    
    // Get all project cards
    const projectCards = screen.getAllByRole('article');
    
    // Check if projects are sorted by stack rank (1, 2, 3)
    const firstProject = projectCards[0];
    const secondProject = projectCards[1];
    const thirdProject = projectCards[2];
    
    expect(firstProject).toHaveTextContent('#1');
    expect(secondProject).toHaveTextContent('#2');
    expect(thirdProject).toHaveTextContent('#3');
  });
}); 