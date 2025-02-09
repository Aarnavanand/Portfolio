import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Removed entire handleMouseMove code and window.addEventListener
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B1E] via-[#1B1B3A] to-[#0B0B1E]">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'star absolute rounded-full bg-white shadow-glow',
              'animate-twinkle transition-transform duration-[0.5s] ease-out',
              i % 3 === 0 && 'w-0.5 h-0.5 opacity-70',
              i % 3 === 1 && 'w-1 h-1 opacity-85',
              i % 3 === 2 && 'w-1.5 h-1.5 opacity-95'
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black" />
    </div>
  );
}
