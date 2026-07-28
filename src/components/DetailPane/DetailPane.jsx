import { useState } from 'react';
import { logoColor, initial } from '../../utils/logoColor.js';
import { postedLabel } from '../../utils/match.js';
import styles from './DetailPane.module.css';

// job.description is plain text with real line breaks and "• "-prefixed
// bullet lines (see whofy-api's sources/shared/normalize.py) — group
// consecutive bullet lines into <ul>s, everything else into <p>s.
function renderDescription(description) {
  if (!description) return <p className={styles.p}>No description provided by the employer.</p>;

  const blocks = [];
  let currentList = null;
  for (const line of description.split('\n')) {
    if (line.startsWith('• ')) {
      if (!currentList) { currentList = []; blocks.push(currentList); }
      currentList.push(line.slice(2));
    } else {
      currentList = null;
      blocks.push(line);
    }
  }

  return blocks.map((block, i) =>
    Array.isArray(block)
      ? <ul key={i} className={styles.list}>{block.map((item, j) => <li key={j}>{item}</li>)}</ul>
      : <p key={i} className={styles.p}>{block}</p>
  );
}

export default function DetailPane({ job, onClose }) {
  const posted = postedLabel(job.postedAt);
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = job.logoUrl && !logoFailed;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.top}>
          {showLogo ? (
            <img className={styles.logoImg} src={job.logoUrl} alt="" onError={() => setLogoFailed(true)} />
          ) : (
            <div className={styles.logo} style={{ background: logoColor(job.company) }}>{initial(job.company)}</div>
          )}
          <div className={styles.titleBlock}>
            <div className={styles.role}>{job.title}</div>
            <div className={styles.co}>{job.company}</div>
          </div>
        </div>
        <div className={styles.metaRow}>
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
          <span className={styles.meta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            <b>{job.location}</b>
          </span>
          <span className={styles.meta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Posted {posted}
          </span>
          <span className={styles.meta}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
            via <b>{job.source}</b>
          </span>
        </div>
        <div className={styles.actions}>
          <a className={styles.primary} href={job.applyUrl} target="_blank" rel="noreferrer">
            Apply now
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </a>
          <button className={styles.ghost}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            Save
          </button>
        </div>
      </div>
      <div className={styles.body}>
        {job.matchedSkills?.length > 0 && (
          <div className={styles.fitCard}>
            <div className={styles.fitHead}>
              <div className={styles.fitTitle}>Why you'll fit here</div>
              <span className={`${styles.fitBadge} ${styles.strong}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                {job.matchedSkills.length} skill{job.matchedSkills.length === 1 ? '' : 's'} matched
              </span>
            </div>
            <div className={styles.fitCaption}>Found in this role's listing</div>
            <div className={styles.chips}>
              {job.matchedSkills.map(sk => (
                <span key={sk} className={styles.chipY}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}
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
