import { useState } from 'react'
import { motion } from 'framer-motion'
import UrlInput from '@/components/molecules/UrlInput'
import CaptureButton from '@/components/molecules/CaptureButton'
import DomainPreview from '@/components/molecules/DomainPreview'

const CaptureForm = ({ url, domain, status, onUrlChange, onCapture }) => {
  const [inputFocused, setInputFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onCapture()
  }

  return (
    <motion.div
      className="glass rounded-2xl p-8 border border-white/10 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="text-3xl font-display font-bold text-white mb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Capture Any Webpage
        </motion.h2>
        <motion.p 
          className="text-gray-300 text-lg font-body"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Enter a URL to capture the entire page as a PDF
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <UrlInput
            value={url}
            onChange={onUrlChange}
            disabled={status === 'loading' || status === 'capturing' || status === 'processing'}
            focused={inputFocused}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />

          {domain && (
            <DomainPreview domain={domain} />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CaptureButton
            disabled={!url || status === 'loading' || status === 'capturing' || status === 'processing'}
            loading={status === 'loading' || status === 'capturing' || status === 'processing'}
            status={status}
          />
        </motion.div>
      </form>
    </motion.div>
  )
}

export default CaptureForm