import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './About.jsx'
import Event from './Event.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './Chatbot/Chatbot'
import Ticket from './Ticket/Ticket'
import Sculptures from './pages/Sculptures'
import Dashboard from './Dashboard/dashboard'
import Login from './pages/Login'
import Tour from './pages/Tour'
createRoot(document.getElementById('root')).render(
  <Router>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/about" element={<About />} />
    <Route path="/event" element={<Event />} />
    <Route path="/chatbot" element={<Chatbot />} />
    <Route path="/ticket" element={<Ticket />} />
    <Route path="/ticket" element={<Ticket />} />
    <Route path="/sculptures" element={<Sculptures />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/tour" element={<Tour />} />
    {/* <Route path="*" element={<NotFoundPage />} /> Catch-all route for undefined paths */}
  </Routes>
</Router>
)
