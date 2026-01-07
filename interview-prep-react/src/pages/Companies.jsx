import { motion } from 'framer-motion'
import { Building2, Star, TrendingUp, CheckCircle2 } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function Companies() {
  const companies = [
    {
      name: 'Google',
      logo: '🔍',
      questions: 45,
      difficulty: 'Hard',
      topics: ['Algorithms', 'System Design', 'Behavioral'],
      successRate: '68%',
    },
    {
      name: 'Meta',
      logo: '📱',
      questions: 38,
      difficulty: 'Hard',
      topics: ['Coding', 'Product Design', 'Leadership'],
      successRate: '72%',
    },
    {
      name: 'Amazon',
      logo: '📦',
      questions: 52,
      difficulty: 'Medium',
      topics: ['DSA', 'Behavioral', 'Leadership'],
      successRate: '75%',
    },
    {
      name: 'Microsoft',
      logo: '💻',
      questions: 41,
      difficulty: 'Medium',
      topics: ['Coding', 'System Design', 'Behavioral'],
      successRate: '78%',
    },
    {
      name: 'Apple',
      logo: '🍎',
      questions: 33,
      difficulty: 'Hard',
      topics: ['Algorithms', 'Design', 'Behavioral'],
      successRate: '70%',
    },
    {
      name: 'Netflix',
      logo: '🎬',
      questions: 28,
      difficulty: 'Hard',
      topics: ['Coding', 'Culture Fit', 'System Design'],
      successRate: '65%',
    },
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
            Top Companies
          </h1>
          <p className="text-xl font-comic text-gray-600">
            Practice with real questions from FAANG and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, idx) => (
            <motion.div
              key={idx}
              className="card-sketch hover:border-4 hover:border-black group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, rotate: idx % 2 === 0 ? 2 : -2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl">{company.logo}</div>
                <div>
                  <h3 className="text-3xl font-hand font-bold text-gray-900">
                    {company.name}
                  </h3>
                  <p className="text-sm font-bold text-gray-600">
                    {company.questions} Questions
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold text-gray-700">
                    Difficulty: {company.difficulty}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-bold text-gray-700">
                    Success Rate: {company.successRate}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-bold text-gray-700 mb-2">Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {company.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full border-2 border-blue-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                className="w-full px-6 py-3 bg-black text-white font-bold rounded-lg border-4 border-black"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Questions
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
