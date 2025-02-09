import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import EnhancedSpaceObject from './enhanced-space-object';
import { BlackHole } from './BlackHole';

export function SpaceObjects({ setIsBlackHoleActive }: { setIsBlackHoleActive: (active: boolean) => void }) {
  const astronautRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const [isColliding, setIsColliding] = useState<boolean>(false);
  const [blackHolePosition, setBlackHolePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [lastCollisionTime, setLastCollisionTime] = useState<number | null>(null);

  // Collision Detection
  const checkCollision = useCallback(() => {
    if (!astronautRef.current || !moonRef.current) return;

    const astronautRect = astronautRef.current.getBoundingClientRect();
    const moonRect = moonRef.current.getBoundingClientRect();

    const hasCollided = !(
      astronautRect.right < moonRect.left ||
      astronautRect.left > moonRect.right ||
      astronautRect.bottom < moonRect.top ||
      astronautRect.top > moonRect.bottom
    );

    const currentTime = Date.now();

    if (hasCollided && !isColliding) {
      if (lastCollisionTime === null || currentTime - lastCollisionTime >= 60000) {
        setIsColliding(true);
        setBlackHolePosition({
          x: (astronautRect.left + moonRect.left) / 2,
          y: (astronautRect.top + moonRect.top) / 2,
        });

        // Activate black hole effect
        setIsBlackHoleActive(true);
        setLastCollisionTime(currentTime);

        setTimeout(() => {
          setIsBlackHoleActive(false);
          setIsColliding(false);
        }, 10000); // Reset after 10 seconds
      }
    } else if (!hasCollided && isColliding) {
      setIsColliding(false);
    }
  }, [isColliding, lastCollisionTime, setIsBlackHoleActive]);

  // Run collision detection at intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkCollision();
    }, 100); // Check for collisions every 100 milliseconds

    return () => clearInterval(intervalId);
  }, [checkCollision]);

  return (
    <motion.div className="fixed inset-0 overflow-hidden">
      <EnhancedSpaceObject ref={astronautRef} type="astronaut" className="z-0" />
      <EnhancedSpaceObject ref={moonRef} type="moon" className="z-0" />
      <BlackHole active={isColliding} position={blackHolePosition} onReset={() => setIsColliding(false)} />
    </motion.div>
  );
}
