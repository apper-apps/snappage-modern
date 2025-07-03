import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { formatFileSize } from '@/utils/formatters'

const CaptureHistory = ({ history, onClearHistory }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className="glass rounded-2xl p-6 border border-white/10 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="History" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-white">
              Capture History
            </h3>
            <p className="text-sm text-gray-400 font-body">
              {history.length} captures
            </p>
          </div>
        </div>

        <Button
          onClick={onClearHistory}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <ApperIcon name="Trash2" size={16} className="mr-2" />
          Clear
        </Button>
      </div>

      <motion.div
        className="space-y-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {history.map((capture) => (
          <motion.div
            key={capture.id}
            variants={item}
            className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <ApperIcon name="FileText" size={18} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-display font-medium text-white truncate">
                    {capture.domain}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                    PDF
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-sm text-gray-400 font-body truncate">
                    {capture.url}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <ApperIcon name="Calendar" size={12} />
                      <span>{format(new Date(capture.captureDate), 'MMM d, yyyy')}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ApperIcon name="Clock" size={12} />
                      <span>{format(new Date(capture.captureDate), 'h:mm a')}</span>
                    </span>
                    {capture.fileSize > 0 && (
                      <span className="flex items-center space-x-1">
                        <ApperIcon name="HardDrive" size={12} />
                        <span>{formatFileSize(capture.fileSize)}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-primary"
                onClick={() => window.open(capture.url, '_blank')}
              >
                <ApperIcon name="ExternalLink" size={16} />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default CaptureHistory