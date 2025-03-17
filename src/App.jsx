import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AddEngineer from './pages/AddEngineer'
import ExcelViewer from './components/ExcelViewer'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-engineer" element={<AddEngineer />} />
        <Route path="/excel-viewer" element={<ExcelViewer />} />
      </Routes>
    </Router>
  )
}

export default App
