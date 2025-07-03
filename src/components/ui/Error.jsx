import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-[200px] p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-md">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-error/10 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ApperIcon name="AlertCircle" size={32} className="text-error" />
        </motion.div>

        <motion.h3
          className="text-xl font-display font-semibold text-white mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Something went wrong
        </motion.h3>

        <motion.p
          className="text-gray-400 font-body mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {message || 'An unexpected error occurred. Please try again.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            onClick={onRetry}
            variant="primary"
            className="inline-flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" size={18} />
            <span>Try Again</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Error