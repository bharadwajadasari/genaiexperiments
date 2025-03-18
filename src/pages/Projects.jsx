import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import { projectService } from '../services/projectService';
import '../App.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectService.getAllProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

  if (loading) {
    return (
      <div className="app-container">
        <header className="header">
          <Link to="/" className="taskify-icon">
            <TaskifyIcon />
          </Link>
          <h1>Projects</h1>
        </header>
        <main className="main-content">
          <div className="loading">Loading projects...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <header className="header">
          <Link to="/" className="taskify-icon">
            <TaskifyIcon />
          </Link>
          <h1>Projects</h1>
        </header>
        <main className="main-content">
          <div className="error-message">{error}</div>
          <button 
            className="action-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </main>
      </div>
    );
  }

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

          {projects.length === 0 ? (
            <div className="no-projects">
              <p>No projects found. Create your first project to get started!</p>
              <Link to="/add-project" className="action-button">
                Create Project
              </Link>
            </div>
          ) : (
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
                      <span className="detail-value">
                        {new Date(project.start_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">End Date:</span>
                      <span className="detail-value">
                        {new Date(project.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Estimated Duration:</span>
                      <span className="detail-value">
                        {formatWeeks(project.estimated_weeks)}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Stack Rank:</span>
                      <span 
                        className="stack-rank-badge"
                        style={{ backgroundColor: getStackRankColor(project.stack_rank) }}
                      >
                        #{project.stack_rank}
                      </span>
                    </div>
                  </div>

                  <div className="project-actions">
                    <Link to={`/edit-project/${project.id}`} className="action-button">
                      Edit
                    </Link>
                    <Link to={`/project/${project.id}`} className="action-button secondary">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Projects; 