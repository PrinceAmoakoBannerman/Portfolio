import React from 'react';
import { stats } from '../data';
import useReveal from '../hooks/useReveal';

export default function Stats() {
  const [ref, cls] = useReveal();

  return (
    <div className="stats">
      <div ref={ref} className={`stats-grid ${cls}`}>
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-num">
              {s.num.replace('+', '')}
              {s.num.includes('+') && <span className="grad-text">+</span>}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
