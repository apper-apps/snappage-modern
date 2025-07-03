import { motion } from "framer-motion";
import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";

const CapturePreview = ({ url, status, progress }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const getStatusMessage = () => {
    switch (status) {
      case 'loading':
        return 'Loading webpage...'
      case 'capturing':
        return 'Capturing full page...'
      case 'processing':
        return 'Generating PDF...'
      case 'success':
        return 'Capture complete!'
      default:
        return 'Preparing...'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return 'Globe'
      case 'capturing':
        return 'Camera'
      case 'processing':
        return 'FileText'
      case 'success':
        return 'CheckCircle'
      default:
        return 'Clock'
    }
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
          <div className="relative">
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center"
              animate={{ 
                scale: status === 'capturing' ? [1, 1.1, 1] : 1,
                rotate: status === 'processing' ? [0, 360] : 0
}}
              transition={{ 
                duration: status === 'capturing' ? 1 : status === 'processing' ? 2 : 0.5,
                repeat: status === 'capturing' || status === 'processing' ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <ApperIcon name={getStatusIcon()} size={16} className="text-white" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-white">
              {getStatusMessage()}
            </h3>
            <p className="text-sm text-gray-400 font-body">
              {progress}% complete
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-display font-bold gradient-text">
            {progress}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Preview Frame */}
      <div className="relative">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-xs text-gray-300 font-mono">
              {url}
            </div>
          </div>
          
          <div className="relative bg-white rounded overflow-hidden" style={{ height: '300px' }}>
            {!iframeLoaded && (
              <div className="absolute inset-0 z-10">
                <Loading />
              </div>
            )}
            
            <iframe
              src={url}
              className="w-full h-full border-0"
              title="Webpage Preview"
              onLoad={() => setIframeLoaded(true)}
              style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%' }}
            />
            
            {/* Capture overlay effect */}
            {status === 'capturing' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent pointer-events-none"
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CapturePreview