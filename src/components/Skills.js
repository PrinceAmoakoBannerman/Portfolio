import React, { useState, useEffect, useRef } from 'react';
import { skills } from '../data';
import useIsMobile from '../hooks/useIsMobile';

function SkillBlock({ skill, index, isMobile }) {
  const [hovered, setHovered] = useState(false);
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
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--surface)' : 'var(--bg)',
        padding: isMobile ? '28px 24px' : '40px 48px',
        transition: `background 0.2s, opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 20 }}>{skill.icon}</div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 12,
      }}>
        {skill.name}
      </div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        color: 'var(--muted)',
        lineHeight: 2,
        letterSpacing: '0.04em',
      }}>
        {skill.items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const isMobile = useIsMobile();

  return (
    <section id="skills" style={{
      position: 'relative',
      zIndex: 1,
      padding: isMobile ? '80px 24px' : '100px 60px',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 64, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}>Expertise</span>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}>What I Build With</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : `repeat(${skills.length}, 1fr)`,
        gap: 1,
        background: 'var(--border)',
      }}>
        {skills.map((skill, i) => (
          <SkillBlock key={i} skill={skill} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
