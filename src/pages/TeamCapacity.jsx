import React from 'react';
import { Link } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import { useEngineers } from '../context/EngineerContext';
import '../App.css';

const TeamCapacity = () => {
  const { engineers, getOverallUtilization } = useEngineers();
  const overallUtilization = getOverallUtilization();

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="taskify-icon">
          <TaskifyIcon />
        </Link>
        <h1>Team Capacity</h1>
      </header>
      <main className="main-content">
        <div className="capacity-container">
          <div className="capacity-header">
            <h2>Team Capacity Overview</h2>
            <p className="subtitle">Monitor and manage your team's workload</p>
          </div>

          <div className="capacity-grid">
            <div className="capacity-card">
              <h3>Overall Utilization</h3>
              <div className="utilization-chart">
                <div className="utilization-value">{overallUtilization}%</div>
                <div className="utilization-bar">
                  <div className="utilization-fill" style={{ width: `${overallUtilization}%` }}></div>
                </div>
              </div>
            </div>

            <div className="capacity-card">
              <h3>Team Members</h3>
              <div className="team-members">
                {engineers.map(engineer => (
                  <div key={engineer.id} className="member-item">
                    <div className="member-info">
                      <span className="member-name">{engineer.name}</span>
                      <span className="member-role">{engineer.role}</span>
                    </div>
                    <div className="member-utilization">{engineer.utilization}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="capacity-card">
              <h3>Project Distribution</h3>
              <div className="project-distribution">
                <div className="project-item">
                  <span className="project-name">Feature A</span>
                  <span className="project-hours">120h</span>
                </div>
                <div className="project-item">
                  <span className="project-name">Feature B</span>
                  <span className="project-hours">80h</span>
                </div>
                <div className="project-item">
                  <span className="project-name">Maintenance</span>
                  <span className="project-hours">40h</span>
                </div>
              </div>
            </div>

            <div className="capacity-card">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <Link to="/planning" className="action-button">
                  Back to Planning
                </Link>
                <Link to="/adjust-capacity" className="action-button secondary">
                  Adjust Capacity
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamCapacity; 