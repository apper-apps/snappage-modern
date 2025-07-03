import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = "No data available", 
  description = "There's nothing to show here yet.", 
  actionLabel = "Get Started",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-[200px] p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center max-w-md">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ApperIcon name={icon} size={40} className="text-primary" />
        </motion.div>

        <motion.h3
          className="text-xl font-display font-semibold text-white mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-gray-400 font-body mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {description}
        </motion.p>

        {onAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              onClick={onAction}
              variant="primary"
              className="inline-flex items-center space-x-2"
            >
              <ApperIcon name="Plus" size={18} />
              <span>{actionLabel}</span>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Empty