import { Link } from 'react-router-dom'
import '../App.css'

function TeamCollaboration() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Team Collaboration</h1>
        <p className="subtitle">Work together seamlessly with your team</p>
      </header>
      <main className="main-content">
        <div className="feature-content">
          <h2>Team Collaboration Features</h2>
          <ul>
            <li>Real-time team updates</li>
            <li>Shared project spaces</li>
            <li>Team communication tools</li>
            <li>Collaborative document sharing</li>
          </ul>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </main>
    </div>
  )
}

export default TeamCollaboration 