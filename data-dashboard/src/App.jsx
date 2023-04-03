import React from 'react';
import { useState } from 'react'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Routes } from 'react-router-dom';
import CharacterPage from './components/CharacterPage';
import './App.css'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/characters" element={<Dashboard />} />
          <Route path="/characters/:id" element={<CharacterPage/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
