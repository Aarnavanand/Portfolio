'use client';

import { motion } from 'framer-motion';
import EnhancedSpaceObject from './enhanced-space-object';
import { cn } from '@/lib/utils';

interface SpaceObjectsProps {
  className?: string;
}

export function SpaceObjects({ className }: SpaceObjectsProps) {
  return (
    <motion.div 
      className={cn(
        'fixed inset-0 overflow-hidden pointer-events-none',
        className
      )}
      style={{
        position: 'fixed',
        zIndex: 0
      }}
    >
      <EnhancedSpaceObject type="astronaut" className="z-0" />
      <EnhancedSpaceObject type="moon" className="z-0" />
    </motion.div>
  );
}
