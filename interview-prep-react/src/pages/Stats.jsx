import { motion } from 'framer-motion'
import { TrendingUp, Award, Clock, Target, Brain, CheckCircle2, Zap, Calendar } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function Stats() {
  const stats = [
    { label: 'Total Problems', value: '127', icon: Target, color: 'gray' },
    { label: 'Problems Solved', value: '45', icon: CheckCircle2, color: 'gray' },
    { label: 'Current Streak', value: '12 days', icon: Award, color: 'gray' },
    { label: 'Total Time', value: '34h', icon: Clock, color: 'gray' },
  ]

  const recentActivity = [
    { date: '2 hours ago', problem: 'Binary Tree Inorder', type: 'Technical', status: 'Completed' },
    { date: '1 day ago', problem: 'Tell me about a challenge', type: 'Behavioral', status: 'Completed' },
    { date: '2 days ago', problem: 'Design Twitter', type: 'System Design', status: 'In Progress' },
    { date: '3 days ago', problem: 'Merge K Sorted Lists', type: 'Technical', status: 'Completed' },
  ]

  const skillProgress = [
    { skill: 'Data Structures', progress: 75, problems: 28 },
    { skill: 'Algorithms', progress: 60, problems: 22 },
    { skill: 'System Design', progress: 45, problems: 12 },
    { skill: 'Behavioral', progress: 80, problems: 18 },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-hand font-bold text-gray-900 mb-4">
            Your Dashboard
          </h1>
          <p className="text-xl font-comic text-gray-600">
            Track your progress and achievements
          </p>
        </motion.div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="card-sketch text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, rotate: idx % 2 === 0 ? 2 : -2 }}
            >
              <stat.icon className={`w-12 h-12 text-${stat.color}-600 mx-auto mb-3`} strokeWidth={2.5} />
              <p className="text-4xl font-hand font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-bold text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Progress */}
          <motion.div
            className="card-sketch"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-black" strokeWidth={2.5} />
              <h2 className="text-3xl font-hand font-bold text-gray-900">
                Skill Progress
              </h2>
            </div>

            <div className="space-y-6">
              {skillProgress.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-gray-900">{skill.skill}</span>
                    <span className="font-bold text-gray-600">{skill.problems} problems</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-400">
                    <motion.div
                      className="h-full bg-black"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-600 mt-1">{skill.progress}% Complete</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            className="card-sketch"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-8 h-8 text-blue-600" strokeWidth={2.5} />
              <h2 className="text-3xl font-hand font-bold text-gray-900">
                Recent Activity
              </h2>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 bg-gray-50 rounded-xl border-2 border-gray-300 hover:border-black transition-all"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ x: -5 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-gray-900">{activity.problem}</p>
                    {activity.status === 'Completed' && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 fill-green-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600 font-bold">{activity.date}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded border border-blue-300">
                      {activity.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      activity.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 border border-green-300' 
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div
          className="mt-8 card-sketch bg-white border-4 border-black"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-12 h-12 text-black" strokeWidth={2.5} />
            </motion.div>
            <div>
              <h3 className="text-2xl font-hand font-bold text-gray-900 mb-2">
                AI Insights & Recommendations
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <span className="font-comic text-gray-700">
                    You're excelling at behavioral questions! Consider tackling more system design problems.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <span className="font-comic text-gray-700">
                    Your current 12-day streak is impressive! Keep the momentum going.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <span className="font-comic text-gray-700">
                    Focus on dynamic programming patterns to improve algorithm skills by 20%.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
