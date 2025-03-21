import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import { projectService } from '../services/projectService';
import '../App.css';

const AddProject = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    estimatedWeeks: '',
    stackRank: 1,
    status: 'planned'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Validate dates
      const startDate = new Date(project.startDate);
      const endDate = new Date(project.endDate);
      if (endDate < startDate) {
        throw new Error('End date must be after start date');
      }

      // Convert form data to database format
      const projectData = {
        name: project.name,
        description: project.description,
        start_date: project.startDate,
        end_date: project.endDate,
        estimated_weeks: parseFloat(project.estimatedWeeks),
        stack_rank: parseInt(project.stackRank),
        status: project.status
      };

      console.log('Submitting project data:', projectData);
      const result = await projectService.createProject(projectData);
      console.log('Project created successfully:', result);
      navigate('/projects');
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <TaskifyIcon />
        <h1>Add New Project</h1>
      </header>

      <main className="main-content">
        <div className="form-container">
          <h2>Project Details</h2>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="project-form">
            <div className="form-group">
              <label htmlFor="name">Project Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={project.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={project.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={project.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={project.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="estimatedWeeks">Estimated Duration (weeks)</label>
              <input
                type="number"
                id="estimatedWeeks"
                name="estimatedWeeks"
                value={project.estimatedWeeks}
                onChange={handleChange}
                min="0"
                step="0.5"
                required
              />
              <small className="help-text">Enter the estimated duration in weeks (can include decimals)</small>
            </div>

            <div className="form-group">
              <label htmlFor="stackRank">Stack Rank</label>
              <input
                type="number"
                id="stackRank"
                name="stackRank"
                value={project.stackRank}
                onChange={handleChange}
                min="1"
                required
              />
              <small className="help-text">Lower number indicates higher priority</small>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={project.status}
                onChange={handleChange}
                required
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="action-button" disabled={loading}>
                {loading ? 'Creating...' : 'Create Project'}
              </button>
              <Link to="/projects" className="action-button secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProject; 