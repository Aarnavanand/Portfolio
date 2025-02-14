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
  
  // Viewport state with breakpoint awareness
  const viewportRef = useRef({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isLargeScreen: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  });

  // Adjust movement based on screen size
  const getVelocityScale = () => {
    const { width } = viewportRef.current;
    if (width >= 1536) return 0.15; // 2xl
    if (width >= 1280) return 0.2;  // xl
    if (width >= 1024) return 0.25; // lg
    if (width >= 768) return 0.3;   // md
    return 0.35;                    // sm and below
  };

  // Enhanced initial position calculation
  const calculateInitialPosition = () => {
    const { width, height, isLargeScreen } = viewportRef.current;
    const padding = isLargeScreen ? 100 : 50;
    
    return {
      x: Math.random() * (width - padding * 2) + padding,
      y: Math.random() * (height - padding * 2) + padding
    };
  };

  const initialPosition = useRef(calculateInitialPosition());
  const x = useMotionValue(initialPosition.current.x);
  const y = useMotionValue(initialPosition.current.y);

  // Optimized spring configuration based on screen size
  const getSpringConfig = () => {
    const { isLargeScreen } = viewportRef.current;
    return {
      stiffness: isLargeScreen ? 40 : 50,
      damping: isLargeScreen ? 15 : 20,
      mass: isLargeScreen ? 1.2 : 1,
      restSpeed: 0.001
    };
  };

  const springX = useSpring(x, getSpringConfig());
  const springY = useSpring(y, getSpringConfig());

  // Enhanced velocity with screen-size awareness
  const velocity = useRef({
    x: (Math.random() * 2 - 1) * getVelocityScale(),
    y: (Math.random() * 2 - 1) * getVelocityScale()
  });

  const size = useRef(150);
  const animationFrameRef = useRef<number>();
  const isMoving = useRef(true);

  // Enhanced resize handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLargeScreen = width >= 1024;

      viewportRef.current = { width, height, isLargeScreen };

      // Adjust velocity for new screen size
      const velocityScale = getVelocityScale();
      velocity.current = {
        x: (velocity.current.x / Math.abs(velocity.current.x)) * velocityScale,
        y: (velocity.current.y / Math.abs(velocity.current.y)) * velocityScale
      };

      // Create new springs with updated config instead of updating existing ones
      x.set(x.get());
      y.set(y.get());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [x, y]);

  // Enhanced movement logic
  const updatePosition = useCallback(() => {
    if (!isMoving.current) return;

    const { width, height, isLargeScreen } = viewportRef.current;
    const padding = isLargeScreen ? 100 : 50;
    
    let newX = x.get() + velocity.current.x;
    let newY = y.get() + velocity.current.y;

    // Enhanced boundary detection with padding
    if (newX < padding || newX > width - size.current - padding) {
      velocity.current.x *= -0.95; // Add slight dampening on bounce
      newX = Math.max(padding, Math.min(newX, width - size.current - padding));
      
      // Add slight random variation on bounce
      if (isLargeScreen) {
        velocity.current.y += (Math.random() - 0.5) * 0.1;
      }
    }

    if (newY < padding || newY > height - size.current - padding) {
      velocity.current.y *= -0.95;
      newY = Math.max(padding, Math.min(newY, height - size.current - padding));
      
      if (isLargeScreen) {
        velocity.current.x += (Math.random() - 0.5) * 0.1;
      }
    }

    // Add subtle random movement variations based on screen size
    if (!isLargeScreen) {
      velocity.current.x += (Math.random() - 0.5) * 0.03;
      velocity.current.y += (Math.random() - 0.5) * 0.03;
    }

    // Normalize velocity to maintain consistent speed
    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    const maxSpeed = getVelocityScale() * 1.5;
    if (speed > maxSpeed) {
      velocity.current.x *= maxSpeed / speed;
      velocity.current.y *= maxSpeed / speed;
    }

    x.set(newX);
    y.set(newY);

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
