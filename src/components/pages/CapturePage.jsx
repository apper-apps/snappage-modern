import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Header from '@/components/organisms/Header'
import CaptureForm from '@/components/organisms/CaptureForm'
import CapturePreview from '@/components/organisms/CapturePreview'
import StatusDisplay from '@/components/organisms/StatusDisplay'
import CaptureHistory from '@/components/organisms/CaptureHistory'
import { captureService } from '@/services/api/captureService'
import { formatDomain } from '@/utils/urlUtils'

const CapturePage = () => {
  const [captureState, setCaptureState] = useState({
    url: '',
    domain: '',
    status: 'idle', // idle, loading, capturing, processing, success, error
    progress: 0,
    error: null,
    previewUrl: null
  })
  const [history, setHistory] = useState([])
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const historyData = await captureService.getHistory()
      setHistory(historyData)
    } catch (error) {
      console.error('Failed to load history:', error)
    }
  }

  const handleUrlChange = (url) => {
    setCaptureState(prev => ({
      ...prev,
      url,
      domain: formatDomain(url),
      error: null
    }))
  }

  const handleCapture = async () => {
    if (!captureState.url) {
      toast.error('Please enter a URL to capture')
      return
    }

    if (!captureState.url.startsWith('http://') && !captureState.url.startsWith('https://')) {
      setCaptureState(prev => ({
        ...prev,
        url: `https://${prev.url}`,
        domain: formatDomain(`https://${prev.url}`)
      }))
    }

    try {
      setCaptureState(prev => ({ ...prev, status: 'loading', progress: 0, error: null }))
      setShowPreview(true)
      
      // Simulate iframe loading
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCaptureState(prev => ({ 
        ...prev, 
        status: 'capturing', 
        progress: 20,
        previewUrl: prev.url
      }))

      // Simulate scrolling capture
      for (let i = 20; i <= 80; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300))
        setCaptureState(prev => ({ ...prev, progress: i }))
      }

      setCaptureState(prev => ({ ...prev, status: 'processing', progress: 85 }))
      
      // Process PDF generation
      const result = await captureService.captureWebpage(captureState.url)
      
      setCaptureState(prev => ({ ...prev, progress: 100, status: 'success' }))
      
      // Download PDF
      const blob = new Blob([result.pdfData], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${captureState.domain}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success(`Successfully captured ${captureState.domain}`)
      
      // Add to history
      const historyItem = {
        id: Date.now().toString(),
        url: captureState.url,
        domain: captureState.domain,
        filename: `${captureState.domain}.pdf`,
        captureDate: new Date().toISOString(),
        fileSize: result.fileSize || 0
      }
      
      setHistory(prev => [historyItem, ...prev])
      
      // Reset after success
      setTimeout(() => {
        setCaptureState(prev => ({ 
          ...prev, 
          status: 'idle', 
          progress: 0,
          url: '',
          domain: '',
          previewUrl: null
        }))
        setShowPreview(false)
      }, 2000)

    } catch (error) {
      console.error('Capture failed:', error)
      setCaptureState(prev => ({ 
        ...prev, 
        status: 'error', 
        error: error.message || 'Failed to capture webpage'
      }))
      toast.error('Failed to capture webpage')
    }
  }

  const handleRetry = () => {
    setCaptureState(prev => ({ 
      ...prev, 
      status: 'idle', 
      progress: 0, 
      error: null 
    }))
    setShowPreview(false)
  }

  const handleClearHistory = () => {
    setHistory([])
    toast.success('History cleared')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/20 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <CaptureForm
            url={captureState.url}
            domain={captureState.domain}
            status={captureState.status}
            onUrlChange={handleUrlChange}
            onCapture={handleCapture}
          />

          <AnimatePresence>
            {captureState.status !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <StatusDisplay
                  status={captureState.status}
                  progress={captureState.progress}
                  domain={captureState.domain}
                  error={captureState.error}
                  onRetry={handleRetry}
                />

                {showPreview && captureState.previewUrl && (
                  <CapturePreview
                    url={captureState.previewUrl}
                    status={captureState.status}
                    progress={captureState.progress}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CaptureHistory
                history={history}
                onClearHistory={handleClearHistory}
              />
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

export default CapturePage