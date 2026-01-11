import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, Loader } from 'lucide-react'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/config'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleGoogleSignUp = async () => {
    setError('')
    setGoogleLoading(true)

    try {
      // Sign up with Google popup
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const token = await user.getIdToken()

      // Store user data and token
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAuthenticated: true
      }))
      localStorage.setItem('authToken', token)

      // Create user profile in backend
      try {
        await axios.post(`${API_URL}/profile/create/`, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || user.email.split('@')[0]
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (err) {
        console.log('Profile creation error:', err)
      }

      navigate('/resume-upload')
    } catch (error) {
      console.error('Google sign-up error:', error)
      setError(error.message || 'Failed to sign up with Google.')
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      const user = userCredential.user

      // Update user profile with name
      await updateProfile(user, {
        displayName: formData.name
      })

      const token = await user.getIdToken()

      // Store user data and token
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: formData.name,
        isAuthenticated: true
      }))
      localStorage.setItem('authToken', token)

      // Create user profile in backend
      try {
        await axios.post(`${API_URL}/profile/create/`, {
          uid: user.uid,
          email: user.email,
          name: formData.name
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (err) {
        console.log('Profile creation error:', err)
      }

      navigate('/resume-upload')
    } catch (error) {
      console.error('Signup error:', error)
      setError(error.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-6xl font-hand font-bold text-gray-900 mb-2">
            Join Us!
          </h1>
          <p className="text-lg font-comic text-gray-600">
            Start your interview prep journey
          </p>
        </div>

        <div className="card-sketch">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border-4 border-black rounded-lg font-bold text-lg focus:outline-none focus:ring-4 focus:ring-gray-400"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border-4 border-black rounded-lg font-bold text-lg focus:outline-none focus:ring-4 focus:ring-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-12 py-3 border-4 border-black rounded-lg font-bold text-lg focus:outline-none focus:ring-4 focus:ring-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border-4 border-black rounded-lg font-bold text-lg focus:outline-none focus:ring-4 focus:ring-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-100 border-4 border-red-500 rounded-lg">
                <p className="text-red-700 font-bold text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full btn-sketch bg-black text-white text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white font-bold text-gray-500">OR</span>
            </div>
          </div>

          {/* Google Sign Up Button */}
          <motion.button
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            className="w-full btn-sketch bg-white text-black text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border-4 border-black"
            whileHover={{ scale: googleLoading || loading ? 1 : 1.02 }}
            whileTap={{ scale: googleLoading || loading ? 1 : 0.98 }}
          >
            {googleLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Signing up...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </>
            )}
          </motion.button>

          <div className="mt-6 text-center">
            <p className="text-gray-600 font-bold">
              Already have an account?{' '}
              <Link to="/login" className="text-black underline hover:text-gray-700">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
