import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Trophy, Clock, MessageCircle, Code, TrendingUp, Target, 
  CheckCircle, XCircle, AlertCircle, ArrowRight, Home, BarChart3,
  Award, Star, ThumbsUp, Lightbulb
} from 'lucide-react'

export default function InterviewResults() {
  const navigate = useNavigate()
  const [interviewData, setInterviewData] = useState(null)
  const [overallScore, setOverallScore] = useState(0)
  const [aiInsights, setAiInsights] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('lastInterview')
    if (!data) {
      navigate('/profile')
      return
    }

    const interview = JSON.parse(data)
    setInterviewData(interview)

    // Calculate score (simulated)
    const score = Math.floor(Math.random() * 30) + 70 // 70-100
    setOverallScore(score)

    // Generate AI insights
    generateAIInsights(interview, score)
  }, [navigate])

  const generateAIInsights = (data, score) => {
    const insights = [
      {
        type: 'strength',
        icon: ThumbsUp,
        title: 'Clear Communication',
        description: 'You articulated your thoughts clearly and provided structured answers with concrete examples.'
      },
      {
        type: 'improvement',
        icon: Lightbulb,
        title: 'Technical Depth',
        description: 'Consider diving deeper into implementation details when discussing technical solutions.'
      },
      {
        type: 'strength',
        icon: Star,
        title: 'Problem-Solving Approach',
        description: 'Excellent systematic approach to breaking down complex problems into manageable parts.'
      },
      {
        type: 'improvement',
        icon: Target,
        title: 'Time Management',
        description: 'Spend less time on introductory parts and more on the core technical discussion.'
      }
    ]
    setAiInsights(insights)
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    return `${mins} min ${seconds % 60} sec`
  }

  if (!interviewData) return null

  const { config, duration, chatMessages, completedAt } = interviewData

  // Calculate metrics
  const responseCount = chatMessages.filter(m => m.type === 'user').length
  const avgResponseTime = responseCount > 0 ? Math.floor(duration / responseCount) : 0

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block p-4 bg-white border-4 border-black rounded-full mb-4">
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <h1 className="text-5xl font-hand font-bold text-gray-900 mb-2">
            Interview Complete!
          </h1>
          <p className="text-xl text-gray-600 font-comic">
            Great job on your {config.interviewType} interview
          </p>
        </motion.div>

        {/* Overall Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white to-gray-100 border-4 border-black rounded-2xl p-8 mb-8 text-center"
        >
          <div className="mb-4">
            <div className="text-8xl font-hand font-bold text-gray-900">{overallScore}</div>
            <div className="text-2xl font-bold text-gray-600 mt-2">Overall Score</div>
          </div>
          
          <div className="flex justify-center gap-2 mb-4">
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                className={`w-8 h-8 ${
                  idx < Math.floor(overallScore / 20)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="inline-block px-6 py-2 bg-black text-white rounded-full font-bold">
            {overallScore >= 90 ? 'Excellent Performance!' :
             overallScore >= 80 ? 'Very Good!' :
             overallScore >= 70 ? 'Good Job!' : 'Keep Practicing!'}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-sketch bg-white p-6"
          >
            <Clock className="w-8 h-8 text-gray-700 mb-3" />
            <div className="text-3xl font-hand font-bold text-gray-900">
              {formatDuration(duration)}
            </div>
            <div className="text-sm font-bold text-gray-600 mt-1">Total Duration</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-sketch bg-white p-6"
          >
            <MessageCircle className="w-8 h-8 text-gray-700 mb-3" />
            <div className="text-3xl font-hand font-bold text-gray-900">
              {responseCount}
            </div>
            <div className="text-sm font-bold text-gray-600 mt-1">Questions Answered</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card-sketch bg-white p-6"
          >
            <TrendingUp className="w-8 h-8 text-gray-700 mb-3" />
            <div className="text-3xl font-hand font-bold text-gray-900">
              {avgResponseTime}s
            </div>
            <div className="text-sm font-bold text-gray-600 mt-1">Avg Response Time</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card-sketch bg-white p-6"
          >
            <Award className="w-8 h-8 text-gray-700 mb-3" />
            <div className="text-3xl font-hand font-bold text-gray-900">
              {Math.floor(overallScore / 10)}/10
            </div>
            <div className="text-sm font-bold text-gray-600 mt-1">Interview Rating</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="card-sketch bg-white p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-gray-700" />
              <h2 className="text-2xl font-hand font-bold text-gray-900">AI Insights</h2>
            </div>

            <div className="space-y-4">
              {aiInsights.map((insight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    insight.type === 'strength'
                      ? 'bg-green-50 border-green-500'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <insight.icon className={`w-5 h-5 mt-1 ${
                      insight.type === 'strength' ? 'text-green-600' : 'text-blue-600'
                    }`} />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{insight.title}</h3>
                      <p className="text-sm text-gray-700 font-comic">{insight.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Question Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="card-sketch bg-white p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-gray-700" />
              <h2 className="text-2xl font-hand font-bold text-gray-900">Performance Breakdown</h2>
            </div>

            <div className="space-y-4">
              {[
                { skill: 'Communication', score: 92, color: 'bg-green-500' },
                { skill: 'Technical Knowledge', score: 85, color: 'bg-blue-500' },
                { skill: 'Problem Solving', score: 88, color: 'bg-purple-500' },
                { skill: 'Code Quality', score: 78, color: 'bg-yellow-500' },
                { skill: 'Time Management', score: 81, color: 'bg-red-500' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-700">{item.skill}</span>
                    <span className="font-bold text-gray-900">{item.score}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="card-sketch bg-white p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl font-hand font-bold text-gray-900">Interview Timeline</h2>
          </div>

          <div className="space-y-4">
            {chatMessages.filter(m => m.type === 'ai').map((msg, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-black rounded-full" />
                  {idx < chatMessages.filter(m => m.type === 'ai').length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 my-1" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="text-sm text-gray-500 mb-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-300">
                    <p className="font-comic text-gray-700">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            onClick={() => navigate('/interview-setup')}
            className="btn-sketch bg-black text-white px-8 py-3 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Another Interview
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={() => navigate('/stats')}
            className="btn-sketch bg-white text-black px-8 py-3 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart3 className="w-5 h-5" />
            View All Stats
          </motion.button>

          <motion.button
            onClick={() => navigate('/')}
            className="btn-sketch bg-white text-black px-8 py-3 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
