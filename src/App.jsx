import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import InputData from './pages/InputData'
import MapPage from './pages/MapPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* full-width main, padding handled by .container CSS */}
      <main className="w-full container py-6 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/input" element={<InputData />} />
          <Route path="/maps" element={<MapPage />} />
        </Routes>
      </main>
      <footer className="bg-white dark:bg-[#071126] border-t border-gray-200 dark:border-[#0b1a2b] py-4 text-center text-sm">
        © {new Date().getFullYear()} Diskominfo - Monitorin Menara BTS
      </footer>
    </div>
  )
}