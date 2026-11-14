import React from 'react';
import { posts } from '../data';
import useReveal from '../hooks/useReveal';

function PostCard({ post, index }) {
  const [ref, cls] = useReveal();
  const hasLink = post.link && post.link !== '#';
  const Tag = hasLink ? 'a' : 'div';

  return (
    <Tag
      ref={ref}
      href={hasLink ? post.link : undefined}
      target={hasLink ? '_blank' : undefined}
      rel={hasLink ? 'noreferrer' : undefined}
      className={`card post ${cls}`}
      style={{ transitionDelay: `${index * 0.08}s`, textDecoration: 'none', color: 'inherit', cursor: hasLink ? 'pointer' : 'default' }}
    >
      <span className="tag">{post.tag}</span>
      <h3>{post.title}</h3>
      <p>{post.desc}</p>
      {hasLink ? <span className="soon" style={{ color: 'var(--accent)' }}>Read article →</span> : <span className="soon">Coming soon</span>}
    </Tag>
  );
}

export default function Blog() {
  const [ref, cls] = useReveal();

  return (
    <section id="blog" className="section">
      <div className="container">
        <div ref={ref} className={`section-head ${cls}`}>
          <div className="eyebrow">Writing</div>
          <h2 className="section-title">Notes from <span className="grad-text">the workshop.</span></h2>
        </div>
        <div className="posts-grid">
          {posts.map((post, i) => <PostCard key={post.title} post={post} index={i} />)}
        </div>
      </div>
    </section>
  );
}
