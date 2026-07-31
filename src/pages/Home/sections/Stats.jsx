import styles from './Stats.module.css';

const STATS = [
  { num: '20,000+', cap: 'Live openings' },
  { num: '500+', cap: 'Hiring companies' },
  { num: '15s', cap: 'Avg. match time' },
  { num: '0', cap: 'Resumes stored' }
];

export default function Stats() {
  return (
    <div className={styles.band}>
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.stat}>
              <div className={styles.num}>{s.num}</div>
              <div className={styles.cap}>{s.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
