import { MotionValue, useSpring, useTransform } from 'framer-motion';

// Animation presets for consistent motion across components
export const motionPresets = {
  // Smooth transitions for sections
  section: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Card hover effects
  card: {
    rest: { scale: 1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    hover: { 
      scale: 1.02,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  },

  // Parallax effect configuration
  parallax: {
    translateY: (scrollYProgress: MotionValue<number>) => 
      useTransform(scrollYProgress, [0, 1], ['0%', '-20%']),
    opacity: (scrollYProgress: MotionValue<number>) =>
      useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
  },

  // Loading animations
  loading: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  },

  // Space object movement
  spaceObject: {
    // Spring configuration for smooth movement
    spring: {
      stiffness: 100,
      damping: 30,
      mass: 1,
    },
    // Hover effect
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  },
};