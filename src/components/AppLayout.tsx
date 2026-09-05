import { NavLink, Outlet } from 'react-router-dom'
import { Atom } from 'lucide-react'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/practice', label: 'Practice' },
  { to: '/history', label: 'History' },
  { to: '/statistics', label: 'Statistics' },
  { to: '/bank', label: 'Question Bank' },
]

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-navy-100 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-navy-950 text-lg shrink-0">
            <Atom className="size-6 text-accent-500" aria-hidden="true" />
            <span>Physics Prep</span>
          </NavLink>
          <nav className="flex items-center gap-1 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold transition-colors ${
                    isActive ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-navy-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
