import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  ...props 
}, ref) => {
  const baseClasses = 'btn-hover inline-flex items-center justify-center font-display font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/25 focus:ring-primary/50',
    secondary: 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-500',
    accent: 'bg-gradient-to-r from-accent to-accent/80 text-white hover:shadow-lg hover:shadow-accent/25 focus:ring-accent/50',
    success: 'bg-gradient-to-r from-success to-success/80 text-white hover:shadow-lg hover:shadow-success/25 focus:ring-success/50',
    error: 'bg-gradient-to-r from-error to-error/80 text-white hover:shadow-lg hover:shadow-error/25 focus:ring-error/50',
    ghost: 'text-gray-300 hover:text-white hover:bg-gray-800/50 focus:ring-gray-500',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
    xl: 'px-8 py-5 text-xl'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <motion.button
      ref={ref}
      className={classes}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button