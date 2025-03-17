import React from 'react';
import { Link } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import '../App.css';

const Home = () => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="taskify-icon">
          <TaskifyIcon />
        </div>
        <h1>Taskify</h1>
      </header>
      <main className="main-content">
        <div className="home-container">
          <h2>Welcome to Taskify</h2>
          <p className="subtitle">Your all-in-one project management solution</p>
          
          <div className="navigation-grid">
            <Link to="/planning" className="nav-card">
              <h3>Quarter Planning</h3>
              <p>Plan and track your team's quarterly objectives</p>
            </Link>
            
            <Link to="/team-capacity" className="nav-card">
              <h3>Team Capacity</h3>
              <p>Monitor and manage your team's workload</p>
            </Link>
            
            <Link to="/add-engineer" className="nav-card">
              <h3>Add Engineer</h3>
              <p>Add new team members to your organization</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home; 