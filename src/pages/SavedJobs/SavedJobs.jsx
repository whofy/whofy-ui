import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getSavedJobs } from '../../api/jobs.js';
import { useSavedJobs } from '../../context/SavedJobsContext.jsx';
import DetailPane from './SavedDetailPane.jsx';
import styles from './SavedJobs.module.css';

function logoColor(name) {
  const colors = ['#1F47E0', '#059669', '#D97706', '#7C3AED', '#DC2626', '#0891B2'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function timeAgo(isoStr) {
  if (!isoStr) return '';
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
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
        {job.expired && <span className={styles.expiredTag}>No longer available</span>}
        <span className={styles.cardTime}>Saved {timeAgo(job.savedAt)}</span>
      </div>
    </div>
  );
}

export default function SavedJobs() {
  const { isSignedIn, user } = useUser();
  const { savedIds, refresh } = useSavedJobs();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const detailRef = useRef(null);

  useEffect(() => {
    if (!isSignedIn || !user) { setLoading(false); return; }
    setLoading(true);
    getSavedJobs(user.id)
      .then(data => {
        setJobs(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, [isSignedIn, user, savedIds.size]);

  useEffect(() => {
    if (detailRef.current) detailRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedId]);

  const onRemoved = (jobId) => {
    const remaining = jobs.filter(j => j.id !== jobId);
    setJobs(remaining);
    if (selectedId === jobId) setSelectedId(remaining[0]?.id || null);
    refresh();
  };

  const selected = jobs.find(j => j.id === selectedId) || null;

  if (!isSignedIn) {
    return (
      <div className={styles.page}>
        <div className={styles.toolbar}>
          <div className="container">
            <div className={styles.header}>
              <h2>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                Saved jobs
              </h2>
            </div>
          </div>
        </div>
        <div className={`container ${styles.contentWrapper}`}>
          <div className={styles.empty}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            <p>Sign in to see your saved jobs.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className="container">
          <div className={styles.header}>
            <h2>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
              Saved jobs
              {!loading && <span className={styles.count}>{jobs.length} saved</span>}
            </h2>
            <p className={styles.note}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
              Listings removed by the employer will be marked as no longer available.
            </p>
          </div>
        </div>
      </div>

      <div className={`container ${styles.contentWrapper}`}>
        {loading ? (
          <div className={styles.empty}>
            <p>Loading saved jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className={styles.empty}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            <p>No saved jobs yet. Find jobs you like and save them for later!</p>
          </div>
        ) : (
          <div className={styles.split}>
            <div className={styles.listPane}>
              {jobs.map(job => (
                <SavedJobCard
                  key={job.id}
                  job={job}
                  active={job.id === selectedId}
                  onClick={() => setSelectedId(job.id)}
                />
              ))}
            </div>
            <div className={styles.detailPane} ref={detailRef}>
              {selected && <DetailPane job={selected} onUnsave={onRemoved} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
