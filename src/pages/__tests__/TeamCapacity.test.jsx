import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EngineerProvider } from '../../context/EngineerContext';
import TeamCapacity from '../TeamCapacity';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <EngineerProvider>
        {component}
      </EngineerProvider>
    </BrowserRouter>
  );
};

describe('TeamCapacity Page', () => {
  it('renders the team capacity page', () => {
    renderWithProviders(<TeamCapacity />);
    
    // Check for main elements
    expect(screen.getByText('Team Capacity')).toBeInTheDocument();
    expect(screen.getByText('Team Summary')).toBeInTheDocument();
    expect(screen.getByText('Adjust Capacity')).toBeInTheDocument();
  });

  it('displays overall team utilization', () => {
    renderWithProviders(<TeamCapacity />);
    
    // Check for utilization display
    expect(screen.getByText(/overall utilization/i)).toBeInTheDocument();
    expect(screen.getByText(/75%/)).toBeInTheDocument();
  });

  it('displays team member cards with correct information', () => {
    renderWithProviders(<TeamCapacity />);
    
    // Check for team member cards
    const memberCards = screen.getAllByRole('article');
    expect(memberCards).toHaveLength(3); // Based on sample data
    
    // Check first member details
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('displays utilization bars with correct colors', () => {
    renderWithProviders(<TeamCapacity />);
    
    // Check utilization bars
    const utilizationBars = screen.getAllByRole('progressbar');
    expect(utilizationBars).toHaveLength(3);
    
    // Check specific utilization bars
    expect(utilizationBars[0]).toHaveStyle({ backgroundColor: '#EF4444' }); // 80%
    expect(utilizationBars[1]).toHaveStyle({ backgroundColor: '#F59E0B' }); // 70%
    expect(utilizationBars[2]).toHaveStyle({ backgroundColor: '#10B981' }); // 75%
  });

  it('navigates to adjust capacity page when clicking adjust button', () => {
    renderWithProviders(<TeamCapacity />);
    
    const adjustButton = screen.getByText('Adjust Capacity');
    expect(adjustButton).toHaveAttribute('href', '/adjust-capacity');
  });

  it('displays project distribution section', () => {
    renderWithProviders(<TeamCapacity />);
    
    // Check for project distribution section
    expect(screen.getByText('Project Distribution')).toBeInTheDocument();
    expect(screen.getByText('Feature A')).toBeInTheDocument();
    expect(screen.getByText('Feature B')).toBeInTheDocument();
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
  });

  it('displays quick actions section', () => {
    renderWithProviders(<TeamCapacity />);
    
    // Check for quick actions
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getByText('View All Projects')).toBeInTheDocument();
    expect(screen.getByText('Add New Project')).toBeInTheDocument();
  });

  it('navigates to projects page when clicking view all projects', () => {
    renderWithProviders(<TeamCapacity />);
    
    const viewProjectsButton = screen.getByText('View All Projects');
    expect(viewProjectsButton).toHaveAttribute('href', '/projects');
  });

  it('navigates to add project page when clicking add new project', () => {
    renderWithProviders(<TeamCapacity />);
    
    const addProjectButton = screen.getByText('Add New Project');
    expect(addProjectButton).toHaveAttribute('href', '/add-project');
  });
}); 