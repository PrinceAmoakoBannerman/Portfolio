import React from 'react';
import { skills } from '../data';
import useReveal from '../hooks/useReveal';

const TECH = [
  'Python', 'Django', 'Django REST', 'PostgreSQL', 'JavaScript', 'React', 'Next.js',
  'Tailwind CSS', 'HTML & CSS', 'Docker', 'Git', 'Linux', 'Vercel', 'REST APIs',
];

function SkillCard({ skill, index }) {
  const [ref, cls] = useReveal();
  return (
    <div ref={ref} className={`card skill ${cls}`} style={{ transitionDelay: `${index * 0.08}s` }}>
      <div className="skill-icon">{skill.icon}</div>
      <h3>{skill.name}</h3>
      <div className="chips">
        {skill.items.map((item) => <span key={item} className="chip">{item}</span>)}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, cls] = useReveal();

  return (
    <section id="skills" className="section">
      <div className="container">
        <div ref={ref} className={`section-head ${cls}`}>
          <div className="eyebrow">Expertise</div>
          <h2 className="section-title">What I <span className="grad-text">build with.</span></h2>
        </div>

        <div className="skills-grid">
          {skills.map((skill, i) => <SkillCard key={skill.name} skill={skill} index={i} />)}
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...TECH, ...TECH].map((t, i) => <span key={i} className="marquee-item">{t}</span>)}
        </div>
      </div>
    </section>
  );
}
