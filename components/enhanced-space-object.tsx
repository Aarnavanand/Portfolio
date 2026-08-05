'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, forwardRef, memo, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedSpaceObjectProps {
  type: 'astronaut' | 'moon';
  className?: string;
}

const EnhancedSpaceObject = memo(forwardRef<HTMLDivElement, EnhancedSpaceObjectProps>(({ type, className }, ref) => {
  
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

  // Actual object dimensions for proper boundary detection - Reduced sizes
  const getObjectSize = () => {
    const { isLargeScreen } = viewportRef.current;
    if (type === 'astronaut') {
      return isLargeScreen 
        ? { width: 250, height: 225 } // Reduced from 350x315
        : { width: 120, height: 110 }; // Reduced from 200x180
    } else { // moon
      return isLargeScreen 
        ? { width: 200, height: 180 } // Reduced from 300x270
        : { width: 100, height: 90 };  // Reduced from 150x135
    }
  };

  // Enhanced initial position calculation
  const calculateInitialPosition = () => {
    const { width, height, isLargeScreen } = viewportRef.current;
    const objectSize = getObjectSize();
    const padding = isLargeScreen ? 50 : 30;
    
    return {
      x: Math.random() * (width - objectSize.width - padding * 2) + padding,
      y: Math.random() * (height - objectSize.height - padding * 2) + padding
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

      // Ensure objects stay within new bounds with proper dimensions
      const currentX = x.get();
      const currentY = y.get();
      const objectSize = getObjectSize();
      const padding = isLargeScreen ? 50 : 30;
      
      if (currentX > width - objectSize.width - padding) {
        x.set(width - objectSize.width - padding);
      }
      if (currentY > height - objectSize.height - padding) {
        y.set(height - objectSize.height - padding);
      }
      if (currentX < padding) {
        x.set(padding);
      }
      if (currentY < padding) {
        y.set(padding);
      }
    };

    const handleScroll = () => {
      // Explicitly do nothing - prevents any scroll interference
      // Objects should maintain their position and size regardless of scroll
      return;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [x, y]);

  // Enhanced movement logic
  const updatePosition = useCallback(() => {
    if (!isMoving.current) return;

    const { width, height, isLargeScreen } = viewportRef.current;
    const objectSize = getObjectSize();
    const padding = isLargeScreen ? 50 : 30; // Reduced padding since we have proper size calculation
    
    let newX = x.get() + velocity.current.x;
    let newY = y.get() + velocity.current.y;

    // Proper boundary detection with actual object dimensions
    if (newX < padding || newX > width - objectSize.width - padding) {
      velocity.current.x *= -0.95; // Add slight dampening on bounce
      newX = Math.max(padding, Math.min(newX, width - objectSize.width - padding));
      
      // Add slight random variation on bounce
      if (isLargeScreen) {
        velocity.current.y += (Math.random() - 0.5) * 0.1;
      }
    }

    if (newY < padding || newY > height - objectSize.height - padding) {
      velocity.current.y *= -0.95;
      newY = Math.max(padding, Math.min(newY, height - objectSize.height - padding));
      
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

  return (
    <motion.div
        ref={ref}
        className={cn(
          'fixed select-none flex items-center justify-center',
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
          transform: 'translateZ(0)',
          // Ensure complete independence from scroll
          top: 0,
          left: 0,
          // Fixed dimensions to prevent shrinking - Reduced sizes
          width: type === 'astronaut' 
            ? 'clamp(120px, 12vw, 250px)'  // Reduced from clamp(200px, 20vw, 350px)
            : 'clamp(100px, 10vw, 200px)', // Reduced from clamp(150px, 15vw, 300px)
          height: type === 'astronaut' 
            ? 'clamp(110px, 11vw, 225px)'  // Reduced from clamp(180px, 18vw, 315px)
            : 'clamp(90px, 9vw, 180px)',   // Reduced from clamp(135px, 13.5vw, 270px)
          // Prevent any layout shifts or repaints
          contain: 'layout style paint',
        }}
      >
        {/* Remove the visible blur boundary effect */}
        {/* <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" /> */}
        <div className="relative w-full h-full">
          <img
            src={`/${type === 'astronaut' ? 'Asset1.svg' : 'Moon.svg'}`}
            alt={type}
            className="w-full h-full object-contain drop-shadow-lg"
            draggable={false}
            style={{
              // Prevent any scaling during scroll
              minWidth: '100%',
              minHeight: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
        />
      </div>
    </motion.div>
  );
}));

EnhancedSpaceObject.displayName = 'EnhancedSpaceObject';
export default EnhancedSpaceObject;
