import { motion } from 'framer-motion'

const ProgressRing = ({ progress, size = 60, strokeWidth = 4, color = 'text-primary' }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const colorMap = {
    'text-primary': '#5B4EE5',
    'text-secondary': '#8B7FFF',
    'text-accent': '#FF6B6B',
    'text-success': '#4ECB71',
    'text-warning': '#FFB84D',
    'text-error': '#FF5757',
    'text-info': '#4D9FFF'
  }

  const strokeColor = colorMap[color] || '#5B4EE5'

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-700"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${strokeColor}40 0%, transparent 70%)`,
          filter: 'blur(8px)'
        }}
        animate={{ 
          scale: progress > 0 ? [1, 1.1, 1] : 1,
          opacity: progress > 0 ? [0.2, 0.4, 0.2] : 0.2
        }}
        transition={{ 
          duration: 2, 
          repeat: progress > 0 && progress < 100 ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default ProgressRing