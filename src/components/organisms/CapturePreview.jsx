import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { toast } from "react-toastify";

const CapturePreview = ({ isOpen, onClose, captureData, onDownload }) => {
  const [zoom, setZoom] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const zoomLevels = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3]

  const handleZoomIn = () => {
    const currentIndex = zoomLevels.indexOf(zoom)
    if (currentIndex < zoomLevels.length - 1) {
      setZoom(zoomLevels[currentIndex + 1])
    }
  }

  const handleZoomOut = () => {
    const currentIndex = zoomLevels.indexOf(zoom)
    if (currentIndex > 0) {
      setZoom(zoomLevels[currentIndex - 1])
    }
  }

  const handleFitToWindow = () => {
    setZoom(0.75)
    setPanPosition({ x: 0, y: 0 })
  }

  const handleActualSize = () => {
    setZoom(1)
    setPanPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - panPosition.x,
        y: e.clientY - panPosition.y
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleDownload = () => {
    if (captureData && onDownload) {
      onDownload(captureData)
      toast.success('PDF downloaded successfully')
    }
  }

  const handleClose = () => {
    setZoom(1)
    setPanPosition({ x: 0, y: 0 })
    onClose()
  }

  if (!captureData) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="glass rounded-2xl p-6 border border-white/10 shadow-2xl max-w-6xl max-h-[90vh] w-full mx-4 flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="Eye" size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-white">
                    Preview Capture
                  </h3>
                  <p className="text-sm text-gray-400 font-body font-mono">
                    {captureData.domain}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="text-white hover:bg-white/10"
                >
                  <ApperIcon name="Download" size={16} />
                  Download PDF
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-white hover:bg-white/10"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= zoomLevels[0]}
                className="text-white"
              >
                <ApperIcon name="ZoomOut" size={16} />
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFitToWindow}
                  className="text-white hover:bg-white/10"
                >
                  Fit
                </Button>
                <span className="text-sm text-gray-300 font-mono min-w-[4rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleActualSize}
                  className="text-white hover:bg-white/10"
                >
                  100%
                </Button>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= zoomLevels[zoomLevels.length - 1]}
                className="text-white"
              >
                <ApperIcon name="ZoomIn" size={16} />
              </Button>
            </div>

            {/* Preview Container */}
            <div 
              ref={containerRef}
              className="flex-1 relative bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
              style={{ minHeight: '500px' }}
            >
              {/* Browser Chrome */}
              <div className="flex items-center space-x-2 bg-gray-900 px-4 py-2 border-b border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-xs text-gray-300 font-mono">
                  {captureData.url}
                </div>
              </div>
{/* PDF Preview Container */}
              <div 
                className="relative bg-white overflow-hidden"
                style={{ height: 'calc(100% - 40px)' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {captureData.pdfBlob ? (
                  <iframe
                    src={URL.createObjectURL(captureData.pdfBlob)}
                    className="border-0"
                    title="PDF Preview"
                    style={{
                      width: `${100 / zoom}%`,
                      height: `${100 / zoom}%`,
                      transform: `scale(${zoom}) translate(${panPosition.x / zoom}px, ${panPosition.y / zoom}px)`,
                      transformOrigin: 'top left',
                      cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500">
                      <ApperIcon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>PDF preview not available</p>
                      <p className="text-sm mt-2">Use download to view the PDF</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Drag hint */}
              {zoom > 1 && (
                <div className="absolute top-16 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-300 flex items-center">
                    <ApperIcon name="Move" size={12} className="mr-1" />
                    Drag to pan
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CapturePreview