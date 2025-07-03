import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const CaptureButton = ({ disabled, loading, status }) => {
  const getButtonConfig = () => {
    switch (status) {
      case 'loading':
        return {
          text: 'Loading...',
          icon: 'Loader',
          variant: 'primary'
        }
      case 'capturing':
        return {
          text: 'Capturing...',
          icon: 'Camera',
          variant: 'primary'
        }
      case 'processing':
        return {
          text: 'Processing...',
          icon: 'FileText',
          variant: 'primary'
        }
      case 'success':
        return {
          text: 'Captured!',
          icon: 'CheckCircle',
          variant: 'success'
        }
      case 'error':
        return {
          text: 'Failed',
          icon: 'AlertCircle',
          variant: 'error'
        }
      default:
        return {
          text: 'Capture Page',
          icon: 'Camera',
          variant: 'accent'
        }
    }
  }

  const config = getButtonConfig()

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        type="submit"
        disabled={disabled}
        variant={config.variant}
        size="lg"
        className={`w-full h-14 text-lg font-display font-semibold ${
          loading ? 'pulse-glow' : ''
        }`}
      >
        <motion.div
          className="flex items-center justify-center space-x-3"
          animate={loading ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
          transition={{ duration: 1.5, repeat: loading ? Infinity : 0 }}
        >
          <motion.div
            animate={loading ? { rotate: 360 } : { rotate: 0 }}
            transition={{ 
              duration: 1, 
              repeat: loading ? Infinity : 0,
              ease: "linear"
            }}
          >
            <ApperIcon name={config.icon} size={24} />
          </motion.div>
          <span>{config.text}</span>
        </motion.div>
      </Button>
    </motion.div>
  )
}

export default CaptureButton