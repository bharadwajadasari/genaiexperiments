import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import { projectService } from '../services/projectService';
import '../App.css';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await projectService.getProject(id);
        setProject(data);
      } catch (err) {
        setError('Failed to load project details');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

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
        return '#EF4444';
      case 2:
        return '#F59E0B';
      case 3:
        return '#10B981';
      default:
        return '#6B7280';
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
      <div className="page-container">
        <header className="header">
          <Link to="/projects" className="taskify-icon">
            <TaskifyIcon />
          </Link>
          <h1>Project Details</h1>
        </header>
        <main className="main-content">
          <div className="loading">Loading project details...</div>
        </main>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="page-container">
        <header className="header">
          <Link to="/projects" className="taskify-icon">
            <TaskifyIcon />
          </Link>
          <h1>Project Details</h1>
        </header>
        <main className="main-content">
          <div className="error-message">{error || 'Project not found'}</div>
          <Link to="/projects" className="action-button">
            Return to Projects
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="page-container">
      <header className="header">
        <Link to="/projects" className="taskify-icon">
          <TaskifyIcon />
        </Link>
        <h1>Project Details</h1>
      </header>

      <main className="main-content">
        <div className="project-details-container">
          <div className="project-header">
            <h2>{project.name}</h2>
            <span 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(project.status) }}
            >
              {project.status.replace('-', ' ')}
            </span>
          </div>

          <div className="project-info-grid">
            <div className="info-section">
              <h3>Description</h3>
              <p className="project-description">{project.description}</p>
            </div>

            <div className="info-section">
              <h3>Timeline</h3>
              <div className="timeline-details">
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
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">
                    {formatWeeks(project.estimated_weeks)}
                  </span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Priority</h3>
              <div className="priority-details">
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
            </div>

            <div className="info-section">
              <h3>Project Metadata</h3>
              <div className="metadata-details">
                <div className="detail-item">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">
                    {new Date(project.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Updated:</span>
                  <span className="detail-value">
                    {new Date(project.updated_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="project-actions">
            <Link to={`/edit-project/${project.id}`} className="action-button">
              Edit Project
            </Link>
            <Link to="/projects" className="action-button secondary">
              Back to Projects
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails; 