import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the project to your backend
    console.log('New project:', project);
    alert('Project added successfully!');
    navigate('/planning');
  };

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="taskify-icon">
          <TaskifyIcon />
        </Link>
        <h1>Add New Project</h1>
      </header>
      <main className="main-content">
        <div className="add-project-container">
          <div className="add-project-header">
            <h2>Create New Project</h2>
            <p className="subtitle">Add a new project to your quarterly planning</p>
          </div>

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
                placeholder="Enter project name"
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
                placeholder="Enter project description"
                rows="4"
              />
            </div>

            <div className="form-row">
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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="estimatedWeeks">Estimated Duration (Weeks)</label>
                <input
                  type="number"
                  id="estimatedWeeks"
                  name="estimatedWeeks"
                  value={project.estimatedWeeks}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.5"
                  placeholder="Enter estimated weeks"
                />
                <small className="form-help">Enter the number of weeks (can include half weeks)</small>
              </div>

              <div className="form-group">
                <label htmlFor="stackRank">Stack Rank</label>
                <input
                  type="number"
                  id="stackRank"
                  name="stackRank"
                  value={project.stackRank}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Enter stack rank"
                />
                <small className="form-help">Lower number = higher priority (1 is highest)</small>
              </div>
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
              <Link to="/planning" className="action-button secondary">
                Cancel
              </Link>
              <button type="submit" className="action-button">
                Add Project
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProject; 