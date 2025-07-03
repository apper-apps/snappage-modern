export const formatDomain = (url) => {
  try {
    if (!url) return ''
    
    // Add protocol if missing
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`
    const urlObj = new URL(urlWithProtocol)
    
    // Remove www. prefix if present
    return urlObj.hostname.replace(/^www\./, '')
  } catch (error) {
    // If URL parsing fails, try to extract domain manually
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+)/)
    return match ? match[1] : url
  }
}

export const validateUrl = (url) => {
  if (!url) return false
  
  try {
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`
    new URL(urlWithProtocol)
    return true
  } catch (error) {
    return false
  }
}

export const normalizeUrl = (url) => {
  if (!url) return ''
  
  // Add https:// if no protocol specified
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  
  return url
}