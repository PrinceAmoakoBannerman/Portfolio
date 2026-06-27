import React, { useEffect, useState } from 'react';
import { config } from '../data';
import useIsMobile from '../hooks/useIsMobile';

export default function Hero() {
  const [typed, setTyped] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [outlineHovered, setOutlineHovered] = useState(false);
  const isMobile = useIsMobile();

  const phrases = config.tagline;

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout;
    if (!deleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => {
          setTyped(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, 70);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setTyped(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, 40);
      } else {
        setDeleting(false);
        setPhraseIndex(i => (i + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex, phrases]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const nameParts = config.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || 'Here';

  return (
    <section id="hero" style={{
      position: 'relative',
      zIndex: 1,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isMobile ? '100px 24px 80px' : '120px 60px 80px',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        color: 'var(--accent)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ display: 'block', width: 32, height: 1, background: 'var(--accent)' }} />
        {config.availability}
      </div>

      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: isMobile ? 'clamp(48px, 14vw, 72px)' : 'clamp(56px, 9vw, 120px)',
        fontWeight: 700,
        lineHeight: 0.95,
        letterSpacing: '-0.03em',
        marginBottom: 28,
      }}>
        {firstName}<br />
        <span
          style={{
            color: outlineHovered ? 'var(--text)' : 'transparent',
            WebkitTextStroke: outlineHovered ? '1.5px transparent' : '1.5px var(--border)',
            transition: 'color 0.3s, -webkit-text-stroke 0.3s',
            cursor: 'default',
          }}
          onMouseEnter={() => setOutlineHovered(true)}
          onMouseLeave={() => setOutlineHovered(false)}
        >
          {lastName}
        </span>
        <br />Here.
      </h1>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: isMobile ? 'clamp(14px, 4vw, 18px)' : 'clamp(16px, 2.5vw, 22px)',
        color: 'var(--muted)',
        marginBottom: 48,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ color: 'var(--accent)' }}>$</span>
        <span style={{ color: 'var(--text)' }}>{typed}</span>
        <span style={{
          display: 'inline-block',
          width: 2,
          height: '1.1em',
          background: 'var(--accent)',
          verticalAlign: 'text-bottom',
          animation: 'blink 1s step-end infinite',
        }} />
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <button
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            padding: isMobile ? '13px 22px' : '14px 28px',
            background: 'var(--accent)',
            color: 'var(--bg)',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.08em',
            fontWeight: 500,
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onClick={() => scrollTo('projects')}
          onMouseEnter={e => { e.target.style.opacity = '0.85'; e.target.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
        >
          View My Work
        </button>
        <button
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            padding: isMobile ? '13px 22px' : '14px 28px',
            background: 'transparent',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            letterSpacing: '0.08em',
            transition: 'border-color 0.2s, transform 0.2s',
          }}
          onClick={() => scrollTo('contact')}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--muted)'; e.target.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.transform = 'translateY(0)'; }}
        >
          Get In Touch
        </button>
      </div>

      {!isMobile && (
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: 60,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--muted)',
          letterSpacing: '0.12em',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          scroll to explore
          <span style={{
            display: 'block',
            width: 40,
            height: 1,
            background: 'var(--border)',
            animation: 'expandLine 2s ease-in-out infinite',
          }} />
        </div>
      )}
    </section>
  );
}
