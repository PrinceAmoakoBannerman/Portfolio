import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data';
import useIsMobile from '../hooks/useIsMobile';

function ProjectCard({ project, index, isMobile }) {
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
        padding: isMobile ? 28 : 48,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s, background 0.25s`,
      }}
      onClick={() => project.link !== '#' && window.open(project.link, '_blank')}
    >
      {/* animated bottom border */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        width: hovered ? '100%' : '0%',
        height: 2,
        background: 'var(--accent)',
        transition: 'width 0.35s ease',
      }} />

      {/* arrow */}
      <div style={{
        position: 'absolute',
        top: isMobile ? 28 : 48,
        right: isMobile ? 28 : 48,
        fontSize: 20,
        color: hovered ? 'var(--accent)' : 'var(--border)',
        transform: hovered ? 'translate(4px,-4px)' : 'translate(0,0)',
        transition: 'color 0.2s, transform 0.2s',
      }}>↗</div>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        color: 'var(--accent)',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        marginBottom: 20,
        paddingRight: 32,
      }}>
        {project.tag}
      </div>

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: isMobile ? 20 : 26,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        marginBottom: 14,
        paddingRight: 32,
      }}>
        {project.title}
      </h3>

      <p style={{
        color: 'var(--muted)',
        fontSize: 15,
        lineHeight: 1.7,
        marginBottom: 28,
      }}>
        {project.desc}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {project.stack.map((tag) => (
          <span key={tag} style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            padding: '5px 12px',
            border: `1px solid ${hovered ? 'rgba(79,142,247,0.3)' : 'var(--border)'}`,
            color: hovered ? 'var(--text)' : 'var(--muted)',
            letterSpacing: '0.05em',
            transition: 'border-color 0.2s, color 0.2s',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const isMobile = useIsMobile();

  return (
    <section id="projects" style={{
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
        }}>Selected Work</span>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}>Projects</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: 1,
        background: 'var(--border)',
      }}>
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
