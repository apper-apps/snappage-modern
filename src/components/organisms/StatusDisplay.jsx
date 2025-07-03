import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import ProgressRing from '@/components/molecules/ProgressRing'
import Button from '@/components/atoms/Button'

const StatusDisplay = ({ status, progress, domain, error, onRetry }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'loading':
        return {
          title: 'Loading Webpage',
          description: 'Preparing to capture the page...',
          icon: 'Globe',
          color: 'text-info',
          bgColor: 'bg-info/10'
        }
      case 'capturing':
        return {
          title: 'Capturing Page',
          description: 'Scrolling and capturing the entire webpage...',
          icon: 'Camera',
          color: 'text-accent',
          bgColor: 'bg-accent/10'
        }
      case 'processing':
        return {
          title: 'Generating PDF',
          description: 'Converting captured content to PDF...',
          icon: 'FileText',
          color: 'text-warning',
          bgColor: 'bg-warning/10'
        }
      case 'success':
        return {
          title: 'Capture Complete!',
          description: `Successfully captured ${domain}`,
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10'
        }
      case 'error':
        return {
          title: 'Capture Failed',
          description: error || 'An error occurred during capture',
          icon: 'AlertCircle',
          color: 'text-error',
          bgColor: 'bg-error/10'
        }
      default:
        return {
          title: 'Ready',
          description: 'Enter a URL to start capturing',
          icon: 'Clock',
          color: 'text-gray-400',
          bgColor: 'bg-gray-800/10'
        }
    }
  }

  const config = getStatusConfig()

  return (
    <motion.div
      className="glass rounded-2xl p-6 border border-white/10 shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-6">
        <div className="relative flex-shrink-0">
          <ProgressRing
            progress={progress}
            size={80}
            strokeWidth={6}
            color={config.color}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}
              animate={{ 
                scale: ['capturing', 'processing'].includes(status) ? [1, 1.1, 1] : 1,
                rotate: status === 'processing' ? [0, 360] : 0
              }}
              transition={{ 
                duration: status === 'processing' ? 2 : 1,
                repeat: ['capturing', 'processing'].includes(status) ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <ApperIcon name={config.icon} size={20} className={config.color} />
            </motion.div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <motion.h3 
            className="text-xl font-display font-semibold text-white mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {config.title}
          </motion.h3>
          <motion.p 
            className="text-gray-300 font-body mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {config.description}
          </motion.p>
          
          {status !== 'idle' && status !== 'error' && (
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex-1">
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
              <div className="text-sm font-display font-medium gradient-text">
                {progress}%
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                onClick={onRetry}
                variant="secondary"
                size="sm"
                className="mt-2"
              >
                <ApperIcon name="RefreshCw" size={16} className="mr-2" />
                Try Again
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default StatusDisplay