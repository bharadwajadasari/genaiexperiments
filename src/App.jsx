import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AddEngineer from './pages/AddEngineer'
import Planning from './pages/Planning'
import TeamCapacity from './pages/TeamCapacity'
import AdjustCapacity from './pages/AdjustCapacity'
import AddProject from './pages/AddProject'
import Projects from './pages/Projects'
import EditProject from './pages/EditProject'
import ProjectDetails from './pages/ProjectDetails'
import { EngineerProvider } from './context/EngineerContext'

function App() {
  return (
    <EngineerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-engineer" element={<AddEngineer />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/team-capacity" element={<TeamCapacity />} />
          <Route path="/adjust-capacity" element={<AdjustCapacity />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </Router>
    </EngineerProvider>
  )
}

export default App
