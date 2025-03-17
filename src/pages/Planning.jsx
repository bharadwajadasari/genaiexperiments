import React from 'react';
import { Link } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import '../App.css';

const Planning = () => {
  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="taskify-icon">
          <TaskifyIcon />
        </Link>
        <h1>Quarter Planning</h1>
      </header>
      <main className="main-content">
        <div className="planning-container">
          <div className="planning-header">
            <h2>Quarter Planning Dashboard</h2>
            <p className="subtitle">Plan and track your team's quarterly objectives</p>
          </div>

          <div className="planning-grid">
            <div className="planning-card">
              <h3>Current Quarter</h3>
              <div className="quarter-info">
                <p>Q2 2024</p>
                <span className="date-range">April 1 - June 30, 2024</span>
              </div>
            </div>

            <div className="planning-card">
              <h3>Team Objectives</h3>
              <ul className="objectives-list">
                <li>Launch new product feature</li>
                <li>Improve system performance</li>
                <li>Enhance user experience</li>
              </ul>
            </div>

            <div className="planning-card">
              <h3>Key Metrics</h3>
              <div className="metrics-grid">
                <div className="metric-item">
                  <span className="metric-value">85%</span>
                  <span className="metric-label">On Track</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">12</span>
                  <span className="metric-label">Active Projects</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">3</span>
                  <span className="metric-label">At Risk</span>
                </div>
              </div>
            </div>

            <div className="planning-card">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <Link to="/projects" className="action-button">
                  View All Projects
                </Link>
                <Link to="/add-project" className="action-button secondary">
                  Add New Project
                </Link>
                <Link to="/team-capacity" className="action-button secondary">
                  View Team Capacity
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Planning; 