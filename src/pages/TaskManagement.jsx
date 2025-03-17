import { Link } from 'react-router-dom'
import '../App.css'

function TaskManagement() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Task Management</h1>
        <p className="subtitle">Organize and track your tasks efficiently</p>
      </header>
      <main className="main-content">
        <div className="feature-content">
          <h2>Task Management Features</h2>
          <ul>
            <li>Create and assign tasks</li>
            <li>Set task priorities</li>
            <li>Track task status</li>
            <li>Manage deadlines</li>
          </ul>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </main>
    </div>
  )
}

export default TaskManagement 