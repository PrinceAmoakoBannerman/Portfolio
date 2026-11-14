import React, { useState } from 'react';
import { config } from '../data';
import useReveal from '../hooks/useReveal';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export default function Contact() {
  const [ref, cls] = useReveal();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${config.email}`;
    }
  };

  return (
    <section id="contact" className="section">
      <div ref={ref} className={`container cta ${cls}`}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>Contact</div>
        <h2>
          {config.contactHeadline[0]}<br />
          <span className="grad-text">{config.contactHeadline[1]}</span>
        </h2>
        <p>{config.contactBio}</p>

        <div className="cta-actions">
          <a className="btn btn-primary" href={`mailto:${config.email}`}>
            <span style={{ width: 18, height: 18, display: 'inline-flex' }}><MailIcon /></span>
            Send me an email
          </a>
          <button className="btn btn-ghost" onClick={copyEmail}>
            {copied ? 'Copied ✓' : 'Copy email'}
          </button>
        </div>

        <div className="socials" style={{ justifyContent: 'center' }}>
          <a className="icon-btn" href={config.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></a>
          <a className="icon-btn" href={config.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
        </div>
        <div className="copy-hint">{config.email}</div>
      </div>
    </section>
  );
}
