import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { memo, useCallback } from 'react';
import { Suspense } from 'react';

import { BlackHole } from './BlackHole';

interface EnhancedSpaceObjectProps {
  type: 'astronaut' | 'moon';
  className?: string;
}

const EnhancedSpaceObject = memo(forwardRef<HTMLDivElement, EnhancedSpaceObjectProps>(({ type, className }, ref) => {
  const [showBlackHole, setShowBlackHole] = useState(false);
  const handleReset = useCallback(() => {
    setShowBlackHole(false);
  }, []);

  // Motion values for position
  const x = useMotionValue(Math.random() * window.innerWidth * 0.6);
  const y = useMotionValue(Math.random() * window.innerHeight * 0.6);
  const springX = useSpring(x, { stiffness: 30, damping: 12 });
  const springY = useSpring(y, { stiffness: 30, damping: 12 });

  // Velocity for movement
  const velocity = useRef({ x: (Math.random() * 2 - 1) * 0.5, y: (Math.random() * 2 - 1) * 0.5 });

  const size = 150;

  const updatePosition = useCallback(() => {
    let newX = x.get() + velocity.current.x;
    let newY = y.get() + velocity.current.y;

    // Boundary detection (prevent going off-screen)
    if (newX < 0 || newX > window.innerWidth - size) {
      velocity.current.x *= -1; // Reverse direction
      newX = Math.max(0, Math.min(newX, window.innerWidth - size)); // Keep within bounds
    }
    if (newY < 0 || newY > window.innerHeight - size) {
      velocity.current.y *= -1; // Reverse direction
      newY = Math.max(0, Math.min(newY, window.innerHeight - size)); // Keep within bounds
    }

    x.set(newX);
    y.set(newY);

    requestAnimationFrame(updatePosition);
  }, [x, y, size, velocity]);

  useEffect(() => {
    requestAnimationFrame(updatePosition);
  }, [updatePosition]);

  return (
    <>
    <Suspense>
      {showBlackHole && (
        <BlackHole
          onReset={handleReset} active={false} position={{ x: 0, y: 0 }} />
      )}
    </Suspense>    
      <motion.div
        ref={ref}
        className={cn(
          'absolute select-none w-24 h-24 md:w-36 md:h-36 flex items-center justify-center',
          className
        )}
        style={{
          position: 'fixed',
          x: springX,
          y: springY,
          zIndex: 0,
          touchAction: 'none',
          willChange: 'transform',
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />

        {/* Object image */}
        <div className="relative w-full h-full">
          <img
            src={`/${type === 'astronaut' ? 'Asset1.svg' : 'Moon.svg'}`}
            alt={type}
            className="w-full h-full object-contain drop-shadow-lg"
            style={{ width: '300px', height: '250px' }}
          />
        </div>

        {/* Dynamic shadow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.2) 30%, transparent 80%)',
            transform: 'translateY(20%)',
          }}
        />
      </motion.div>
    </>
  );
}));

export default EnhancedSpaceObject;
