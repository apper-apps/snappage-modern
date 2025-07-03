import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] p-8">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated rings */}
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-primary/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 w-12 h-12 border-4 border-secondary/50 rounded-full border-t-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 w-8 h-8 border-4 border-accent/70 rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Loading text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-display font-semibold text-white mb-2">
            Loading...
          </h3>
          <p className="text-sm text-gray-400 font-body">
            Please wait while we prepare your content
          </p>
        </motion.div>

        {/* Shimmer bars */}
        <div className="w-full max-w-md space-y-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-4 bg-gray-800 rounded-lg shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Loading