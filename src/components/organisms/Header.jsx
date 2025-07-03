import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  return (
    <motion.header 
      className="glass border-b border-white/10 sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-r from-primary to-secondary p-3 rounded-xl">
                <ApperIcon name="Camera" size={24} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">
                SnapPage
              </h1>
              <p className="text-sm text-gray-400 font-body">
                Full-page web capture
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <ApperIcon name="Zap" size={16} className="text-accent" />
              <span>Instant capture</span>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <ApperIcon name="Download" size={16} className="text-success" />
              <span>Auto-download</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header