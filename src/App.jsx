import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Planning from './pages/Planning'
import TaskManagement from './pages/TaskManagement'
import TeamCollaboration from './pages/TeamCollaboration'
import ProgressTracking from './pages/ProgressTracking'

function Home() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Welcome to Taskify</h1>
        <p className="subtitle">Efficiently plan, manage and track your priorities</p>
      </header>
      <main className="main-content">
        <section className="features">
          <h2>Key Features</h2>
          <div className="feature-grid">
            <Link to="/planning" className="feature-card">
              <h3>Planning</h3>
              <p>Plan your Quarter Ahead ease</p>
            </Link>
            <Link to="/task-management" className="feature-card">
              <h3>Task Management</h3>
              <p>Organize and track your tasks with ease</p>
            </Link>
            <Link to="/team-collaboration" className="feature-card">
              <h3>Team Collaboration</h3>
              <p>Work together seamlessly with your team</p>
            </Link>
            <Link to="/progress-tracking" className="feature-card">
              <h3>Progress Tracking</h3>
              <p>Monitor project progress in real-time</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/task-management" element={<TaskManagement />} />
        <Route path="/team-collaboration" element={<TeamCollaboration />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
      </Routes>
    </Router>
  )
}

export default App
