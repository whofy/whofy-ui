import { memo, useState } from 'react';
import { useSavedJobs } from '../../context/SavedJobsContext.jsx';
import { logoColor, initial } from '../../utils/logoColor.js';
import { postedLabel } from '../../utils/match.js';
import styles from './JobCard.module.css';

export default memo(function JobCard({ job, active, onClick }) {
  const posted = postedLabel(job.postedAt);
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = job.logoUrl && !logoFailed;
  const { savedIds } = useSavedJobs();
  const isSaved = savedIds.has(job.id);

  return (
    <div
      className={`${styles.card} ${active ? styles.active : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      {isSaved && (
        <span className={styles.savedTag} title="Saved">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
        </span>
      )}
      <div className={styles.top}>
        {showLogo ? (
          <img
            className={styles.logoImg}
            src={job.logoUrl}
            alt={`${job.company} logo`}
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <div className={styles.logo} style={{ background: logoColor(job.company) }}>
            {initial(job.company)}
          </div>
        )}
        <div className={styles.info}>
          <div className={styles.title}>{job.title}</div>
          <div className={styles.co}>{job.company}</div>
          <div className={styles.meta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {job.location}
            {job.workType && <span> ({job.workType})</span>}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomLeft}>
        </div>
        <span className={styles.time}>{posted}</span>
      </div>
    </div>
  );
})
