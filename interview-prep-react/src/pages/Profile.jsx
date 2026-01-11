import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Award, Calendar, LogOut, Pencil, FileText, Briefcase, GraduationCap, Code, Upload } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import axios from 'axios'
import Navbar from '../components/Navbar'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [resumeData, setResumeData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
    } else {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchResumeData(parsedUser.uid)
    }
  }, [navigate])

  const fetchResumeData = async (uid) => {
    try {
      const response = await axios.get(`${API_URL}/resume/`, {
        params: { uid },
        headers: {
          'X-User-UID': uid
        }
      })
      setResumeData(response.data)
      localStorage.setItem('resumeData', JSON.stringify(response.data))
    } catch (error) {
      console.log('No resume data found:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('user')
      localStorage.removeItem('authToken')
      localStorage.removeItem('userProfile')
      localStorage.removeItem('resumeData')
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-6xl font-hand font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-xl font-comic text-gray-600">
            Manage your account and track your progress
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-sketch mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white border-4 border-black rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-black" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-hand font-bold text-gray-900">
                      {resumeData?.full_name || user.displayName || user.email?.split('@')[0]}
                    </h2>
                    <p className="text-gray-600 font-bold flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {resumeData?.email || user.email}
                    </p>
                    {resumeData?.phone && (
                      <p className="text-gray-600 font-bold mt-1">📱 {resumeData.phone}</p>
                    )}
                  </div>
                </div>
                <Link to="/resume-upload">
                  <motion.button
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Update Resume"
                  >
                    <Upload className="w-5 h-5 text-gray-700" />
                  </motion.button>
                </Link>
              </div>

              {resumeData?.summary && (
                <div className="mb-6 p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                  <h3 className="text-sm font-bold text-gray-700 mb-2">Professional Summary</h3>
                  <p className="text-gray-800 font-comic">{resumeData.summary}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-dashed border-gray-300">
                <div>
                  <p className="text-sm text-gray-600 font-bold mb-1">Joined</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-bold mb-1">Resume Status</p>
                  <p className="text-lg font-bold text-gray-900">
                    {resumeData ? '✅ Uploaded' : '⏳ Pending'}
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Information */}
            {resumeData && (
              <>
                {/* Skills */}
                {resumeData.skills && resumeData.skills.length > 0 && (
                  <div className="card-sketch mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Code className="w-6 h-6 text-black" />
                      <h3 className="text-2xl font-hand font-bold text-gray-900">Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white border-2 border-black rounded-full text-sm font-bold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {resumeData.experience && resumeData.experience.length > 0 && (
                  <div className="card-sketch mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="w-6 h-6 text-black" />
                      <h3 className="text-2xl font-hand font-bold text-gray-900">Experience</h3>
                    </div>
                    <div className="space-y-4">
                      {resumeData.experience.map((exp, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                          <h4 className="font-bold text-gray-900">{exp.title}</h4>
                          {exp.company && <p className="text-sm text-gray-600 font-bold">{exp.company}</p>}
                          {exp.description && <p className="text-sm text-gray-700 font-comic mt-2">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {resumeData.education && resumeData.education.length > 0 && (
                  <div className="card-sketch mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="w-6 h-6 text-black" />
                      <h3 className="text-2xl font-hand font-bold text-gray-900">Education</h3>
                    </div>
                    <div className="space-y-4">
                      {resumeData.education.map((edu, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                          <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                          {edu.institution && <p className="text-sm text-gray-600 font-bold">{edu.institution}</p>}
                          {edu.year && <p className="text-sm text-gray-600">{edu.year}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {!resumeData && !loading && (
              <div className="card-sketch mb-6 text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-hand font-bold text-gray-900 mb-2">No Resume Uploaded</h3>
                <p className="text-gray-600 font-comic mb-6">
                  Upload your resume to unlock personalized interview preparation
                </p>
                <Link to="/resume-upload">
                  <motion.button
                    className="btn-sketch bg-black text-white px-6 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Upload Resume
                  </motion.button>
                </Link>
              </div>
            )}

            {/* Recent Activity */}
            <div className="card-sketch">
              <h3 className="text-2xl font-hand font-bold text-gray-900 mb-4">
                Recent Interviews
              </h3>
              
              <div className="space-y-3">
                {[
                  { type: 'Technical', company: 'Google', score: '85%', date: '2 days ago' },
                  { type: 'Behavioral', company: 'Meta', score: '92%', date: '5 days ago' },
                  { type: 'System Design', company: 'Amazon', score: '78%', date: '1 week ago' },
                ].map((interview, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-xl border-2 border-gray-300 hover:border-black transition-all cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{interview.type} - {interview.company}</p>
                        <p className="text-sm text-gray-600 font-bold">{interview.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-hand font-bold text-gray-900">{interview.score}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-sketch mb-6">
              <h3 className="text-2xl font-hand font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Link to="/interview-setup">
                  <motion.button
                    className="w-full btn-sketch bg-black text-white py-3 text-left px-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🚀 Start New Interview
                  </motion.button>
                </Link>
                
                <Link to="/stats">
                  <motion.button
                    className="w-full btn-sketch bg-white text-black py-3 text-left px-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    📊 View Analytics
                  </motion.button>
                </Link>

                <Link to="/practice">
                  <motion.button
                    className="w-full btn-sketch bg-white text-black py-3 text-left px-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    💻 Practice Problems
                  </motion.button>
                </Link>
              </div>
            </div>

            <div className="card-sketch bg-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-gray-900" />
                <h3 className="text-2xl font-hand font-bold text-gray-900">
                  Achievements
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white rounded-lg border-2 border-gray-300">
                  <p className="text-3xl mb-1">🏆</p>
                  <p className="text-xs font-bold text-gray-700">First Interview</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border-2 border-gray-300">
                  <p className="text-3xl mb-1">🔥</p>
                  <p className="text-xs font-bold text-gray-700">7 Day Streak</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border-2 border-gray-300">
                  <p className="text-3xl mb-1">⭐</p>
                  <p className="text-xs font-bold text-gray-700">Top Score</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border-2 border-gray-300">
                  <p className="text-3xl mb-1">💯</p>
                  <p className="text-xs font-bold text-gray-700">Perfect Run</p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleLogout}
              className="w-full mt-6 btn-sketch bg-white text-red-600 py-3 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
