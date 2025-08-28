import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUserCircle, FaCalendarCheck, FaSignOutAlt, FaUserMd, FaHome, FaInfoCircle, FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { token, setToken } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/doctors', label: 'Find Doctors', icon: <FaUserMd /> },
    { path: '/about', label: 'About Us', icon: <FaInfoCircle /> },
    { path: '/contact', label: 'Contact', icon: <FaPhoneAlt /> },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              SMAART Healthcare
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative group flex items-center space-x-1 text-sm font-medium transition-colors duration-300
                  ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: location.pathname === item.path ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </NavLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <FaUserCircle className="text-xl" />
                  <span className="font-medium">My Account</span>
                </motion.button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <NavLink 
                        to="/my-appointments" 
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                      >
                        <FaCalendarCheck />
                        <span>My Appointments</span>
                      </NavLink>
                      <NavLink 
                        to="/medical-records" 
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                      >
                        <FaUserMd />
                        <span>Medical Records</span>
                      </NavLink>
                      <NavLink 
                        to="/my-profile" 
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                      >
                        <FaUserCircle />
                        <span>My Profile</span>
                      </NavLink>
                      <button 
                        onClick={logout}
                        className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-300"
                      >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign In
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) => `
                    flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-300
                    ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
              {token ? (
                <>
                  <NavLink
                    to="/my-appointments"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <FaCalendarCheck className="text-lg" />
                    <span>My Appointments</span>
                  </NavLink>
                  <button
                    onClick={() => {
                      logout()
                      setShowMenu(false)
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-300"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate('/login')
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-300"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar