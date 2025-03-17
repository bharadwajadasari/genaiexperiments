import { Link } from 'react-router-dom'
import '../App.css'

function ProgressTracking() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Progress Tracking</h1>
        <p className="subtitle">Monitor project progress in real-time</p>
      </header>
      <main className="main-content">
        <div className="feature-content">
          <h2>Progress Tracking Features</h2>
          <ul>
            <li>Real-time progress monitoring</li>
            <li>Progress visualization</li>
            <li>Milestone tracking</li>
            <li>Performance analytics</li>
          </ul>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </main>
    </div>
  )
}

export default ProgressTracking 