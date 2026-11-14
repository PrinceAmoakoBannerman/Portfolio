import React, { useEffect, useState } from 'react';
import { config, projects } from '../data';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

function useTypewriter(phrases) {
  const [typed, setTyped] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout;
    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 65);
    } else if (!deleting) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (typed.length > 0) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 35);
    } else {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, phraseIndex, phrases]);

  return typed;
}

export default function Hero() {
  const typed = useTypewriter(config.tagline);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const [firstName, ...rest] = config.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section id="hero" className="hero">
      <div className="hero-grid">
        <div>
          <div className="pill">
            <span className="pulse" />
            {config.availability}
          </div>

          <h1>
            Hi, I'm {firstName}.<br />
            <span className="grad-text">I build products</span><br />
            people use.
          </h1>

          <p className="hero-lead">
            {lastName ? `${firstName} ${lastName} — ` : ''}a full-stack developer specialising in
            Python &amp; Django, shipping fast, polished web apps from database to UI.
          </p>

          <div className="typed">
            <span className="prompt">❯</span>
            <span>{typed}</span>
            <span className="caret" />
          </div>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View my work <span className="arrow">→</span>
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>
              Let's talk
            </button>
          </div>

          <div className="socials">
            <a className="icon-btn" href={config.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
            <a className="icon-btn" href={config.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a className="icon-btn" href={`mailto:${config.email}`} aria-label="Email"><MailIcon /></a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="code-card">
            <div className="window-bar">
              <span className="dot" style={{ background: '#FF5F57' }} />
              <span className="dot" style={{ background: '#FEBC2E' }} />
              <span className="dot" style={{ background: '#28C840' }} />
              <span className="window-title">developer.py</span>
            </div>
            <div className="code">
<span className="c-k">class</span> <span className="c-f">Developer</span><span className="c-p">:</span>{'\n'}
{'    '}name <span className="c-p">=</span> <span className="c-s">"{firstName}"</span>{'\n'}
{'    '}role <span className="c-p">=</span> <span className="c-s">"Full-Stack Engineer"</span>{'\n'}
{'    '}stack <span className="c-p">=</span> <span className="c-p">[</span><span className="c-s">"Django"</span>, <span className="c-s">"React"</span>,{'\n'}
{'             '}<span className="c-s">"Next.js"</span>, <span className="c-s">"PostgreSQL"</span><span className="c-p">]</span>{'\n'}
{'\n'}
{'    '}<span className="c-k">def</span> <span className="c-f">ship</span><span className="c-p">(</span>self, idea<span className="c-p">):</span>{'\n'}
{'        '}<span className="c-c"># from first commit to production</span>{'\n'}
{'        '}<span className="c-k">return</span> <span className="c-f">build</span><span className="c-p">(</span>idea, quality<span className="c-p">=</span><span className="c-n">100</span><span className="c-p">)</span>
            </div>
          </div>

          <div className="float-chip chip-1">
            <span className="chip-icon">🚀</span>
            <span><b>{projects.length}</b> live projects</span>
          </div>
          <div className="float-chip chip-2">
            <span className="chip-icon">⚡</span>
            <span>Python · Django · React</span>
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true"><span /></div>
    </section>
  );
}
