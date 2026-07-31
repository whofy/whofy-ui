import { useState, useEffect, useRef } from 'react';
import DetailPane from './SavedDetailPane.jsx';
import styles from './SavedJobs.module.css';

const DEMO_SAVED_JOBS = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Razorpay',
    location: 'Bengaluru',
    workType: 'Hybrid',
    experience: '0-2 years',
    source: 'Greenhouse',
    savedAt: '2 days ago',
    applyUrl: 'https://razorpay.com/careers',
    description: 'Build and maintain customer-facing dashboards using React, TypeScript, and modern frontend tooling.\n\n• Develop reusable UI components\n• Collaborate with design and backend teams\n• Write unit and integration tests\n• Optimize web performance and accessibility',
  },
  {
    id: 2,
    title: 'Software Engineer Intern',
    company: 'Flipkart',
    location: 'Bengaluru',
    workType: 'On-site',
    experience: 'Internship',
    source: 'Lever',
    savedAt: '5 days ago',
    applyUrl: 'https://flipkart.com/careers',
    description: 'Join the catalog engineering team to work on large-scale data pipelines and microservices.\n\n• Work with Java and Spring Boot\n• Build REST APIs consumed by millions of users\n• Participate in code reviews and design discussions',
  },
  {
    id: 3,
    title: 'React Developer',
    company: 'Swiggy',
    location: 'Remote',
    workType: 'Remote',
    experience: '0-1 years',
    source: 'RemoteOK',
    savedAt: '1 week ago',
    applyUrl: 'https://swiggy.com/careers',
    description: 'Help build the next generation of Swiggy\'s consumer app using React and Node.js.\n\n• Develop responsive web interfaces\n• Integrate with REST and GraphQL APIs\n• Implement state management with Redux\n• Ensure cross-browser compatibility',
  },
];

function logoColor(name) {
  const colors = ['#1F47E0', '#059669', '#D97706', '#7C3AED', '#DC2626', '#0891B2'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function SavedJobCard({ job, active, onClick }) {
  return (
    <div
      className={`${styles.card} ${active ? styles.active : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      <div className={styles.cardTop}>
        <div className={styles.cardLogo} style={{ background: logoColor(job.company) }}>
          {job.company[0]}
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardTitle}>{job.title}</div>
          <div className={styles.cardCompany}>{job.company}</div>
          <div className={styles.cardMeta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {job.location}
            {job.workType && <span> ({job.workType})</span>}
          </div>
        </div>
      </div>
      <div className={styles.cardBottom}>
        <span className={styles.cardTime}>Saved {job.savedAt}</span>
      </div>
    </div>
  );
}

export default function SavedJobs() {
  const [selectedId, setSelectedId] = useState(null);
  const detailRef = useRef(null);

  useEffect(() => {
    if (DEMO_SAVED_JOBS.length > 0) {
      setSelectedId(DEMO_SAVED_JOBS[0].id);
    }
  }, []);

  useEffect(() => {
    if (detailRef.current) {
      detailRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedId]);

  const selected = DEMO_SAVED_JOBS.find(j => j.id === selectedId) || null;

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className="container">
          <div className={styles.header}>
            <h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              Saved jobs
              <span className={styles.count}>{DEMO_SAVED_JOBS.length} saved</span>
            </h2>
          </div>
        </div>
      </div>

      <div className={`container ${styles.contentWrapper}`}>
        {DEMO_SAVED_JOBS.length === 0 ? (
          <div className={styles.empty}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            <p>No saved jobs yet. Find jobs you like and save them for later!</p>
          </div>
        ) : (
          <div className={styles.split}>
            <div className={styles.listPane}>
              {DEMO_SAVED_JOBS.map(job => (
                <SavedJobCard
                  key={job.id}
                  job={job}
                  active={job.id === selectedId}
                  onClick={() => setSelectedId(job.id)}
                />
              ))}
            </div>
            <div className={styles.detailPane} ref={detailRef}>
              {selected && <DetailPane job={selected} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
