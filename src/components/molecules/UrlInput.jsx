import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const UrlInput = ({ value, onChange, disabled, focused, onFocus, onBlur }) => {
  const [showPasteButton, setShowPasteButton] = useState(false)
  const inputRef = useRef(null)

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
      inputRef.current?.focus()
    } catch (error) {
      console.error('Failed to read clipboard:', error)
    }
  }

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2 font-body">
        Website URL
      </label>
      
      <div className="relative">
        <motion.div
          className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
            focused ? 'ring-2 ring-primary/50' : ''
          }`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center">
            <div className="absolute left-4 z-10">
              <ApperIcon name="Globe" size={20} className="text-gray-400" />
            </div>
            
            <input
              ref={inputRef}
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => {
                onFocus?.()
                setShowPasteButton(true)
              }}
              onBlur={() => {
                onBlur?.()
                setTimeout(() => setShowPasteButton(false), 200)
              }}
              disabled={disabled}
              placeholder="https://example.com"
              className="w-full pl-12 pr-24 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-200 font-body disabled:opacity-50 disabled:cursor-not-allowed"
            />
            
            <div className="absolute right-2 flex items-center space-x-1">
              {value && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              )}
              
              {showPasteButton && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handlePaste}
                    className="p-2 text-gray-400 hover:text-primary"
                  >
                    <ApperIcon name="Clipboard" size={16} />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {focused && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'linear-gradient(90deg, #5B4EE5, #FF6B6B, #5B4EE5)',
              backgroundSize: '200% 100%',
              animation: 'gradient-border 3s ease infinite',
              padding: '1px',
              borderRadius: '12px'
            }}
          >
            <div className="w-full h-full bg-gray-800/50 rounded-xl" />
          </motion.div>
        )}
      </div>
      
      <p className="text-xs text-gray-500 mt-2 font-body">
        Enter the complete URL including https:// or http://
      </p>
    </div>
  )
}

export default UrlInput