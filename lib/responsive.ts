import { theme } from './theme-config';

// Media query helpers
export const media = {
  up: (breakpoint: keyof typeof theme.breakpoints) =>
    `@media (min-width: ${theme.breakpoints[breakpoint]})`,
  down: (breakpoint: keyof typeof theme.breakpoints) =>
    `@media (max-width: ${theme.breakpoints[breakpoint]})`,
  between: (min: keyof typeof theme.breakpoints, max: keyof typeof theme.breakpoints) =>
    `@media (min-width: ${theme.breakpoints[min]}) and (max-width: ${theme.breakpoints[max]})`,
};

// Responsive layout utilities
export const layout = {
  // Container widths with responsive padding
  container: {
    width: '100%',
    marginX: 'auto',
    paddingX: {
      base: theme.spacing[4],
      sm: theme.spacing[6],
      lg: theme.spacing[8],
    },
    maxWidth: {
      sm: theme.containers.sm,
      md: theme.containers.md,
      lg: theme.containers.lg,
      xl: theme.containers.xl,
      '2xl': theme.containers['2xl'],
    },
  },

  // Grid system
  grid: {
    columns: {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    },
    gap: {
      sm: theme.spacing[4],
      md: theme.spacing[6],
      lg: theme.spacing[8],
    },
  },

  // Spacing system
  spacing: {
    section: {
      sm: theme.spacing[8],
      md: theme.spacing[12],
      lg: theme.spacing[16],
    },
    stack: {
      sm: theme.spacing[4],
      md: theme.spacing[6],
      lg: theme.spacing[8],
    },
  },
};