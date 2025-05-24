import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DatabaseProvider } from './db/DatabaseConnection';
import Dashboard from './components/Dashboard';

import HomePage from './pages/HomePage';
import PatientsPage from './pages/PatientsPage';
import QueryPage from './pages/QueryPage';

function App() {
  return (
    <DatabaseProvider>
      <Router>
        <header className="header">
          <h1 className="header-title">Patient Registration App</h1>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/patient" className="nav-link">Register</Link>
            <Link to="/patients" className="nav-link">Patients</Link>
            <Link to="/query" className="nav-link">SQL Query</Link>
            
          </nav>
        </header>
        
        <main className="container">
          <Routes>
             <Route path="/" element={<Dashboard />} />
            <Route path="/patient" element={<HomePage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/query" element={<QueryPage />} />
           
          </Routes>
        </main>
      </Router>
    </DatabaseProvider>
  );
}

export default App;
