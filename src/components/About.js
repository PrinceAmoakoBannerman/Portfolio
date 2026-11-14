import React from 'react';
import useReveal from '../hooks/useReveal';

const TERMINAL_LINES = [
  { cmd: 'whoami', out: 'Prince Amoako Bannerman' },
  { cmd: 'cat role.txt', out: 'Fullstack Developer' },
  { cmd: 'cat speciality.txt', out: 'Python / Django' },
  { cmd: 'cat experience.txt', out: '5+ Years' },
  { cmd: 'cat status.txt', out: 'Available for new projects ✓' },
];

const HIGHLIGHTS = [
  'End-to-end ownership',
  'Clean, maintainable code',
  'Production-ready deploys',
  'Clear communication',
];

export default function About() {
  const [ref, cls] = useReveal();

  return (
    <section id="about" className="section">
      <div ref={ref} className={`container about-grid ${cls}`}>
        <div className="about-bio">
          <div className="eyebrow">About me</div>
          <h2 className="section-title" style={{ marginBottom: 28 }}>
            The person <span className="grad-text">behind the code.</span>
          </h2>
          <p>
            I'm a fullstack developer with <strong>5+ years of experience</strong> building web
            applications that solve real problems. My core strength is <strong>Python and Django</strong> —
            I use them to build backends that are clean, scalable, and easy to maintain.
          </p>
          <p>
            I work across the full stack: from designing REST APIs and database schemas to shipping
            polished frontends. My most recent project, <strong>tuffafrikan.com</strong>, is a platform I
            built end-to-end.
          </p>
          <p>
            I care about writing code that lasts. When I take on a project, I own it — from the first
            commit to production.
          </p>

          <div className="highlights">
            {HIGHLIGHTS.map((h) => (
              <div key={h} className="highlight">
                <span className="chk">✓</span>
                {h}
              </div>
            ))}
          </div>
        </div>

        <div className="terminal">
          <div className="window-bar">
            <span className="dot" style={{ background: '#FF5F57' }} />
            <span className="dot" style={{ background: '#FEBC2E' }} />
            <span className="dot" style={{ background: '#28C840' }} />
            <span className="window-title">prince@dev: ~</span>
          </div>
          <div className="terminal-body">
            {TERMINAL_LINES.map(({ cmd, out }) => (
              <div key={cmd}>
                <div><span className="muted">$ </span><span className="cmd">{cmd}</span></div>
                <div className="out"><span className="muted">› </span>{out}</div>
              </div>
            ))}
            <div>
              <span className="muted">$ </span>
              <span className="caret" style={{ width: 8, verticalAlign: 'text-bottom' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
