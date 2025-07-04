import mockHistory from '@/services/mockData/captureHistory.json'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Create hidden iframe for capturing
const createCaptureFrame = (url) => {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.left = '-9999px'
    iframe.style.top = '0'
    iframe.style.width = '1200px'
    iframe.style.height = '800px'
    iframe.style.border = 'none'
    iframe.style.zIndex = '-1'
    
    iframe.onload = () => {
      setTimeout(() => resolve(iframe), 1000) // Wait for content to load
    }
    
    iframe.onerror = () => {
      document.body.removeChild(iframe)
      reject(new Error('Failed to load webpage'))
    }
    
    iframe.src = url
    document.body.appendChild(iframe)
  })
}

// Capture full page with scroll
const captureFullPage = async (iframe) => {
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
    const body = iframeDoc.body
    const html = iframeDoc.documentElement
    
    // Get full page dimensions
    const fullHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    
    // Set iframe to full height for complete capture
    iframe.style.height = `${fullHeight}px`
    
    // Wait for layout to settle
    await delay(500)
    
    // Capture the iframe content
    const canvas = await html2canvas(iframe.contentDocument.body, {
      useCORS: true,
      allowTaint: true,
      scale: 0.8, // Reduce scale for better performance
      height: fullHeight,
      width: 1200,
      scrollX: 0,
      scrollY: 0
    })
    
    return canvas
  } catch (error) {
    throw new Error('Failed to capture page content: ' + error.message)
  }
}

// Convert canvas to PDF
const canvasToPDF = (canvas) => {
  const imgWidth = 210 // A4 width in mm
  const pageHeight = 295 // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  let heightLeft = imgHeight
  
  const pdf = new jsPDF('p', 'mm', 'a4')
  let position = 0
  
  // Add first page
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight
  
  // Add additional pages if content is longer
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }
  
  return pdf
}

export const captureService = {
  async captureWebpage(url) {
    let iframe = null
    
    try {
      // Create and load iframe
      iframe = await createCaptureFrame(url)
      
      // Wait for dynamic content to load
      await delay(1000)
      
      // Capture full page
      const canvas = await captureFullPage(iframe)
      
      // Convert to PDF
      const pdf = canvasToPDF(canvas)
      const pdfBlob = pdf.output('blob')
      const pdfData = await pdfBlob.arrayBuffer()
      
      // Clean up iframe
      if (iframe && iframe.parentNode) {
        document.body.removeChild(iframe)
      }
      
      return {
        pdfData: new Uint8Array(pdfData),
        pdfBlob,
        fileSize: pdfData.byteLength,
        filename: `${new URL(url).hostname}.pdf`,
        captureDate: new Date().toISOString()
      }
    } catch (error) {
      // Clean up iframe on error
      if (iframe && iframe.parentNode) {
        document.body.removeChild(iframe)
      }
      throw new Error('PDF generation failed: ' + error.message)
    }
  },

  async getHistory() {
    await delay(300)
    return [...mockHistory]
  },

  async clearHistory() {
    await delay(200)
    return { success: true }
  }
}