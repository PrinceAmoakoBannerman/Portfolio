import React from 'react';
import { config } from '../data';
import useIsMobile from '../hooks/useIsMobile';

export default function Footer() {
  const year = new Date().getFullYear();
  const isMobile = useIsMobile();

  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? 8 : 0,
      padding: isMobile ? '24px' : '28px 60px',
      borderTop: '1px solid var(--border)',
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: 'var(--muted)',
        letterSpacing: '0.08em',
      }}>
        // {config.name} · {year}
      </span>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: 'var(--muted)',
        letterSpacing: '0.08em',
      }}>
        {config.footer}
      </span>
    </footer>
  );
}
