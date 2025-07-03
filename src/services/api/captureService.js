import mockHistory from '@/services/mockData/captureHistory.json'

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const captureService = {
  async captureWebpage(url) {
    await delay(2000) // Simulate processing time
    
    try {
      // Simulate PDF generation
      // In a real app, this would call a backend service
      const pdfData = new Uint8Array(1024 * 50) // 50KB mock PDF
      
      // Generate random file size between 100KB and 2MB
      const fileSize = Math.floor(Math.random() * (2000000 - 100000) + 100000)
      
      return {
        pdfData,
        fileSize,
        filename: `${new URL(url).hostname}.pdf`,
        captureDate: new Date().toISOString()
      }
    } catch (error) {
      throw new Error('Failed to capture webpage: ' + error.message)
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