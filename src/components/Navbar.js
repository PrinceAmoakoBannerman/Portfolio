import React, { useEffect, useState } from 'react';
import { config } from '../data';
import useIsMobile from '../hooks/useIsMobile';

const NAV_ITEMS = [
  ['about', 'About'],
  ['projects', 'Work'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const paddingY = scrolled ? (isMobile ? '12px' : '14px') : (isMobile ? '16px' : '20px');
  const paddingX = isMobile ? '24px' : '60px';

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${paddingY} ${paddingX}`,
        background: 'rgba(10,10,15,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        transition: 'padding 0.3s',
      }}>
        <a href="#hero" style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          color: 'var(--accent)',
          letterSpacing: '0.08em',
          textDecoration: 'none',
        }}>
          {config.logo}
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: 36, listStyle: 'none' }}>
            {NAV_ITEMS.map(([id, label]) => (
              <li key={id}>
                <span
                  onClick={() => scrollTo(id)}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: hovered === id ? 'var(--text)' : 'var(--muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Mobile hamburger button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              zIndex: 101,
            }}
          >
            <span style={{
              display: 'block', width: 24, height: 2, background: 'var(--text)',
              transition: 'transform 0.3s',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 24, height: 2, background: 'var(--text)',
              transition: 'opacity 0.3s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: 24, height: 2, background: 'var(--text)',
              transition: 'transform 0.3s',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>
        )}
      </nav>

      {/* Mobile fullscreen overlay */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'rgba(10,10,15,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 44,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s',
        }}>
          {NAV_ITEMS.map(([id, label], i) => (
            <span
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 36,
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: '-0.02em',
                cursor: 'pointer',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.35s ease ${i * 0.07}s, transform 0.35s ease ${i * 0.07}s, color 0.2s`,
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              {label}
            </span>
          ))}
          <a
            href={`mailto:${config.email}`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: 'var(--muted)',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              marginTop: 8,
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.35s ease ${NAV_ITEMS.length * 0.07}s`,
            }}
          >
            {config.email}
          </a>
        </div>
      )}
    </>
  );
}
