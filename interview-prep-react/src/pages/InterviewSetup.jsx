import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code, MessageSquare, Database, Brain, Briefcase, FileText, Target, Rocket } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function InterviewSetup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    domain: '',
    jobDescription: '',
    interviewType: '',
    structure: '',
    difficulty: 'medium'
  })

  const domains = [
    'Software Engineering', 'Data Science', 'Product Management', 
    'DevOps', 'Frontend Development', 'Backend Development',
    'Full Stack', 'Machine Learning', 'Mobile Development', 'Other'
  ]

  const interviewTypes = [
    { id: 'technical', name: 'Technical Coding', icon: Code, desc: 'Algorithms, data structures, problem solving' },
    { id: 'behavioral', name: 'Behavioral', icon: MessageSquare, desc: 'STAR method, communication, experience' },
    { id: 'system-design', name: 'System Design', icon: Database, desc: 'Architecture, scalability, trade-offs' },
    { id: 'frontend', name: 'Frontend Round', icon: Code, desc: 'React, CSS, JavaScript, UI/UX' },
    { id: 'backend', name: 'Backend Round', icon: Database, desc: 'APIs, databases, server architecture' },
    { id: 'ml', name: 'ML/AI Round', icon: Brain, desc: 'Models, algorithms, data pipelines' },
  ]

  const structures = [
    { id: 'google', name: 'Google Style', desc: 'Focus on algorithms, system design, and Googleyness' },
    { id: 'meta', name: 'Meta Style', desc: 'Behavioral, coding, and system design balanced' },
    { id: 'amazon', name: 'Amazon Style', desc: 'Leadership principles and bar raiser approach' },
    { id: 'microsoft', name: 'Microsoft Style', desc: 'Technical depth with collaboration focus' },
    { id: 'startup', name: 'Startup Style', desc: 'Practical skills, culture fit, quick decision' },
    { id: 'custom', name: 'Custom Structure', desc: 'Create your own interview flow' },
  ]

  const handleStart = () => {
    localStorage.setItem('interviewConfig', JSON.stringify(config))
    navigate('/interview')
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-hand font-bold text-gray-900 mb-2">
            Setup Your Interview
          </h1>
          <p className="text-xl font-comic text-gray-600">
            Step {step} of 4
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="h-3 bg-gray-200 rounded-full border-2 border-gray-400 overflow-hidden">
            <motion.div
              className="h-full bg-black"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step 1: Domain */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            <div className="card-sketch">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-black" />
                <h2 className="text-3xl font-hand font-bold text-gray-900">
                  Select Your Domain
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {domains.map((domain) => (
                  <motion.button
                    key={domain}
                    onClick={() => setConfig({...config, domain})}
                    className={`p-4 rounded-lg border-4 font-bold text-left transition-all ${
                      config.domain === domain 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {domain}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={() => setStep(2)}
                disabled={!config.domain}
                className="w-full btn-sketch bg-black text-white py-4 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: config.domain ? 1.02 : 1 }}
                whileTap={{ scale: config.domain ? 0.98 : 1 }}
              >
                Next: Job Description →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Job Description */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            <div className="card-sketch">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-black" />
                <h2 className="text-3xl font-hand font-bold text-gray-900">
                  Job Description (Optional)
                </h2>
              </div>

              <p className="text-gray-600 font-bold mb-4">
                Paste the job description to get tailored interview questions
              </p>

              <textarea
                value={config.jobDescription}
                onChange={(e) => setConfig({...config, jobDescription: e.target.value})}
                className="w-full h-48 p-4 border-4 border-black rounded-lg font-comic text-lg focus:outline-none focus:ring-4 focus:ring-gray-400 mb-6"
                placeholder="Paste job description here or skip this step..."
              />

              <div className="flex gap-3">
                <motion.button
                  onClick={() => setStep(1)}
                  className="flex-1 btn-sketch bg-white text-black py-4 text-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Back
                </motion.button>
                <motion.button
                  onClick={() => setStep(3)}
                  className="flex-1 btn-sketch bg-black text-white py-4 text-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next: Interview Type →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Interview Type */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            <div className="card-sketch">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-8 h-8 text-black" />
                <h2 className="text-3xl font-hand font-bold text-gray-900">
                  Choose Interview Type
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {interviewTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    onClick={() => setConfig({...config, interviewType: type.id})}
                    className={`p-4 rounded-lg border-4 text-left transition-all ${
                      config.interviewType === type.id 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <type.icon className={`w-6 h-6 flex-shrink-0 ${
                        config.interviewType === type.id ? 'text-white' : 'text-black'
                      }`} />
                      <div>
                        <p className="font-bold text-lg mb-1">{type.name}</p>
                        <p className={`text-sm ${
                          config.interviewType === type.id ? 'text-gray-300' : 'text-gray-600'
                        }`}>{type.desc}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => setStep(2)}
                  className="flex-1 btn-sketch bg-white text-black py-4 text-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Back
                </motion.button>
                <motion.button
                  onClick={() => setStep(4)}
                  disabled={!config.interviewType}
                  className="flex-1 btn-sketch bg-black text-white py-4 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: config.interviewType ? 1.02 : 1 }}
                  whileTap={{ scale: config.interviewType ? 0.98 : 1 }}
                >
                  Next: Structure →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Structure */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            <div className="card-sketch">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-8 h-8 text-black" />
                <h2 className="text-3xl font-hand font-bold text-gray-900">
                  Interview Structure
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {structures.map((structure) => (
                  <motion.button
                    key={structure.id}
                    onClick={() => setConfig({...config, structure: structure.id})}
                    className={`p-4 rounded-lg border-4 text-left transition-all ${
                      config.structure === structure.id 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="font-bold text-lg mb-1">{structure.name}</p>
                    <p className={`text-sm ${
                      config.structure === structure.id ? 'text-gray-300' : 'text-gray-600'
                    }`}>{structure.desc}</p>
                  </motion.button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <div className="flex gap-3">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <motion.button
                      key={level}
                      onClick={() => setConfig({...config, difficulty: level})}
                      className={`flex-1 py-3 rounded-lg border-4 font-bold capitalize ${
                        config.difficulty === level 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white text-black border-black hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {level}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => setStep(3)}
                  className="flex-1 btn-sketch bg-white text-black py-4 text-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Back
                </motion.button>
                <motion.button
                  onClick={handleStart}
                  disabled={!config.structure}
                  className="flex-1 btn-sketch bg-black text-white py-4 text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: config.structure ? 1.02 : 1 }}
                  whileTap={{ scale: config.structure ? 0.98 : 1 }}
                >
                  <Rocket className="w-6 h-6" />
                  Start Interview!
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
