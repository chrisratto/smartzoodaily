import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import { AnimalProvider } from './contexts/AnimalContext';

function App() {
  return (
    <AnimalProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/animal/:animalId" element={<AnimalDetailPage />} />
          </Routes>
        </div>
      </Router>
    </AnimalProvider>
  );
}

export default App;