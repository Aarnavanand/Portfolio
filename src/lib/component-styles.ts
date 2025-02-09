
// Base component styles
export const componentStyles = {
  // Button variants
  button: {
    base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    },
    sizes: {
      sm: 'h-9 px-3',
      md: 'h-10 px-4',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10',
    },
  },

  // Card layouts
  card: {
    base: 'rounded-lg border bg-card text-card-foreground shadow-sm',
    variants: {
      default: 'p-6',
      compact: 'p-4',
      spacious: 'p-8',
    },
  },

  // Form elements
  form: {
    label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    input: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    textarea: 'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    select: 'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  },

  // Navigation items
  nav: {
    item: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
    active: 'bg-accent text-accent-foreground',
  },

  // Section containers
  section: {
    base: 'w-full mx-auto px-4',
    responsive: {
      sm: 'max-w-[640px]',
      md: 'max-w-[768px]',
      lg: 'max-w-[1024px]',
      xl: 'max-w-[1280px]',
      '2xl': 'max-w-[1536px]',
    },
  },

  // Interactive states
  interactive: {
    base: 'transition-all duration-200',
    hover: 'hover:scale-105',
    active: 'active:scale-95',
    focus: 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  },
} as const;