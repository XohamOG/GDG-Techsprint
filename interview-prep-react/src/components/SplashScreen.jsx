import { motion } from 'framer-motion'
import { Code, Sparkles, Brain } from 'lucide-react'

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5 bg-gray-300"
              style={{ top: `${i * 5}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: i * 0.02 }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute h-full w-0.5 bg-gray-300"
              style={{ left: `${i * 5}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: i * 0.02 }}
            />
          ))}
        </div>
      </div>

      {/* Floating doodles */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border-4 border-dashed border-blue-400 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 border-4 border-dashed border-green-400 rounded-lg"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />

      <motion.div
        className="absolute top-40 right-40 w-16 h-16 border-4 border-dashed border-gray-600"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1
          }}
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Brain className="w-20 h-20 text-gray-900" strokeWidth={2.5} />
            </motion.div>
            
            <motion.h1
              className="text-7xl font-hand font-bold text-gray-900"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              InterviewPrep
            </motion.h1>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-16 h-16 text-yellow-400 fill-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.2
            }}
          >
            <Code className="w-12 h-12 text-blue-500" strokeWidth={2} />
          </motion.div>
          
          <motion.p
            className="text-2xl font-comic text-gray-600"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            AI-Powered Interview Practice
          </motion.p>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          className="flex gap-3 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-gray-800 rounded-full"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom doodle line */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 h-2 bg-gray-900"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </div>
  )
}
