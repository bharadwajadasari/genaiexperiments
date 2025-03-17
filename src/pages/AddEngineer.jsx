import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import {
  getTeams,
  getRoles,
  addEngineer
} from '../services/teamCapacityService';
import '../App.css';

const AddEngineer = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [teamsData, rolesData] = await Promise.all([
        getTeams(),
        getRoles()
      ]);
      setTeams(teamsData);
      setRoles(rolesData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      setError(null);
      await addEngineer(
        formData.get('teamId'),
        {
          name: formData.get('name'),
          role: formData.get('role'),
          capacity: parseInt(formData.get('capacity'))
        }
      );
      setSuccess('Engineer added successfully');
      e.target.reset();
    } catch (err) {
      setError(err.message);
      console.error('Error adding engineer:', err);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-container">
      <header className="header">
        <TaskifyIcon />
        <h1>Add New Engineer</h1>
      </header>
      <main className="main-content">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="form-container">
          <form onSubmit={handleSubmit} className="engineer-form">
            <div className="form-group">
              <label htmlFor="teamId">Select Team</label>
              <select id="teamId" name="teamId" required>
                <option value="">Choose a team</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">Engineer Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter engineer name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" required>
                <option value="">Select role</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity (%)</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                min="0"
                max="100"
                required
                placeholder="Enter capacity percentage"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="action-button">Add Engineer</button>
              <button 
                type="button" 
                className="action-button secondary"
                onClick={() => navigate('/team-capacity')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEngineer; 