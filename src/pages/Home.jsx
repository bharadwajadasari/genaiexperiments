import React from 'react';
import { Link } from 'react-router-dom';
import TaskifyIcon from '../components/TaskifyIcon';
import '../App.css';

const Home = () => {
  const features = [
    {
      title: 'Quarter Planning',
      description: 'Plan and track your quarterly projects and initiatives',
      path: '/planning',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: 'Team Capacity',
      description: 'Manage team resources and track capacity allocation',
      path: '/team-capacity',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21V19C22.9986 17.1771 22.2969 15.4056 21 14C19.7074 12.5989 17.9993 11.5 16 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="app-container">
      <header className="header">
        <TaskifyIcon />
        <h1>Taskify Dashboard</h1>
        <p className="subtitle">Streamline your project management</p>
      </header>
      <main className="main-content">
        <div className="features-grid">
          {features.map((feature, index) => (
            <Link key={index} to={feature.path} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home; 