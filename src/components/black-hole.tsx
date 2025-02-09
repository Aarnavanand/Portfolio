import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface BlackHoleProps {
  active: boolean;
  position: { x: number; y: number };
  onReset: () => void;
}

export function BlackHole({ active, position, onReset }: BlackHoleProps) {
  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => onReset(), 10000); // Reset after 10 seconds
    return () => clearTimeout(timer);
  }, [active, onReset]);

  if (!active) return null;

  return (
    <motion.div
      className="absolute"
      style={{
        left: position.x - 150, // Center the black hole
        top: position.y - 150,
        width: '300px',
        height: '300px',
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Core Black Hole */}
      <div className="relative w-full h-full">
        {/* Event Horizon */}
        <div className="absolute inset-0 rounded-full bg-black shadow-[0_0_50px_rgba(0,0,0,0.9)]" />

        {/* Accretion Disk */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute inset-[15%] rounded-full border-[10px] border-transparent bg-gradient-conic from-purple-500 via-fuchsia-500 to-purple-500 opacity-60 blur-md" />
        </div>

        {/* Light Bending & Gravitational Waves */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-wave"
            style={{
              animationDelay: `${i * 0.6}s`,
            }}
          >
            <div
              className="absolute inset-0 rounded-full border border-white/15 animate-pulse blur-[2px]"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
} 