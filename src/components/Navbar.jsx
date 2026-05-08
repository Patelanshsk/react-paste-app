import React from 'react'
import { NavLink } from 'react-router-dom'
import { ClipboardList } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='w-full flex flex-col sm:flex-row justify-between items-center px-8 mt-6 mb-8 max-w-7xl mx-auto'>
      <div className="flex items-center gap-3 mb-4 sm:mb-0 select-none">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
          <ClipboardList className="text-white" size={24} />
        </div>
        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight">
          PasteApp
        </span>
      </div>

      <div className='flex flex-row gap-2 justify-center bg-zinc-800/40 p-1.5 rounded-2xl backdrop-blur-md border border-zinc-700/50 shadow-xl'>
        <NavLink
          to="/"
          className={({ isActive }) => 
            `px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50'}`
          }
        >
            Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) => 
            `px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50'}`
          }
        >
            Pastes
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar