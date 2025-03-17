import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import { useEngineers } from '../context/EngineerContext';
import '../App.css';

const AdjustCapacity = () => {
  const navigate = useNavigate();
  const { engineers, updateEngineerUtilization } = useEngineers();

  const handleUtilizationChange = (id, newValue) => {
    updateEngineerUtilization(id, newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the changes to your backend
    console.log('Updated engineer capacities:', engineers);
    
    // Show success message
    alert('Capacity adjustments saved successfully!');
    
    // Navigate back to TeamCapacity page
    navigate('/team-capacity');
  };

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="taskify-icon">
          <TaskifyIcon />
        </Link>
        <h1>Adjust Team Capacity</h1>
      </header>
      <main className="main-content">
        <div className="adjust-capacity-container">
          <div className="adjust-capacity-header">
            <h2>Adjust Engineer Capacity</h2>
            <p className="subtitle">Update utilization rates for team members</p>
          </div>

          <form onSubmit={handleSubmit} className="capacity-form">
            <div className="engineers-list">
              {engineers.map(engineer => (
                <div key={engineer.id} className="engineer-capacity-card">
                  <div className="engineer-info">
                    <h3>{engineer.name}</h3>
                    <p className="engineer-role">{engineer.role}</p>
                  </div>
                  <div className="utilization-controls">
                    <div className="utilization-slider-container">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={engineer.utilization}
                        onChange={(e) => handleUtilizationChange(engineer.id, parseInt(e.target.value))}
                        className="utilization-slider"
                      />
                      <span className="utilization-value">{engineer.utilization}%</span>
                    </div>
                    <div className="utilization-bar">
                      <div 
                        className="utilization-fill" 
                        style={{ width: `${engineer.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <Link to="/team-capacity" className="action-button secondary">
                Cancel
              </Link>
              <button type="submit" className="action-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdjustCapacity; 