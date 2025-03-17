import React from 'react';
import { Link } from 'react-router-dom';

const TaskifyIcon = () => {
  return (
    <Link to="/" className="taskify-icon">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 26C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z"
          fill="#4f46e5"
        />
        <path
          d="M22.707 10.293a1 1 0 00-1.414 0L14 17.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
          fill="#4f46e5"
        />
      </svg>
      <span className="taskify-text">Taskify</span>
    </Link>
  );
};

export default TaskifyIcon; 