import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AddEngineer from './pages/AddEngineer'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-engineer" element={<AddEngineer />} />
      </Routes>
    </Router>
  )
}

export default App
