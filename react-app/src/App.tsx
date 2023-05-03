import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import NotFoundPage from './pages/NotFoundPage'
import './assets/styles/App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My React App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
