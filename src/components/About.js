import React, { useRef, useState, useEffect } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const TERMINAL_LINES = [
  { cmd: 'whoami', out: 'Prince Amoako Bannerman' },
  { cmd: 'cat role.txt', out: 'Fullstack Developer' },
  { cmd: 'cat speciality.txt', out: 'Python / Django' },
  { cmd: 'cat experience.txt', out: '5+ Years' },
  { cmd: 'cat status.txt', out: 'Available for new projects ✓' },
];

const BIO = [
  "I'm a fullstack developer with 5+ years of experience building web applications that solve real problems. My core strength is Python and Django — I use them to build backends that are clean, scalable, and easy to maintain.",
  "I work across the full stack: from designing REST APIs and database schemas to shipping polished frontends. My most recent project, tuffafrikan.com, is a platform I built end-to-end.",
  "I care about writing code that lasts. When I take on a project, I own it — from the first commit to production.",
];

export default function About() {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: isMobile ? '80px 24px' : '100px 60px',
        borderBottom: '1px solid var(--border)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: 'var(--accent)',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginBottom: 28,
      }}>
        About
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 48 : 80,
        alignItems: 'start',
      }}>
        {/* Left — bio */}
        <div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 32,
          }}>
            The person<br />
            <span style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px var(--border)',
            }}>
              behind the code.
            </span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {BIO.map((para, i) => (
              <p key={i} style={{
                color: 'var(--muted)',
                fontSize: 15,
                lineHeight: 1.8,
              }}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Right — terminal window */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: isMobile ? 12 : 13,
          overflow: 'hidden',
        }}>
          {/* Title bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
            background: 'rgba(0,0,0,0.3)',
          }}>
            {['#FF5F57', '#FFBD2E', '#28C841'].map(c => (
              <div key={c} style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: c,
                opacity: 0.85,
              }} />
            ))}
            <span style={{
              color: 'var(--muted)',
              fontSize: 11,
              marginLeft: 8,
            }}>
              prince@dev ~ $
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {TERMINAL_LINES.map(({ cmd, out }, i) => (
              <div key={i}>
                <div>
                  <span style={{ color: 'var(--muted)' }}>$ </span>
                  <span style={{ color: 'var(--accent)' }}>{cmd}</span>
                </div>
                <div style={{ color: 'var(--text)', marginTop: 4, paddingLeft: 12 }}>
                  <span style={{ color: 'var(--muted)' }}>{'> '}</span>
                  {out}
                </div>
              </div>
            ))}
            {/* blinking cursor */}
            <div>
              <span style={{ color: 'var(--muted)' }}>$ </span>
              <span style={{
                display: 'inline-block',
                width: 8,
                height: '1em',
                background: 'var(--accent)',
                verticalAlign: 'text-bottom',
                animation: 'blink 1s step-end infinite',
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
