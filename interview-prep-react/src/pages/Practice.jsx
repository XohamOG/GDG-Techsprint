import { motion } from 'framer-motion'
import { useState } from 'react'
import { Code, Brain, Sparkles, Play, CheckCircle2, Clock, Award } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Practice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      type: 'Technical',
      category: 'Arrays',
      aiFeatures: ['Real-time hints', 'Code review', 'Optimization tips'],
      solved: true,
      timeEstimate: '15 min',
    },
    {
      id: 2,
      title: 'Tell Me About Yourself',
      difficulty: 'Easy',
      type: 'Behavioral',
      category: 'Introduction',
      aiFeatures: ['STAR framework', 'Communication tips', 'Voice analysis'],
      solved: false,
      timeEstimate: '10 min',
    },
    {
      id: 3,
      title: 'Design a URL Shortener',
      difficulty: 'Medium',
      type: 'System Design',
      category: 'Web Systems',
      aiFeatures: ['Architecture guidance', 'Scalability tips', 'Trade-off analysis'],
      solved: false,
      timeEstimate: '45 min',
    },
    {
      id: 4,
      title: 'Binary Tree Traversal',
      difficulty: 'Medium',
      type: 'Technical',
      category: 'Trees',
      aiFeatures: ['Visual debugger', 'Pattern recognition', 'Time complexity'],
      solved: true,
      timeEstimate: '25 min',
    },
    {
      id: 5,
      title: 'Handle Conflict at Work',
      difficulty: 'Medium',
      type: 'Behavioral',
      category: 'Leadership',
      aiFeatures: ['Example scenarios', 'Response evaluation', 'Tone analysis'],
      solved: false,
      timeEstimate: '15 min',
    },
    {
      id: 6,
      title: 'Design Instagram',
      difficulty: 'Hard',
      type: 'System Design',
      category: 'Social Media',
      aiFeatures: ['Component design', 'Database schema', 'Load balancing'],
      solved: false,
      timeEstimate: '60 min',
    },
  ]

  const difficultyColors = {
    Easy: 'bg-green-400',
    Medium: 'bg-yellow-400',
    Hard: 'bg-red-400',
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-black" strokeWidth={2.5} />
            <h1 className="text-6xl font-hand font-bold text-gray-900">
              AI Practice Arena
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-xl font-comic text-gray-600">
            Get real-time AI feedback as you practice
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="card-sketch mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-6 py-3 border-4 border-black rounded-lg font-bold text-lg bg-white focus:outline-none focus:ring-4 focus:ring-gray-400"
              >
                <option value="all">All Types</option>
                <option value="Technical">Technical</option>
                <option value="Behavioral">Behavioral</option>
                <option value="System Design">System Design</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-6 py-3 border-4 border-black rounded-lg font-bold text-lg bg-white focus:outline-none focus:ring-4 focus:ring-gray-400"
              >
                <option value="all">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* AI Feature Banner */}
        <motion.div
          className="card-sketch bg-white mb-8 border-4 border-black"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-black fill-black" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-hand font-bold text-gray-900 mb-1">
                AI-Powered Practice
              </h3>
              <p className="text-lg font-comic text-gray-700">
                Get instant feedback, hints, and personalized guidance on every problem
              </p>
            </div>
          </div>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, idx) => (
            <motion.div
              key={problem.id}
              className="card-sketch hover:border-4 hover:border-black group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileHover={{ y: -5, rotate: idx % 2 === 0 ? 1 : -1 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-hand font-bold text-gray-900">
                      {problem.title}
                    </h3>
                    {problem.solved && (
                      <CheckCircle2 className="w-6 h-6 text-green-600 fill-green-600" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 ${difficultyColors[problem.difficulty]} text-gray-900 font-bold text-sm rounded-full`}>
                      {problem.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold text-sm rounded-full border-2 border-blue-300">
                      {problem.type}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 font-bold text-sm rounded-full border-2 border-gray-300">
                      {problem.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Features */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-black" />
                  <span className="font-bold text-sm text-gray-700">AI Features:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {problem.aiFeatures.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white text-black text-sm font-bold rounded-lg border-2 border-black"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-gray-300">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold text-sm">{problem.timeEstimate}</span>
                </div>
                
                <motion.button
                  className="flex items-center gap-2 px-6 py-2 bg-black text-white font-bold rounded-lg border-4 border-black"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  {problem.solved ? 'Practice Again' : 'Start'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Dashboard */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { label: 'Problems Solved', value: '23', icon: CheckCircle2, color: 'green' },
            { label: 'Current Streak', value: '7 days', icon: Award, color: 'yellow' },
            { label: 'Practice Time', value: '12h', icon: Clock, color: 'blue' },
            { label: 'AI Sessions', value: '45', icon: Brain, color: 'purple' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="card-sketch text-center"
              whileHover={{ y: -5, rotate: idx % 2 === 0 ? 2 : -2 }}
            >
              <stat.icon className={`w-10 h-10 text-${stat.color}-600 mx-auto mb-3`} strokeWidth={2.5} />
              <p className="text-3xl font-hand font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-bold text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
