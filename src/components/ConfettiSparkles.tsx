import React, { useEffect, useState } from 'react';

interface ConfettiSparklesProps {
  theme: 'blue' | 'pink' | 'green' | 'peach';
  active: boolean;
}

interface Particle {
  id: number;
  x: number; // percentage left
  y: number; // percentage top
  size: number;
  speed: number;
  delay: number;
  color: string;
  type: 'balloon' | 'star' | 'circle';
  rotation: number;
}

export default function ConfettiSparkles({ theme, active }: ConfettiSparklesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const themeColors = {
    blue: ['#bae6fd', '#7dd3fc', '#cbd5e1', '#fef08a', '#fdf2e9'],
    pink: ['#fbcfe8', '#f9a8d4', '#cbd5e1', '#fef08a', '#fae8ff'],
    green: ['#bbf7d0', '#86efac', '#cbd5e1', '#fef08a', '#ecfccb'],
    peach: ['#fed7aa', '#fdba74', '#cbd5e1', '#fef08a', '#fef3c7'],
  };

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const colors = themeColors[theme];
    const generated: Particle[] = [];

    // Generate balloons and circles
    for (let i = 0; i < 40; i++) {
      const type = i % 4 === 0 ? 'balloon' : (i % 3 === 0 ? 'star' : 'circle');
      generated.push({
        id: i,
        x: Math.random() * 95, // avoid outer margins
        y: -10 - Math.random() * 40, // start above view
        size: type === 'balloon' ? Math.random() * 16 + 18 : Math.random() * 8 + 6,
        speed: type === 'balloon' ? Math.random() * 1.5 + 1.2 : Math.random() * 2 + 1.5, // float speeds
        delay: Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        rotation: Math.random() * 360,
      });
    }

    setParticles(generated);
  }, [theme, active]);

  if (!active) return null;

  return (
    <div id="particle-container" className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-10">
      {particles.map((p) => {
        const itemStyle = {
          left: `${p.x}%`,
          animationName: p.type === 'balloon' ? 'floatUp' : 'fallDown',
          animationDuration: `${12 / p.speed}s`,
          animationDelay: `${p.delay}s`,
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
          transform: `rotate(${p.rotation}deg)`,
          color: p.color,
          fontSize: `${p.size}px`,
        } as React.CSSProperties;

        return (
          <div
            key={p.id}
            className="absolute select-none opacity-80"
            style={itemStyle}
          >
            {p.type === 'balloon' ? (
              <div id={`balloon-${p.id}`} className="relative flex flex-col items-center">
                {/* SVG Balloon */}
                <svg
                  width={p.size}
                  height={p.size * 1.2}
                  viewBox="0 0 20 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 0C4.477 0 0 4.253 0 9.5C0 14.28 3.5 17.5 10 21C16.5 17.5 20 14.28 20 9.5C20 4.253 15.523 0 10 0ZM10 22C10.552 22 11 21.552 11 21C11 20.448 10.552 20 10 20C9.448 20 9 20.448 9 21C9 21.552 9.448 22 10 22Z" />
                </svg>
                {/* Balloon string */}
                <div id={`string-${p.id}`} className="w-[1px] h-6 bg-stone-300 opacity-60"></div>
              </div>
            ) : p.type === 'star' ? (
              <svg
                width={p.size}
                height={p.size}
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0l3.09 9.5h9.91l-8 5.8 3.09 9.5-3.09-2.25-3.09 2.25 3.09-9.5-8-5.8h9.91z" />
              </svg>
            ) : (
              <div
                id={`circle-${p.id}`}
                className="rounded-full bg-current"
                style={{ width: p.size, height: p.size }}
              ></div>
            )}
          </div>
        );
      })}

      {/* Embedded CSS for animations */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(110vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes fallDown {
          0% {
            transform: translateY(-20vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
