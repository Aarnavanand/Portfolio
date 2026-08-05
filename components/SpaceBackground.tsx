import { useEffect, useRef } from "react";

export function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const numStars = 200;
    const container = containerRef.current;

    if (!container) return;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className =
        "absolute w-[2px] h-[2px] bg-white rounded-full opacity-80 animate-starTwinkle";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(star);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-gradient-to-b from-[#000011] via-[#000022] to-[#000000]"
    >
      {/* Star layers */}
      <div className="absolute inset-0 pointer-events-none"></div>
    </div>
  );
}
