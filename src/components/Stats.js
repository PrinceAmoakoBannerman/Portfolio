import React, { useState } from 'react';
import { stats } from '../data';
import useIsMobile from '../hooks/useIsMobile';

export default function Stats() {
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();

  return (
    <div style={{
      position: 'relative',
      zIndex: 1,
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : `repeat(${stats.length}, 1fr)`,
      gap: 1,
      background: 'var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      {stats.map((s, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            padding: isMobile ? '28px 24px' : '40px 48px',
            background: hovered === i ? 'var(--surface)' : 'var(--bg)',
            transition: 'background 0.2s',
          }}
        >
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: isMobile ? 36 : 48,
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1,
            marginBottom: 8,
          }}>
            {s.num.replace(/\+/, '')}
            {s.num.includes('+') && <span style={{ color: 'var(--accent)' }}>+</span>}
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
