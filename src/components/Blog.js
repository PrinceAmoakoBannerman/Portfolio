import React, { useState, useEffect, useRef } from 'react';
import { posts } from '../data';
import useIsMobile from '../hooks/useIsMobile';

function PostCard({ post, index, isMobile }) {
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
      onClick={() => post.link !== '#' && window.open(post.link, '_blank')}
    >
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        width: hovered ? '100%' : '0%',
        height: 2,
        background: 'var(--accent)',
        transition: 'width 0.35s ease',
      }} />

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
        {post.tag}
      </div>

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: isMobile ? 20 : 24,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        marginBottom: 14,
        paddingRight: 32,
      }}>
        {post.title}
      </h3>

      <p style={{
        color: 'var(--muted)',
        fontSize: 15,
        lineHeight: 1.7,
      }}>
        {post.desc}
      </p>
    </div>
  );
}

export default function Blog() {
  const isMobile = useIsMobile();

  return (
    <section id="blog" style={{
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
        }}>Writing</span>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}>Blog</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: 1,
        background: 'var(--border)',
      }}>
        {posts.map((post, i) => (
          <PostCard key={i} post={post} index={i} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
