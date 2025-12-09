import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Link = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      'px-3 py-2 rounded-md text-sm font-medium ' + (isActive ? 'bg-brand-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#0d1a2b]')
    }
  >
    {children}
  </NavLink>
)

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-[#071126] border-b border-gray-200 dark:border-[#0b1a2b] shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold shadow">
              M
            </div>
            <div className="text-lg font-semibold text-brand-700 dark:text-white">Monitorin Menara BTS</div>
          </div>

          <div className="hidden md:flex items-center space-x-1 ml-6">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/input">Input Data</Link>
            <Link to="/maps">Peta Menara</Link>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:block text-sm text-gray-600 dark:text-gray-300">Diskominfo</div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}