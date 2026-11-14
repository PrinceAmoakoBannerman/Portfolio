import React, { useEffect, useState } from 'react';
import { config } from '../data';
import useIsMobile from '../hooks/useIsMobile';

const NAV_ITEMS = [
  ['about', 'About'],
  ['projects', 'Work'],
  ['skills', 'Skills'],
  ['blog', 'Blog'],
  ['contact', 'Contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
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
    const delay = menuOpen ? 250 : 0;
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), delay);
  };

  const initials = config.name.split(' ').map((p) => p[0]).slice(0, 2).join('');

  return (
    <>
      <div className={`nav-wrap${scrolled || menuOpen ? ' scrolled' : ''}`}>
        <nav className="nav">
          <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
            <span className="logo-mark">{initials}</span>
            <span>{config.name.split(' ')[0]}<span style={{ color: 'var(--accent-2)' }}>.</span></span>
          </a>

          {!isMobile && (
            <ul className="nav-links">
              {NAV_ITEMS.map(([id, label]) => (
                <li key={id}><button onClick={() => scrollTo(id)}>{label}</button></li>
              ))}
            </ul>
          )}

          {!isMobile ? (
            <button className="btn btn-primary nav-cta" onClick={() => scrollTo('contact')}>
              Hire me
            </button>
          ) : (
            <button
              className={`burger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          )}
        </nav>
      </div>

      {isMobile && (
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
          {NAV_ITEMS.map(([id, label], i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{ transitionDelay: menuOpen ? `${i * 0.06}s` : '0s' }}
            >
              {label}
            </button>
          ))}
          <a
            href={`mailto:${config.email}`}
            className="btn btn-primary"
            style={{ marginTop: 12 }}
          >
            {config.email}
          </a>
        </div>
      )}
    </>
  );
}
