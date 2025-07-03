import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import CapturePage from '@/components/pages/CapturePage'

function App() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-background to-surface"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Routes>
        <Route path="/" element={<CapturePage />} />
      </Routes>
    </motion.div>
  )
}

export default App