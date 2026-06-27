import React, { useState } from 'react';
import { config } from '../data';
import useIsMobile from '../hooks/useIsMobile';

export default function Contact() {
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();

  const links = [
    { key: 'email', label: '✉ ' + config.email, href: 'mailto:' + config.email },
    { key: 'github', label: '⌥ GitHub', href: config.github },
    { key: 'linkedin', label: 'in LinkedIn', href: config.linkedin },
  ];

  return (
    <section id="contact" style={{
      position: 'relative',
      zIndex: 1,
      padding: isMobile ? '80px 24px' : '100px 60px',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 640 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: 28,
        }}>
          Contact
        </div>

        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: 32,
        }}>
          {config.contactHeadline[0]}<br />
          <span style={{
            color: 'transparent',
            WebkitTextStroke: '1px var(--muted)',
          }}>
            {config.contactHeadline[1]}
          </span>
        </div>

        <p style={{
          color: 'var(--muted)',
          fontSize: 15,
          lineHeight: 1.8,
          maxWidth: 480,
        }}>
          {config.contactBio}
        </p>

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 20 : 24,
          flexWrap: 'wrap',
          marginTop: 40,
        }}>
          {links.map(({ key, label, href }) => (
            <a
              key={key}
              href={href}
              target={key !== 'email' ? '_blank' : undefined}
              rel="noreferrer"
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: hovered === key ? 'var(--accent)' : 'var(--muted)',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderBottom: `1px solid ${hovered === key ? 'var(--accent)' : 'var(--border)'}`,
                paddingBottom: 4,
                transition: 'color 0.2s, border-color 0.2s',
                width: isMobile ? 'fit-content' : 'auto',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
