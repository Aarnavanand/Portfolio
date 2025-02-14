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
  
  // Use a ref for viewport to avoid unnecessary re-renders
  const viewportRef = useRef({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // Optimize initial position calculation
  const initialX = useRef(Math.random() * (viewportRef.current.width * 0.5) + viewportRef.current.width * 0.25);
  const initialY = useRef(Math.random() * (viewportRef.current.height * 0.5) + viewportRef.current.height * 0.25);

  const x = useMotionValue(initialX.current);
  const y = useMotionValue(initialY.current);

  // Further optimized spring configuration
  const springConfig = { 
    stiffness: 50,
    damping: 20,
    mass: 1,
    restSpeed: 0.001
  };
  
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // More stable velocity
  const velocity = useRef({
    x: (Math.random() * 2 - 1) * 0.2,
    y: (Math.random() * 2 - 1) * 0.2
  });

  const size = useRef(150);
  const animationFrameRef = useRef<number>();
  const isMoving = useRef(true);

  // Optimized resize handler with throttling
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    let lastUpdate = 0;
    const throttleDelay = 100;

    const handleResize = () => {
      const now = Date.now();
      if (now - lastUpdate >= throttleDelay) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          viewportRef.current = {
            width: window.innerWidth,
            height: window.innerHeight
          };
          // Ensure object stays in bounds after resize
          const currentX = x.get();
          const currentY = y.get();
          const padding = size.current / 2;
          
          if (currentX < padding || currentX > viewportRef.current.width - size.current - padding) {
            x.set(Math.max(padding, Math.min(currentX, viewportRef.current.width - size.current - padding)));
          }
          if (currentY < padding || currentY > viewportRef.current.height - size.current - padding) {
            y.set(Math.max(padding, Math.min(currentY, viewportRef.current.height - size.current - padding)));
          }
        }, throttleDelay);
        lastUpdate = now;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(resizeTimeout);
    };
  }, [x, y]);

  // Handle page visibility
  const handleVisibilityChange = useCallback(() => {
    isMoving.current = !document.hidden;
    if (isMoving.current && !animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(updatePosition);
    }
  }, []);

  const updatePosition = useCallback(() => {
    if (!isMoving.current) return;

    let newX = x.get() + velocity.current.x;
    let newY = y.get() + velocity.current.y;

    const padding = size.current / 2;
    const maxX = viewportRef.current.width - size.current - padding;
    const maxY = viewportRef.current.height - size.current - padding;

    // Improved boundary detection with bounce effect
    if (newX < padding || newX > maxX) {
      velocity.current.x *= -0.95; // Add slight dampening on bounce
      newX = Math.max(padding, Math.min(newX, maxX));
    }
    if (newY < padding || newY > maxY) {
      velocity.current.y *= -0.95; // Add slight dampening on bounce
      newY = Math.max(padding, Math.min(newY, maxY));
    }

    x.set(newX);
    y.set(newY);

    // Add slight random variation to movement
    velocity.current.x += (Math.random() - 0.5) * 0.01;
    velocity.current.y += (Math.random() - 0.5) * 0.01;

    // Normalize velocity to maintain consistent speed
    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    if (speed > 0.4) {
      velocity.current.x *= 0.4 / speed;
      velocity.current.y *= 0.4 / speed;
    }

    animationFrameRef.current = requestAnimationFrame(updatePosition);
  }, [x, y]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(updatePosition);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updatePosition]);

  const handleReset = useCallback(() => {
    setShowBlackHole(false);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        {showBlackHole && (
          <BlackHole
            onReset={handleReset}
            active={false}
            position={{ x: 0, y: 0 }}
          />
        )}
      </Suspense>    
      <motion.div
        ref={ref}
        className={cn(
          'fixed select-none w-24 h-24 md:w-36 md:h-36 flex items-center justify-center',
          className
        )}
        style={{
          position: 'fixed',
          x: springX,
          y: springY,
          zIndex: 0,
          touchAction: 'none',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
        <div className="relative w-full h-full">
          <img
            src={`/${type === 'astronaut' ? 'Asset1.svg' : 'Moon.svg'}`}
            alt={type}
            className="w-full h-full object-contain drop-shadow-lg"
            style={{ width: '300px', height: '250px' }}
            draggable={false}
          />
        </div>
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

EnhancedSpaceObject.displayName = 'EnhancedSpaceObject';
export default EnhancedSpaceObject;
