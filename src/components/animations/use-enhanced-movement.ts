import { useEffect, useRef, useState } from 'react';
import { useSpring, useMotionValue, useTransform } from 'framer-motion';
import { motionPresets } from './motion-config';

interface Position {
  x: number;
  y: number;
}

interface MovementConfig {
  mass?: number;
  stiffness?: number;
  damping?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  avoidanceRadius?: number;
}

export function useEnhancedMovement(config: MovementConfig = {}) {
  const {
    mass = motionPresets.spaceObject.spring.mass,
    stiffness = motionPresets.spaceObject.spring.stiffness,
    damping = motionPresets.spaceObject.spring.damping,
    orbitRadius = 100,
    orbitSpeed = 0.001,
    avoidanceRadius = 150,
  } = config;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const time = useRef(0);
  const frame = useRef<number>();

  // Spring animations for smooth movement
  const springX = useSpring(x, { mass, stiffness, damping });
  const springY = useSpring(y, { mass, stiffness, damping });

  // Particle trail effect values
  const trail = useRef<Position[]>([]);
  const [particles, setParticles] = useState<Position[]>([]);

  // Calculate orbital movement
  const updateOrbit = () => {
    time.current += orbitSpeed;
    targetX.set(Math.cos(time.current) * orbitRadius);
    targetY.set(Math.sin(time.current) * orbitRadius);
  };

  // Update particle trail
  const updateTrail = () => {
    const newPosition = { x: springX.get(), y: springY.get() };
    trail.current = [newPosition, ...trail.current.slice(0, 5)];
    setParticles([...trail.current]);
  };

  // Animation loop
  useEffect(() => {
    const animate = () => {
      updateOrbit();
      updateTrail();
      frame.current = requestAnimationFrame(animate);
    };

    frame.current = requestAnimationFrame(animate);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Screen edge detection and avoidance
  const checkBounds = (value: number, min: number, max: number) => {
    if (value < min + avoidanceRadius) {
      return min + avoidanceRadius;
    }
    if (value > max - avoidanceRadius) {
      return max - avoidanceRadius;
    }
    return value;
  };

  // Transform spring values for visual effects
  const scale = useTransform(
    springX,
    [-orbitRadius, 0, orbitRadius],
    [0.8, 1, 0.8]
  );

  const rotation = useTransform(
    springY,
    [-orbitRadius, 0, orbitRadius],
    [-15, 0, 15]
  );

  const blur = useTransform(
    springX,
    [-orbitRadius, 0, orbitRadius],
    [2, 0, 2]
  );

  return {
    x: springX,
    y: springY,
    scale,
    rotation,
    blur,
    particles,
    setTarget: (x: number, y: number) => {
      targetX.set(x);
      targetY.set(y);
    },
  };
}