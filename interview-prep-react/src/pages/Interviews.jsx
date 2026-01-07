import { motion } from 'framer-motion'
import { Code, MessageSquare, Database, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Link, Route, Routes } from 'react-router-dom'

export default function Interviews() {
  return (
    <Routes>
      <Route path="/" element={<InterviewsList />} />
      <Route path="/technical" element={<TechnicalPage />} />
      <Route path="/behavioral" element={<BehavioralPage />} />
      <Route path="/system-design" element={<SystemDesignPage />} />
    </Routes>
  )
}

function InterviewsList() {
  const types = [
    {
      title: 'Technical Interviews',
      description: 'Coding problems, algorithms, data structures, and problem-solving with AI assistance',
      icon: Code,
      color: 'border-4 border-black bg-white',
      path: '/interviews/technical',
      count: '250+ Questions',
    },
    {
      title: 'Behavioral Interviews',
      description: 'STAR method, communication skills, and situational questions with AI coaching',
      icon: MessageSquare,
      color: 'border-4 border-black bg-white',
      path: '/interviews/behavioral',
      count: '150+ Scenarios',
    },
    {
      title: 'System Design',
      description: 'Architecture, scalability, and design patterns with AI-guided learning',
      icon: Database,
      color: 'border-4 border-black bg-white',
      path: '/interviews/system-design',
      count: '100+ Systems',
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl md:text-7xl font-hand font-bold text-gray-900 mb-4">
            Interview Types
          </h1>
          <p className="text-2xl font-comic text-gray-600">
            Choose your path to interview success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {types.map((type, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <Link to={type.path}>
                <motion.div
                  className="card-sketch h-full hover:border-4 hover:border-black"
                  whileHover={{ y: -8, rotate: idx % 2 === 0 ? 2 : -2 }}
                >
                  <motion.div
                    className={`w-24 h-24 rounded-2xl ${type.color} flex items-center justify-center mb-6 transform rotate-3`}
                    whileHover={{ rotate: -3, scale: 1.1 }}
                  >
                    <type.icon className="w-12 h-12 text-black" strokeWidth={2.5} />
                  </motion.div>
                  
                  <div className="mb-4">
                    <h3 className="text-3xl font-hand font-bold text-gray-900 mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm font-bold text-gray-700 mb-3">{type.count}</p>
                  </div>
                  
                  <p className="text-lg font-comic text-gray-700 leading-relaxed mb-6">
                    {type.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-black font-bold">
                    <span>Explore Questions</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TechnicalPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-hand font-bold text-gray-900 mb-4">Technical Interviews</h1>
        <p className="text-xl font-comic text-gray-600">250+ coding problems with AI assistance</p>
      </div>
    </div>
  )
}

function BehavioralPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-hand font-bold text-gray-900 mb-4">Behavioral Interviews</h1>
        <p className="text-xl font-comic text-gray-600">150+ scenarios with STAR framework</p>
      </div>
    </div>
  )
}

function SystemDesignPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-hand font-bold text-gray-900 mb-4">System Design</h1>
        <p className="text-xl font-comic text-gray-600">100+ system design challenges</p>
      </div>
    </div>
  )
}
