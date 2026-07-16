import { logoColor, initial } from '../../utils/logoColor.js';
import { matchLevel, matchLabel, postedLabel } from '../../utils/match.js';
import styles from './DetailPane.module.css';

export default function DetailPane({ job, onClose }) {
  const level = matchLevel(job.score);
  const label = matchLabel(level);
  const posted = postedLabel(job.id);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.top}>
          <div className={styles.logo} style={{ background: logoColor(job.company) }}>{initial(job.company)}</div>
          <div className={styles.titleBlock}>
            <div className={styles.role}>{job.title}</div>
            <div className={styles.co}>{job.company}</div>
          </div>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.meta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            <b>{job.location}</b>
          </span>
          <span className={styles.meta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
            <b>{job.type}</b>
          </span>
          <span className={styles.meta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10" /></svg>
            <b>{job.salary}</b>
          </span>
          <span className={styles.meta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            <b>{job.experience}</b>
          </span>
          <span className={styles.meta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Posted {posted}
          </span>
        </div>
        <div className={styles.actions}>
          <button className={styles.primary}>
            Apply now
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </button>
          <button className={styles.ghost}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            Save
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.fitCard}>
          <div className={styles.fitHead}>
            <div className={styles.fitTitle}>Why you'll fit here</div>
            <span className={`${styles.fitBadge} ${styles[level]}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {label}
            </span>
          </div>
          <div className={styles.fitCaption}>Skills matched from your resume</div>
          <div className={styles.chips}>
            {job.matchedSkills.map(sk => (
              <span key={sk} className={styles.chipY}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                {sk}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            About this role
          </div>
          <p className={styles.p}>{job.description}</p>
        </div>
      </div>
    </>
  );
}
