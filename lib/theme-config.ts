// Theme Configuration System
export const theme = {
  colors: {
    // Dark mode
    dark: {
      background: '#030711',
      foreground: '#F8FAFC',
      primary: '#8B5CF6',
      secondary: '#1E293B',
      muted: '#334155',
      accent: '#6366F1',
      border: '#1E293B',
      card: '#0F172A',
      destructive: '#EF4444',
      success: '#10B981',
    },
    // Light mode
    light: {
      background: '#FFFFFF',
      foreground: '#0F172A',
      primary: '#6D28D9',
      secondary: '#F1F5F9',
      muted: '#64748B',
      accent: '#4F46E5',
      border: '#E2E8F0',
      card: '#F8FAFC',
      destructive: '#DC2626',
      success: '#059669',
    },
  },

  typography: {
    fonts: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  spacing: {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem',      // 128px
  },

  breakpoints: {
    sm: '640px',     // Small devices
    md: '768px',     // Medium devices
    lg: '1024px',    // Large devices
    xl: '1280px',    // Extra large devices
    '2xl': '1536px', // 2X Extra large devices
  },

  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    0: '0',
    10: '10',      // Low priority elements
    20: '20',      // Basic elements
    30: '30',      // Overlays
    40: '40',      // Dropdowns
    50: '50',      // Sticky elements
    100: '100',    // Modals/Dialogs
    tooltip: '1000',// Tooltips
    max: '9999',   // Maximum z-index
  },

  animation: {
    durations: {
      fastest: '100ms',
      faster: '150ms',
      fast: '200ms',
      normal: '300ms',
      slow: '400ms',
      slower: '500ms',
      slowest: '700ms',
    },
    easings: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
} as const;