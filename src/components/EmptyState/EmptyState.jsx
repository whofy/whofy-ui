import { useState } from 'react';
import { logoColor, initial } from '../../utils/logoColor.js';
import styles from './EmptyState.module.css';

function countBy(arr) {
  const map = {};
  for (const v of arr) map[v] = (map[v] || 0) + 1;
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}

function computeSnapshot(jobs) {
  if (!jobs.length) return null;

  // Recommend by strongest skill match when we have that data (a resume was
  // uploaded); otherwise fall back to most recently posted.
  const byMatchCount = [...jobs].sort((a, b) => (b.matchedSkills?.length || 0) - (a.matchedSkills?.length || 0));
  const topMatchCount = byMatchCount[0].matchedSkills?.length || 0;
  const topPick = topMatchCount > 0
    ? byMatchCount[0]
    : [...jobs].sort((a, b) => new Date(b.postedAt || 0) - new Date(a.postedAt || 0))[0];

  const topCity = countBy(jobs.map(j => j.location))[0][0];
  return { topPick, topCity, count: jobs.length, byMatch: topMatchCount > 0 };
}

function FeaturedLogo({ job }) {
  const [logoFailed, setLogoFailed] = useState(false);
  if (job.logoUrl && !logoFailed) {
    return <img className={styles.logoImg} src={job.logoUrl} alt="" onError={() => setLogoFailed(true)} />;
  }
  return <div className={styles.logo} style={{ background: logoColor(job.company) }}>{initial(job.company)}</div>;
}

export default function EmptyState({ jobs, onPick }) {
  const snap = computeSnapshot(jobs);

  if (!snap) {
    return (
      <div className={styles.plain}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="2" />
        </svg>
        <p>Select a role to see the full details.</p>
      </div>
    );
  }

  const { topPick, topCity, count, byMatch } = snap;

  return (
    <div className={styles.rich}>
      <div className={styles.featured} onClick={() => onPick(topPick.id)}>
        <div className={styles.badge}>
          {byMatch
            ? `Top pick — ${topPick.matchedSkills.length} skill${topPick.matchedSkills.length === 1 ? '' : 's'} matched`
            : 'Most recently posted'}
        </div>
        <div className={styles.featuredBody}>
          <FeaturedLogo key={topPick.id} job={topPick} />
          <div className={styles.featuredText}>
            <div className={styles.featuredRole}>{topPick.title}</div>
            <div className={styles.featuredCo}>{topPick.company} · {topPick.location}</div>
          </div>
        </div>
        <button className={styles.viewBtn}>
          View this role
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </button>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Snapshot of your matches</div>
        <ul className={styles.facts}>
          <li><b>{count}</b> {count === 1 ? 'role' : 'roles'} match your filters</li>
          <li>Most of your matches are in <b>{topCity}</b></li>
        </ul>
      </div>

      <div className={styles.hint}>Click any role on the left to see the full details.</div>
    </div>
  );
}
