import { logoColor, initial } from '../../utils/logoColor.js';
import { matchLevel, matchLabel, postedLabel } from '../../utils/match.js';
import styles from './JobCard.module.css';

export default function JobCard({ job, active, onClick }) {
  const level = matchLevel(job.score);
  const label = matchLabel(level);
  const posted = postedLabel(job.id);

  return (
    <div
      className={`${styles.card} ${active ? styles.active : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    >
      <div className={styles.top}>
        <div className={styles.logo} style={{ background: logoColor(job.company) }}>
          {initial(job.company)}
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{job.title}</div>
          <div className={styles.co}>{job.company}</div>
          <div className={styles.meta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {job.location} · {job.salary}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={`${styles.match} ${styles[level]}`}>
          <span className={styles.dot}></span>{label}
        </span>
        <span className={styles.time}>{posted}</span>
      </div>
    </div>
  );
}
