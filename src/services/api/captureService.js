import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import Error from "@/components/ui/Error";
import mockHistory from "@/services/mockData/captureHistory.json";

// Simulate API delays
// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility functions for webpage capture

function isSameOrigin(url) {
  try {
    const urlObj = new URL(url);
    const currentOrigin = window.location.origin;
    return urlObj.origin === currentOrigin;
  } catch (error) {
    return false;
  }
}

function createCaptureFrame(url) {
  return new Promise((resolve, reject) => {
    // Check if this is a cross-origin request
    if (!isSameOrigin(url)) {
      reject(new Error('Cross-origin capture not supported in browser environment. Please use a server-side solution or screenshot API service.'));
      return;
    }

const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.style.width = '1440px';  // Increased for better layout capture
    iframe.style.height = '900px';  // Increased for better content visibility
    iframe.style.border = 'none';
    iframe.style.visibility = 'hidden';
    iframe.style.overflow = 'hidden';  // Prevent scrollbars during capture
    iframe.style.transform = 'scale(1)';  // Ensure proper scaling
    iframe.onload = () => {
      try {
        // For same-origin, we can access the iframe content
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (!doc) {
          reject(new Error('Unable to access iframe content'));
          return;
        }
        resolve(iframe);
      } catch (error) {
        reject(new Error('Cross-origin access blocked: ' + error.message));
      }
    };
    
    iframe.onerror = () => {
      reject(new Error('Failed to load webpage'));
    };
    
    // Add to DOM and set source
    document.body.appendChild(iframe);
    iframe.src = url;
    
    // Timeout after 30 seconds
    setTimeout(() => {
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
      reject(new Error('Timeout loading webpage'));
    }, 30000);
  });
}

async function captureFullPage(iframe) {
  try {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    
    if (!doc || !doc.body) {
      throw new Error('Unable to access page content');
    }
    
    // Get full page dimensions
    const body = doc.body;
    const html = doc.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    
    // Create canvas and capture
    const canvas = await html2canvas(body, {
      height: height,
      width: 1200,
      useCORS: true,
      scale: 1,
      logging: false,
      allowTaint: false,
      foreignObjectRendering: false
    });
    
    return canvas;
  } catch (error) {
    throw new Error('Failed to capture page content: ' + error.message);
  }
}

// Fallback function for cross-origin URLs - generates a mock PDF
async function generateMockPDF(url) {
  try {
    const domain = new URL(url).hostname;
    
    // Create a simple canvas with website info
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    
    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add border
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    // Add title
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Website Capture', canvas.width / 2, 200);
    
    // Add URL
    ctx.font = '32px Inter, sans-serif';
    ctx.fillText(url, canvas.width / 2, 280);
    
    // Add domain
    ctx.font = '24px Inter, sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText(`Domain: ${domain}`, canvas.width / 2, 340);
    
    // Add note
    ctx.font = '20px Inter, sans-serif';
    ctx.fillStyle = '#999999';
    ctx.fillText('Cross-origin capture requires server-side processing', canvas.width / 2, 420);
    ctx.fillText('This is a demo placeholder for the actual content', canvas.width / 2, 450);
    
    // Add timestamp
    ctx.fillText(`Generated: ${new Date().toLocaleString()}`, canvas.width / 2, 520);
    
    return canvas;
  } catch (error) {
    throw new Error('Failed to generate mock PDF: ' + error.message);
  }
}

// Helper function to convert canvas to PDF
function canvasToPDF(canvas) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });
  
  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  
  return pdf;
}
export const captureService = {
  async captureWebpage(url) {
    let iframe = null;
    
    try {
      let canvas;
      
      // Check if this is a cross-origin request
      if (!isSameOrigin(url)) {
        // For cross-origin URLs, use mock PDF generation
        // In a real application, this would call a server-side service
        console.warn('Cross-origin capture detected. Using mock PDF generation.');
        canvas = await generateMockPDF(url);
      } else {
        // For same-origin URLs, use iframe capture
        iframe = await createCaptureFrame(url);
        
        // Wait for dynamic content to load
        await delay(1000);
        
        // Capture full page
        canvas = await captureFullPage(iframe);
      }
      
      // Convert to PDF
      const pdf = canvasToPDF(canvas);
      const pdfBlob = pdf.output('blob');
      const pdfData = await pdfBlob.arrayBuffer();
      
      // Clean up iframe if it was created
      if (iframe && iframe.parentNode) {
        try {
          document.body.removeChild(iframe);
        } catch (cleanupError) {
          console.warn('Error cleaning up iframe:', cleanupError);
        }
      }
      
      return {
        pdfData: new Uint8Array(pdfData),
        pdfBlob,
        fileSize: pdfData.byteLength,
        filename: `${new URL(url).hostname}.pdf`,
        captureDate: new Date().toISOString()
      };
    } catch (error) {
      // Clean up iframe on error
      if (iframe && iframe.parentNode) {
        try {
          document.body.removeChild(iframe);
        } catch (cleanupError) {
          console.warn('Error cleaning up iframe during error handling:', cleanupError);
        }
      }
      
      // Provide more specific error messages
      if (error.message.includes('Cross-origin')) {
        throw new Error('PDF generation failed: Cross-origin websites require server-side processing. Please contact support for enterprise capture solutions.');
      } else if (error.message.includes('Timeout')) {
        throw new Error('PDF generation failed: Website took too long to load. Please try again or check the URL.');
      } else {
        throw new Error('PDF generation failed: ' + error.message);
      }
    }
  },

  async getHistory() {
    await delay(300);
    return [...mockHistory];
  },

  async clearHistory() {
    await delay(200);
    return { success: true };
  }
};