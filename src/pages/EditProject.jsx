import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import { projectService } from '../services/projectService';
import '../App.css';

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    estimatedWeeks: '',
    stackRank: 1,
    status: 'planned'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await projectService.getProject(id);
        setProject({
          name: data.name,
          description: data.description,
          startDate: data.start_date,
          endDate: data.end_date,
          estimatedWeeks: data.estimated_weeks,
          stackRank: data.stack_rank,
          status: data.status
        });
      } catch (err) {
        setError('Failed to load project details');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

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
      const projectData = {
        name: project.name,
        description: project.description,
        start_date: project.startDate,
        end_date: project.endDate,
        estimated_weeks: parseFloat(project.estimatedWeeks),
        stack_rank: parseInt(project.stackRank),
        status: project.status
      };

      await projectService.updateProject(id, projectData);
      navigate('/projects');
    } catch (err) {
      setError('Failed to update project');
      console.error('Error updating project:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <header className="header">
          <TaskifyIcon />
          <h1>Edit Project</h1>
        </header>
        <main className="main-content">
          <div className="loading">Loading...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <header className="header">
          <TaskifyIcon />
          <h1>Edit Project</h1>
        </header>
        <main className="main-content">
          <div className="error-message">{error}</div>
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
        <TaskifyIcon />
        <h1>Edit Project</h1>
      </header>

      <main className="main-content">
        <div className="form-container">
          <h2>Update Project Details</h2>
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
                {loading ? 'Updating...' : 'Update Project'}
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

export default EditProject; 