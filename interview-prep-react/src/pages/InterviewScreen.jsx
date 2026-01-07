import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Code, Palette, MessageCircle, StopCircle, Mic, MicOff, 
  Video, VideoOff, Maximize2, Clock, Send
} from 'lucide-react'

export default function InterviewScreen() {
  const navigate = useNavigate()
  const [config, setConfig] = useState(null)
  const [activeTab, setActiveTab] = useState('code')
  const [code, setCode] = useState('// Write your code here...\n\n')
  const [chatMessages, setChatMessages] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const chatEndRef = useRef(null)

  const questions = [
    "Tell me about yourself and your experience with software development.",
    "What's your approach to solving complex problems?",
    "Can you explain a challenging project you worked on?",
    "How do you handle tight deadlines and pressure?",
    "Where do you see yourself in 5 years?"
  ]

  useEffect(() => {
    const savedConfig = localStorage.getItem('interviewConfig')
    if (!savedConfig) {
      navigate('/interview-setup')
    } else {
      setConfig(JSON.parse(savedConfig))
      // Initial AI message
      setTimeout(() => {
        addAIMessage("Hello! I'm your AI interviewer. Let's begin with an introduction. " + questions[0])
      }, 1000)
    }
  }, [navigate])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const addAIMessage = (message) => {
    setChatMessages(prev => [...prev, {
      type: 'ai',
      message,
      timestamp: new Date().toISOString()
    }])
  }

  const addUserMessage = (message) => {
    setChatMessages(prev => [...prev, {
      type: 'user',
      message,
      timestamp: new Date().toISOString()
    }])
  }

  const handleSendMessage = () => {
    if (!userInput.trim()) return
    
    addUserMessage(userInput)
    setUserInput('')
    
    // Simulate AI response
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        addAIMessage("Great answer! Let me ask you this: " + questions[currentQuestion + 1])
      } else {
        addAIMessage("Thank you for your responses! Feel free to ask me any questions you have.")
      }
    }, 2000)
  }

  const handleEndInterview = () => {
    // Save interview data
    const interviewData = {
      config,
      duration: timeElapsed,
      chatMessages,
      code,
      completedAt: new Date().toISOString()
    }
    localStorage.setItem('lastInterview', JSON.stringify(interviewData))
    navigate('/interview-results')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!config) return null

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-4 border-black px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-hand font-bold text-gray-900">
              {config.interviewType?.toUpperCase()} Interview
            </h1>
            <p className="text-sm text-gray-600 font-bold">{config.domain}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-700" />
              <span className="font-bold text-xl font-mono">{formatTime(timeElapsed)}</span>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 rounded-lg border-2 ${
                  isRecording ? 'bg-red-500 border-red-600 text-white' : 'bg-white border-black'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </motion.button>
              
              <motion.button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-2 rounded-lg border-2 ${
                  isVideoOn ? 'bg-blue-500 border-blue-600 text-white' : 'bg-white border-black'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </motion.button>
            </div>

            <motion.button
              onClick={handleEndInterview}
              className="btn-sketch bg-red-600 text-white px-6 py-2 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StopCircle className="w-5 h-5" />
              End Interview
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Code Editor / Whiteboard */}
        <div className="flex-1 flex flex-col border-r-4 border-black">
          {/* Tabs */}
          <div className="bg-white border-b-2 border-black flex">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 py-3 px-6 font-bold flex items-center justify-center gap-2 border-r-2 border-black ${
                activeTab === 'code' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <Code className="w-5 h-5" />
              Code Editor
            </button>
            <button
              onClick={() => setActiveTab('whiteboard')}
              className={`flex-1 py-3 px-6 font-bold flex items-center justify-center gap-2 ${
                activeTab === 'whiteboard' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              <Palette className="w-5 h-5" />
              Whiteboard
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'code' && (
              <div className="h-full">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-6 font-mono text-lg bg-gray-900 text-green-400 focus:outline-none resize-none"
                  placeholder="// Write your code here..."
                  spellCheck="false"
                />
              </div>
            )}

            {activeTab === 'whiteboard' && (
              <div className="h-full bg-white p-4">
                <WhiteboardCanvas />
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - AI Chat */}
        <div className="w-[400px] flex flex-col bg-white">
          <div className="bg-black text-white py-3 px-6 flex items-center gap-3">
            <MessageCircle className="w-5 h-5" />
            <h3 className="font-bold text-lg">AI Interviewer</h3>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {chatMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-black border-2 border-gray-300'
                  }`}
                >
                  <p className="text-sm font-comic">{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t-4 border-black p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your answer..."
                className="flex-1 px-4 py-2 border-4 border-black rounded-lg font-comic focus:outline-none focus:ring-4 focus:ring-gray-400"
              />
              <motion.button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-black text-white rounded-lg border-4 border-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle Bar */}
      <div className="bg-black text-white py-3 px-6 border-t-4 border-black">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <p className="font-comic text-sm">
            {chatMessages.length > 0 
              ? chatMessages[chatMessages.length - 1].type === 'ai' 
                ? chatMessages[chatMessages.length - 1].message 
                : "Listening to your response..."
              : "Waiting for interview to start..."}
          </p>
        </div>
      </div>
    </div>
  )
}

// Simple Whiteboard Component
function WhiteboardCanvas() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(3)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-gray-300">
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold">Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 border-4 border-black rounded cursor-pointer"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-bold">Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(e.target.value)}
            className="w-24"
          />
        </div>

        <button
          onClick={clearCanvas}
          className="ml-auto px-4 py-2 bg-white border-4 border-black rounded-lg font-bold hover:bg-gray-100"
        >
          Clear
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="flex-1 border-4 border-black rounded-lg cursor-crosshair"
      />
    </div>
  )
}
