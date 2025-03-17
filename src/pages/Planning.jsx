import { Link } from 'react-router-dom'
import '../App.css'

function Planning() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Quarter Planning</h1>
        <p className="subtitle">Plan your quarter ahead with ease</p>
      </header>
      <main className="main-content">
        <div className="feature-content">
          <h2>Quarter Planning Features</h2>
          <ul>
            <li>Set quarterly objectives</li>
            <li>Define key results</li>
            <li>Create milestone timelines</li>
            <li>Track progress against goals</li>
          </ul>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </main>
    </div>
  )
}

export default Planning 