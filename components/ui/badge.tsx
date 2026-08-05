import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'border-primary/30 bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-glow hover:shadow-glow-lg hover:border-primary/50 hover:from-primary/30',
        secondary:
          'border-secondary/30 bg-secondary/20 text-secondary-light hover:bg-secondary/30 hover:border-secondary/50 shadow-premium',
        destructive:
          'border-destructive/30 bg-destructive/10 text-destructive shadow-premium hover:shadow-premium-lg hover:bg-destructive/20',
        outline: 'border-border/50 bg-background/50 text-foreground hover:bg-background/80 hover:border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
