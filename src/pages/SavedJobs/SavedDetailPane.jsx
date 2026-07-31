import { useUser } from '@clerk/clerk-react';
import { useSavedJobs } from '../../context/SavedJobsContext.jsx';
import styles from './SavedDetailPane.module.css';

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

function renderDescription(text) {
  if (!text) return <p className={styles.p}>No description provided by the employer.</p>;
  const blocks = [];
  let currentList = null;
  for (const line of text.split('\n')) {
    if (line.startsWith('• ')) {
      if (!currentList) { currentList = []; blocks.push(currentList); }
      currentList.push(line.slice(2));
    } else {
      currentList = null;
      if (line.trim()) blocks.push(line);
    }
  }
  return blocks.map((block, i) =>
    Array.isArray(block)
      ? <ul key={i} className={styles.list}>{block.map((item, j) => <li key={j}>{item}</li>)}</ul>
      : <p key={i} className={styles.p}>{block}</p>
  );
}

export default function SavedDetailPane({ job, onUnsave }) {
  const { toggle, saving } = useSavedJobs();

  const handleUnsave = async () => {
    await toggle(job.id);
    onUnsave?.(job.id);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.top}>
          <div className={styles.logo} style={{ background: logoColor(job.company) }}>
            {job.company[0]}
          </div>
          <div className={styles.titleBlock}>
            <div className={styles.role}>{job.title}</div>
            <div className={styles.co}>{job.company}</div>
          </div>
        </div>
        {job.expired && (
          <div className={styles.expiredBanner}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            This job is no longer available
          </div>
        )}
        {!job.expired && (
          <div className={styles.metaRow}>
            {job.location && (
              <span className={styles.meta}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <b>{job.location}</b>
              </span>
            )}
            {job.workType && (
              <span className={styles.meta}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <b>{job.workType}</b>
              </span>
            )}
            {job.experience && (
              <span className={styles.meta}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                <b>{job.experience}</b>
              </span>
            )}
            {job.source && (
              <span className={styles.meta}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
                via <b>{job.source}</b>
              </span>
            )}
          </div>
        )}
        <div className={styles.actions}>
          {!job.expired && (
            <a className={styles.applyBtn} href={job.applyUrl} target="_blank" rel="noreferrer">
              Apply now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            </a>
          )}
          <button className={styles.removeBtn} onClick={handleUnsave} disabled={saving}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            Unsave
          </button>
        </div>
        <div className={styles.savedInfo}>Saved {timeAgo(job.savedAt)}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            About this role
          </div>
          {renderDescription(job.description)}
        </div>
      </div>
    </>
  );
}
