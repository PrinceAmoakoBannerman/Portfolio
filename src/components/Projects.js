import React, { useState } from 'react';
import { projects } from '../data';
import useReveal from '../hooks/useReveal';

function hostOf(url) {
  try { return new URL(url).host.replace(/^www\./, ''); } catch { return url; }
}

function ProjectCard({ project, index, featured }) {
  const [ref, cls] = useReveal(0.08);
  const [imgFailed, setImgFailed] = useState(false);
  const hasLink = project.link && project.link !== '#';

  return (
    <a
      ref={ref}
      href={hasLink ? project.link : undefined}
      target="_blank"
      rel="noreferrer"
      className={`card project${featured ? ' featured' : ''} ${cls}`}
      style={{ transitionDelay: `${(index % 2) * 0.08}s` }}
    >
      <div className="shot">
        <div className="shot-bar">
          <span className="dot" style={{ background: '#FF5F57' }} />
          <span className="dot" style={{ background: '#FEBC2E' }} />
          <span className="dot" style={{ background: '#28C840' }} />
          <span className="shot-url">{hostOf(project.link)}</span>
        </div>
        {project.image && !imgFailed ? (
          <img
            src={process.env.PUBLIC_URL + project.image}
            alt={`${project.title} homepage`}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="shot-fallback">{project.title}</div>
        )}
      </div>

      <div className="project-body">
        <div className="project-meta">
          <span className="tag">{project.tag}</span>
          {featured && <span className="featured-badge">Featured</span>}
        </div>
        <h3>
          {project.title}
          <span className="go">↗</span>
        </h3>
        <p>{project.desc}</p>
        <div className="chips">
          {project.stack.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const [ref, cls] = useReveal();

  return (
    <section id="projects" className="section">
      <div className="container">
        <div ref={ref} className={`section-head ${cls}`}>
          <div className="eyebrow">Selected work</div>
          <h2 className="section-title">Things I've <span className="grad-text">built & shipped.</span></h2>
          <p className="section-sub">
            Live products for real clients — e-commerce stores, internal platforms and web apps,
            designed and built end-to-end.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
