import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import EnhancedSpaceObject from './enhanced-space-object';
import { BlackHole } from './BlackHole';
import { cn } from '@/lib/utils';

interface SpaceObjectsProps {
  setIsBlackHoleActive: (active: boolean) => void;
  className?: string;
}

export function SpaceObjects({ setIsBlackHoleActive, className }: SpaceObjectsProps) {
  const astronautRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const [isColliding, setIsColliding] = useState(false);
  const [blackHolePosition, setBlackHolePosition] = useState({ x: 0, y: 0 });
  const [lastCollisionTime, setLastCollisionTime] = useState<number | null>(null);
  const collisionTimeoutRef = useRef<NodeJS.Timeout>();

  const checkCollision = useCallback(() => {
    if (!astronautRef.current || !moonRef.current) return;

    const astronautRect = astronautRef.current.getBoundingClientRect();
    const moonRect = moonRef.current.getBoundingClientRect();

    // Improved collision detection with circular hitboxes
    const astronautCenter = {
      x: astronautRect.left + astronautRect.width / 2,
      y: astronautRect.top + astronautRect.height / 2
    };
    const moonCenter = {
      x: moonRect.left + moonRect.width / 2,
      y: moonRect.top + moonRect.height / 2
    };

    const distance = Math.sqrt(
      Math.pow(astronautCenter.x - moonCenter.x, 2) +
      Math.pow(astronautCenter.y - moonCenter.y, 2)
    );

    const collisionRadius = (astronautRect.width + moonRect.width) / 4;
    const hasCollided = distance < collisionRadius;

    const currentTime = Date.now();
    const cooldownPeriod = 60000;

    if (hasCollided && !isColliding && 
        (!lastCollisionTime || currentTime - lastCollisionTime >= cooldownPeriod)) {
      setIsColliding(true);
      setBlackHolePosition({
        x: (astronautCenter.x + moonCenter.x) / 2,
        y: (astronautCenter.y + moonCenter.y) / 2
      });

      setIsBlackHoleActive(true);
      setLastCollisionTime(currentTime);

      if (collisionTimeoutRef.current) {
        clearTimeout(collisionTimeoutRef.current);
      }

      collisionTimeoutRef.current = setTimeout(() => {
        setIsBlackHoleActive(false);
        setIsColliding(false);
      }, 10000);
    }
  }, [isColliding, lastCollisionTime, setIsBlackHoleActive]);

  useEffect(() => {
    const intervalId = setInterval(checkCollision, 100);
    
    return () => {
      clearInterval(intervalId);
      if (collisionTimeoutRef.current) {
        clearTimeout(collisionTimeoutRef.current);
      }
    };
  }, [checkCollision]);

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
      <EnhancedSpaceObject ref={astronautRef} type="astronaut" className="z-0" />
      <EnhancedSpaceObject ref={moonRef} type="moon" className="z-0" />
      <BlackHole 
        active={isColliding} 
        position={blackHolePosition} 
        onReset={() => setIsColliding(false)} 
      />
    </motion.div>
  );
}
