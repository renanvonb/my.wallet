import React from 'react';

interface LogoProps {
    size?: number;
    className?: string;
}

export const SolariumLogo: React.FC<LogoProps> = ({ size = 32, className = '' }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
            </defs>

            {/* Spiral rays rotating outward */}
            {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 15) - 90;
                const startRadius = 15 + (i * 0.5);
                const endRadius = 48 + (i * 0.3);
                const width = 4;

                const startX = 50 + Math.cos((angle * Math.PI) / 180) * startRadius;
                const startY = 50 + Math.sin((angle * Math.PI) / 180) * startRadius;
                const endX = 50 + Math.cos((angle * Math.PI) / 180) * endRadius;
                const endY = 50 + Math.sin((angle * Math.PI) / 180) * endRadius;

                return (
                    <line
                        key={i}
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="url(#spiralGradient)"
                        strokeWidth={width}
                        strokeLinecap="round"
                        opacity={0.9}
                    />
                );
            })}

            {/* Center dark circle for depth */}
            <circle cx="50" cy="50" r="15" fill="#111111" opacity="0.8" />
        </svg>
    );
};
