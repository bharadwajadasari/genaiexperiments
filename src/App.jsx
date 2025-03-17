import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Welcome to Project Tracking Software</h1>
        <p className="subtitle">Efficiently manage and track your projects</p>
      </header>
      <main className="main-content">
        <section className="features">
          <h2>Key Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Task Management</h3>
              <p>Organize and track your tasks with ease</p>
            </div>
            <div className="feature-card">
              <h3>Team Collaboration</h3>
              <p>Work together seamlessly with your team</p>
            </div>
            <div className="feature-card">
              <h3>Progress Tracking</h3>
              <p>Monitor project progress in real-time</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
