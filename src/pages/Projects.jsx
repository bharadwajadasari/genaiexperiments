import React from 'react';
import { Link } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import '../App.css';

const Projects = () => {
  // This would typically come from your backend/context
  const projects = [
    {
      id: 1,
      name: 'Feature A',
      description: 'Implement new user authentication system',
      startDate: '2024-04-01',
      endDate: '2024-05-15',
      estimatedWeeks: 6.5,
      stackRank: 1,
      status: 'in-progress'
    },
    {
      id: 2,
      name: 'Feature B',
      description: 'Add real-time notifications',
      startDate: '2024-05-16',
      endDate: '2024-06-30',
      estimatedWeeks: 4,
      stackRank: 3,
      status: 'planned'
    },
    {
      id: 3,
      name: 'Maintenance',
      description: 'System optimization and bug fixes',
      startDate: '2024-04-15',
      endDate: '2024-06-15',
      estimatedWeeks: 2,
      stackRank: 2,
      status: 'completed'
    }
  ].sort((a, b) => a.stackRank - b.stackRank); // Sort by stack rank

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'in-progress':
        return '#3B82F6';
      case 'planned':
        return '#6B7280';
      case 'on-hold':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getStackRankColor = (rank) => {
    switch (rank) {
      case 1:
        return '#EF4444'; // Red for highest priority
      case 2:
        return '#F59E0B'; // Orange for second priority
      case 3:
        return '#10B981'; // Green for third priority
      default:
        return '#6B7280'; // Gray for others
    }
  };

  const formatWeeks = (weeks) => {
    if (Number.isInteger(weeks)) {
      return `${weeks} week${weeks === 1 ? '' : 's'}`;
    }
    return `${weeks} weeks`;
  };

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="taskify-icon">
          <TaskifyIcon />
        </Link>
        <h1>Projects</h1>
      </header>
      <main className="main-content">
        <div className="projects-container">
          <div className="projects-header">
            <h2>All Projects</h2>
            <p className="subtitle">View and manage your team's projects</p>
          </div>

          <div className="projects-actions">
            <Link to="/add-project" className="action-button">
              Add New Project
            </Link>
          </div>

          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(project.status) }}
                  >
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-details">
                  <div className="detail-item">
                    <span className="detail-label">Start Date:</span>
                    <span className="detail-value">{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">End Date:</span>
                    <span className="detail-value">{new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Estimated Duration:</span>
                    <span className="detail-value">{formatWeeks(project.estimatedWeeks)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Stack Rank:</span>
                    <span 
                      className="stack-rank-badge"
                      style={{ backgroundColor: getStackRankColor(project.stackRank) }}
                    >
                      #{project.stackRank}
                    </span>
                  </div>
                </div>

                <div className="project-actions">
                  <button className="action-button secondary">Edit</button>
                  <button className="action-button secondary">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects; 