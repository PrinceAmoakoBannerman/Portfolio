import React from 'react';
import { config } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© {year} {config.name}. {config.footer}</span>
        <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
