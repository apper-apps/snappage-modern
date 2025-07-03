import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const DomainPreview = ({ domain }) => {
  return (
    <motion.div
      className="flex items-center space-x-3 p-4 bg-primary/10 border border-primary/20 rounded-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
        <ApperIcon name="FileText" size={16} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-body text-gray-300">
          PDF filename:
        </p>
        <p className="font-display font-medium text-white">
          {domain}.pdf
        </p>
      </div>
      <div className="text-primary">
        <ApperIcon name="ArrowRight" size={16} />
      </div>
    </motion.div>
  )
}

export default DomainPreview