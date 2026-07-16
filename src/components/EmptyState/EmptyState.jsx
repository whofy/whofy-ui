import { logoColor, initial } from '../../utils/logoColor.js';
import styles from './EmptyState.module.css';

const TRENDING_SKILLS = ['Next.js', 'Docker', 'AWS', 'GraphQL', 'Kubernetes', 'Rust', 'TypeScript', 'Tailwind'];

function countBy(arr) {
  const map = {};
  for (const v of arr) map[v] = (map[v] || 0) + 1;
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}

function computeSnapshot(jobs) {
  if (!jobs.length) return null;
  const topPick = [...jobs].sort((a, b) => b.score - a.score)[0];
  const topCity = countBy(jobs.map(j => j.location))[0][0];
  const topSkill = countBy(jobs.flatMap(j => j.matchedSkills))[0][0];
  const topType = countBy(jobs.map(j => j.type))[0][0];
  const present = new Set(jobs.flatMap(j => j.matchedSkills));
  const missing = TRENDING_SKILLS.filter(s => !present.has(s)).slice(0, 5);
  return { topPick, topCity, topSkill, topType, missing };
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

  const { topPick, topCity, topSkill, topType, missing } = snap;

  return (
    <div className={styles.rich}>
      <div className={styles.featured} onClick={() => onPick(topPick.id)}>
        <div className={styles.badge}>★ Top pick for you</div>
        <div className={styles.featuredBody}>
          <div className={styles.logo} style={{ background: logoColor(topPick.company) }}>{initial(topPick.company)}</div>
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
          <li>Most of your matches are in <b>{topCity}</b></li>
          <li>Your strongest in-demand skill is <b>{topSkill}</b></li>
          <li><b>{topType}</b> roles dominate your list</li>
        </ul>
      </div>

      {missing.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Skills worth adding to your resume</div>
          <div className={styles.caption}>Trending in fresher hiring right now</div>
          <div className={styles.chips}>
            {missing.map(s => <span key={s} className={styles.addChip}>{s}</span>)}
          </div>
        </div>
      )}

      <div className={styles.hint}>Click any role on the left to see the full details.</div>
    </div>
  );
}
