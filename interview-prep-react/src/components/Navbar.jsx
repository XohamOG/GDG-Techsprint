import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Brain } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-12 h-12 bg-white border-4 border-black rounded-xl flex items-center justify-center transform rotate-3"
              whileHover={{ rotate: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="w-7 h-7 text-black" strokeWidth={2.5} />
            </motion.div>
            <span className="font-hand text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
              InterviewPrep
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/practice">Practice</NavLink>
            <NavLink to="/interviews">Interviews</NavLink>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/stats">Stats</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to={localStorage.getItem('user') ? "/interview-setup" : "/login"}>
              <motion.button
                className="btn-sketch bg-black text-white hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {localStorage.getItem('user') ? 'Start Interview' : 'Login'}
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden border-t-2 border-black bg-white"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-3">
              <MobileNavLink to="/practice" onClick={() => setIsOpen(false)}>
                Practice
              </MobileNavLink>
              <MobileNavLink to="/interviews" onClick={() => setIsOpen(false)}>
                Interviews
              </MobileNavLink>
              <MobileNavLink to="/companies" onClick={() => setIsOpen(false)}>
                Companies
              </MobileNavLink>
              <MobileNavLink to="/stats" onClick={() => setIsOpen(false)}>
                Stats
              </MobileNavLink>
              <MobileNavLink to="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </MobileNavLink>
              <Link to={localStorage.getItem('user') ? "/interview-setup" : "/login"} onClick={() => setIsOpen(false)}>
                <button className="w-full btn-sketch bg-black text-white hover:bg-gray-800 text-center">
                  {localStorage.getItem('user') ? 'Start Interview' : 'Login'}
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function NavLink({ to, children }) {
  return (
    <Link to={to}>
      <motion.span
        className="relative text-lg font-bold text-gray-700 hover:text-black transition-colors"
        whileHover={{ y: -2 }}
      >
        {children}
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-1 bg-black"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.span>
    </Link>
  )
}

function MobileNavLink({ to, onClick, children }) {
  return (
    <Link to={to} onClick={onClick}>
      <motion.div
        className="px-4 py-3 text-lg font-bold text-gray-700 hover:bg-gray-100 rounded-lg border-2 border-transparent hover:border-gray-400 transition-all"
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    </Link>
  )
}
