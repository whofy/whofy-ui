import styles from './Process.module.css';

const STEPS = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <circle cx="11.5" cy="14.5" r="2.5" />
        <path d="M13.25 16.25 15 18" />
      </svg>
    ),
    title: 'Parse your resume',
    body: (<>Structured extraction of your <span className={styles.highlight}>skills, roles, projects, and education</span> from PDF or DOCX in under three seconds.</>)
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 12 11a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 12 2Z" />
        <path d="M17.5 6.5A4.5 4.5 0 0 1 22 11a4.5 4.5 0 0 1-4.5 4.5" />
        <path d="M6.5 6.5A4.5 4.5 0 0 0 2 11a4.5 4.5 0 0 0 4.5 4.5" />
        <path d="M7.5 15.5A4.5 4.5 0 0 0 12 20a4.5 4.5 0 0 0 4.5-4.5" />
      </svg>
    ),
    title: 'Understand context',
    body: (<>Not keyword matching. We map your experience to a <span className={styles.highlight}>semantic skill graph</span> so React ≈ ReactJS ≈ front-end.</>)
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14 8 10" />
        <path d="M12 12a10 10 0 1 0 10 10" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: 'Rank the openings',
    body: (<>Every live role is ranked against your <span className={styles.highlight}>profile fit</span> — considering skill overlap, seniority, and location.</>)
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="10" y1="6" x2="21" y2="6" />
        <line x1="10" y1="12" x2="21" y2="12" />
        <line x1="10" y1="18" x2="21" y2="18" />
        <path d="M4 6h1v4" />
        <path d="M4 10h2" />
        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
      </svg>
    ),
    title: 'Rank and explain',
    body: (<>Your shortlist is sorted best-first with the <span className={styles.highlight}>exact skills that matched</span> highlighted on every job card.</>)
  }
];

export default function Process() {
  return (
    <section className={styles.section} id="how-matching-works">
      <div className="container">
        <div className={styles.head}>
          <div className={styles.eyebrow}>How matching works</div>
          <h2>From resume to ranked shortlist, in four steps.</h2>
          <p>Whofy replaces manual keyword hunting with an engine that reads your resume like a senior recruiter would — and shows you exactly why every match is on your list.</p>
        </div>

        <div className={styles.pipeline}>
          {STEPS.map(s => (
            <div key={s.num} className={styles.step}>
              <div className={styles.circle}>
                {s.icon}
                <span className={styles.circleNum}>{s.num}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
